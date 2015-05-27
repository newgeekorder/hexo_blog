title: "Centralized Docker 1.6 Logging with ELK Stack (and Fluentd) "
date: 2015-05-26 14:00:13
tags:
- Docker
- ELK
- Fluentd
- Logstash
- Elastic Search
- richard.donovan

----
# Docker 1.6 Logging with ELK Stack

<blockquote>
With great power comes great potential to f*ck everything up
</blockquote>

Docker brings tremendous potential for speed and agility of development when coupled with concepts of Continuous Integration (CI), elastic scaling and micro-services.

However large scale and frequent agile deployment can lead to a monitoring nightmare if/when things start going wrong.

Enter centralized logging with the  **ELK stack** (**[ElasticSearch](https://www.elastic.co/products/elasticsearch)**, **[LogStash](https://www.elastic.co/products/logstash)** and **[Kibana](https://www.elastic.co/products/kibana)**).



## Docker 1.6 - Docker Driver

While centralized logging can be implemented prior to 1.6, this blog focuses on the Docker 1.6  introduction of the logging driver which provides a significant step forward in creating a comprehensive approach to logging in Docker environments.

Docker now provides:

 - default **json-file** driver that allows us to see logs with `docker logs` command,
 -  **syslog**  If set, it will route container output (stdout and stderr) to **syslog**.
 -  for completeness it is also possible to completely suppress the writing of container output to file to save hard disk use but not recommended for a production environment.



## Docker Centralized Logging with Syslog

The solution consists of:
-  **ELK** stack
- Docker **syslog log driver**
- the configuration to  log entries to a central location with **rsyslog**.


## Creating and Configuring Docker

We will use a pretty standard vagrant setup [Vagrant](https://www.vagrantup.com)

```
git clone https://github.com/vfarcic/docker-logging-elk.git
cd docker-logging-elk
vagrant up monitoring
vagrant ssh monitoring
```

# The Elk Stack
The Elk stack consists of
* **E**lasticSearch an json data store that provides schema-less full-text search and supports high performance even with high level of writes.
* **L**ogstash: a shipper that send data from files to ElasticSearch
* **K**ibana a powerful Elastic search front end that can be used for vizualiation and data introspection.

## ElasticSearch

To store our data in  **[ElasticSearch](https://www.elastic.co/products/elasticsearch)** database, we uses ElasticSeach's navtive JSON format for storing data.  More importantly, ElasticSearch is optimized for real-time search and analytics allowing us to navigate through our logs quickly.

The official **ElasticSearch** container with port 9200 exposed. We’ll use volume to persist DB data to the /data/elasticsearch directory.

```
sudo mkdir -p /data/elasticsearch
sudo docker run -d --name elasticsearch
    -p 9200:9200
    -v /data/elasticsearch:/usr/share/elasticsearch/data
    elasticsearch
```

## LogStash

[LogStash](https://www.elastic.co/products/logstash) is a flexible data shipper that has a number of plugins to process, filter and santize log data.

 In this case, input will be **syslog**. We’ll filter and mutate Docker entries so that we can distinguish them from the rest of syslog. Finally, we’ll output results to **ElasticSearch** that we already set up.

Container will use official LogStash image. It will expose port 25826, share host volume /data/logstash/config that will provided required configuration and, finally, will link to the ElasticSearch.

```
sudo docker run -d --name logstash
    --expose 25826
    -p 25826:25826
    -p 25826:25826/udp
    -v $PWD/conf:/conf
    --link elasticsearch:db
    logstash logstash -f /conf/syslog.conf
```
   This container was run with -f flag that allows us to specify a configuration we’d like to use. The one we’re using (syslog.conf) looks like following.

```
   input {
  syslog {
    type => syslog
    port => 25826
  }
}

filter {
  if "docker/" in [program] {
    mutate {
      add_field => {
        "container_id" => "%{program}"
      }
    }
    mutate {
      gsub => [
        "container_id", "docker/", ""
      ]
    }
    mutate {
      update => [
        "program", "docker"
      ]
    }
  }
}

output {
  stdout {
    codec => rubydebug
  }
  elasticsearch {
    host => db
  }
}
```

The logstash configuration consists of rules for managing input, filtering and output formats:
* **input** section we’re telling LogStash to listen for **syslog** events on port **25826**.

* the filter section looks for **docker** as a program (Docker logging driver is registering itself as a program in format **docker/[CONTAINER_ID]**). When it finds such program, it mutates its value into a new field **container_id** and updates **program** to be simply **docker**.

* the output sends the results into **stdout** (using rubydebug codec) and, more importantly, **ElasticSearch**.

With ElasticSearch up and running and LogStash listening on syslog events, we are ready to set up **rsyslog**.

## rsyslog

**rsyslog** is a very fast system for processing logs. We’ll use it to deliver our **syslog** entries to **LogStash**. It is already pre-installed in Ubuntu so all we have to do is configure it to work with LogStash.
```
sudo cp conf/10-logstash.conf /etc/rsyslog.d/.
sudo service rsyslog restart
```

We copied a new **rsyslog** configuration and restarted the service. Configuration file is very simple.

```
*.* @@10.100.199.202:25826
```

It tells **rsyslog** to send all **syslog** entries (`*.*`) to a remote (`@@`) location (`10.100.199.202:25826`). In this case, 10.100.199.202 is the IP of Vagrant VM we created.

 If you’re using your own server, please change it to the correct IP. Also, the IP is not a remote location since we are using only one server in this example. In “real” world scenarios you would set rsyslog on each server to point to the central location where ELK is deployed.

Now that we are capturing all **syslog** events and sending them to **ElasticSearch**, it is time to visualize our data.

## Kibana

[Kibana](https://www.elastic.co/products/kibana) is an analytics and visualization platform designed to work with real-time data. It integrates seamlessly with ElasticSearch.

Unlike ElasticSearch and LogStash, there is no official Kibana image so we created one for you. It can be found in Docker Hub under [vfarcic/kibana](https://registry.hub.docker.com/u/vfarcic/kibana/).

We’ll expose port 5601 and link it with the **ElasticSearch** container.

```
sudo docker run -d --name kibana
    -p 5601:5601
    --link elasticsearch:db
    vfarcic/kibana
```

Kibana allows us to easily setup dashboards to serve the needs specific to the project or organization. If you are a first time user, you might be better of with an example Dashboard created to showcase the usage of system and Docker logs coming from **syslog**.

Following command with import sample Kibana settings. It will use a container with [ElasticDump](https://www.npmjs.com/package/elasticdump) tool that provides import and export tools for ElasticSearch. The container is custom-made and can be found in Docker Hub under [vfarcic/elastic-dump](https://registry.hub.docker.com/u/vfarcic/elastic-dump/).

```
sudo docker run --rm
    -v $PWD/conf:/data
    vfarcic/elastic-dump --input=/data/es-kibana.json
    --output=http://10.100.199.202:9200/.kibana --type=data
```

Once this container is run, Kibana configuration from the file **es-kibana.json** was imported into the ElasticSearch database running on **10.100.199.202:9200**.

Now we can take a look at Kibana dashboard that we just setup. Open [http://localhost:5601](http://localhost:5601) in your favourite browser.

The initial screen shows all unfiltered logs. You can add columns from the left hand side of the screen, create new searches, etc. Among Kibana settings that we imported there is a saved search called **error**. It filters logs so that only those that contain word **error** are displayed. We could have done it in many other ways but this one seemed easiest and most straightforward. Open it by clicking the **Load Saved Search** icon in the top-right corner of the screen. At the moment it shows very few or no errors so let us generate a few fake ones.

```
logger -s -p 1 "This is fake error..."
logger -s -p 1 "This is another fake error..."
logger -s -p 1 "This is one more fake error..."
```

Refresh the Kibana screen and you should see those three error messages.

Besides looking at logs in a list format, we can create our own dashboards. For example, click on the **Dashboard** top menu, then **Load Saved Dashboard** and select **error** (another one that we imported previously).

[![kibana](http://a3ab771892fd198a96736e50.javacodegeeks.netdna-cdn.com/wp-content/uploads/2015/05/kibana.png)](http://a3ab771892fd198a96736e50.javacodegeeks.netdna-cdn.com/wp-content/uploads/2015/05/kibana.png)

## Running Container with syslog

Up until this moment we saw only system logs so let us run a new Docker container and set it up to use **syslog log driver**.
```
sudo docker run -d --name bdd
    -p 9000:9000
    --log-driver syslog
    vfarcic/bdd
```

If we go back to Kibana, click on **Discover** and open **Saved Search** called **docker**, there should be, at least, three entries.

That’s it. Now we can scale this to as many containers and servers as we need. All there is to do is set up **rsyslog** on each server and run containers with `--log-driver syslog`. Keep in mind that standard `docker logs` command will not work any more. That’s the expected behaviour. Logs should be in one place, easy to find, filter, visualize, etc.

We’re done with this VM so let us exit and stop it.

```
exit
vagrant halt
```

##Alternative Shippers - Golang Fluentd
The Logstash shipper while flexible  has faced some criticism for be heavy. As a result altenrate shippers have emerged to suite various environments (including javaless and Windows)

In this section we will look at using Fluentd ..


