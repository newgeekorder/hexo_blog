title: "Learning Spark for Data Processing"
date: 2015-05-25 14:00:43
tags:
- spark
- apache
- data_processing
- richard.donovan
---

## Learning Spark for Data Processing

* **Authors:** Krishna Sankar and Holden Karau



This book aims to introduce you to distributed programming using Spark, how does it fare?

Spark aims to provide a replacement for Hadoop’s traditional batch processing model, called MapReduce. Not only is Spark typically much faster, it can also process certain types of job that MapReduce has problems with (e.g. iterative processing). The Spark interface can be used from Scala, Python or Java.

The book is aimed primarily at data scientists and data engineers, although it is also targeted at anyone wanting to learn more about distributed programming using Spark. Some basic level programming skills, in Python or Java, are expected.

Below is a chapter-by-chapter exploration of the topics covered.


**Chapter 1 Installing Spark and Setting up your Cluster**

This chapter aims to guide you through the different ways of installing and deploying Spark. The chapter opens with a tip about creating a softlink to the directory containing the latest version of Spark –allowing a simple re-pointing to a new Spark directory to update your system.

Step-by-step instructions are provided on how to download, install, and test the prebuilt Spark distribution. Similarly, details are provided on building Spark from the source code, and compiling the code with the Maven tool. There’s a useful tip about testing the installation is correct by running the included ‘Calculate Pi’ application.

The chapter continues with a look at Spark’s topology. Spark is a framework capable of processing petabytes of data, having massive parallelism. Partitioned datasets, Resilient Distributed Datasets (RDDs), transformations and actions are briefly explained. Three types of cluster managers are highlighted: standalone, Messo and YARN.

Next, the chapter examines running Spark on a single machine, this is the easiest option, and good for checking the installation and configuration. The chapter then looks at running Spark on EC2 (Amazon’s Elastic Compute Cloud). Various deployment options are briefly discussed, including deployment on Mesos, and YARN.

This chapter provides useful guidance on the different ways of installing and deploying Spark, with some helpful step-by-step instructions. Some helpful links are provided at the end of the chapter (as they are throughout the book). Likewise, links to 2 Spark mailing lists and the Spark community are provided. The summary is very brief, and oddly contains new information.

At times, not enough information is provided and perhaps too much is presumed about the reader. Sometimes, terms are introduced assuming the reading already has an understanding of them (e.g. EC2). Sadly this occurs often in the rest of the book too.

**Chapter 2 Using the Spark Shell**

The chapter opens with an overview of the Spark shell, a very useful interactive environment for experimenting and rapid prototyping with Spark. The shell can be used with Scala or Python.

The chapter continues with a look at loading a simple text file via the Spark shell. The Spark context, which is created automatically by the shell, is described as being a link to the underlying cluster processing. Loading the file via the addFile method makes the file accessible across all the machines in the cluster. A file is loaded into a RDD, transformations can also produce RDDs, but no work is done until an action is run (i.e. lazy evaluation). Some Scala functions are introduced (e.g. map).

The chapter continues with a look at running logistic regression from the Spark shell. Example code is provided, where a dataset is created via the shell. The chapter then looks at loading data from S3 (Amazon’s Simple Storage Service). The chapter ends with a brief look at running the Spark shell in Python.

This chapter discusses a tool that should prove very useful in testing and prototyping your Spark solutions. There are some useful tips about command history, tab completion, and removing the many INFO messages from the output.

The chapter introduces the Scala - the primary Spark language, but not in any detail, and fundamentals are not discussed (e.g. the fat arrow => is not explained). Similarly, the meanings of logical regression, S3, or AWS are not explained. Also, instead of the code being introduced piecemeal, all the code is given and then a brief (too brief) explanation of it is given. This problem is compounded in later chapters by the use of multiple languages. The chapter makes too many assumptions about the reader’s understanding (something that occurs in other chapters too).

**Chapter 3 Building and Running a Spark Application**

The Spark shell is very useful for testing and prototyping, but is limited, and it doesn’t work with Java. This is where Spark applications come to the fore. The chapter starts with the premise that when you build a Spark application, all its dependencies need to be on all the machines in the cluster.

The chapter looks at building Spark projects with sbt (Simple Build Tool). This is easy to use, and supports both Scala and Java. Next, the use of Maven is discussed. Maven is an open source Apache project that builds Scala and Java Spark projects. Spark recommends Maven to package Spark applications. In all cases, examples code is given and briefly explained. The chapter ends with a brief look at the use of other tools to build your Spark projects.

This chapter provides useful instruction on building Scala and Java projects. There’s a useful tip about taking an existing Spark job that already works and rebuilding it, to prove the build process.



**Chapter 4 Creating a SparkContext**

This chapter looks at how to create a SparkContext object - this represents a connection to a Spark cluster and is the entry point to Spark interaction. The Spark shell creates a SparkContext implicitly. With the SparkContext you can create RDDs, broadcast variables and counters.

Example code is provided to create a SparkContext object in both Scala and Java. Additionally, some of the metadata properties of the SparkContext are discussed (e.g. appName), these could prove useful in debugging. Next, some of the APIs that are shared by both Scala and Java are outlined. The chapter ends with a look at performing similar functionality with Python.

This is an interesting chapter, highlighting the importance of the SparkContext object, and showing how it is created and used. Both broadcast and counter variables are mentioned before being defined, this should have been caught be the editors.

**Chapter 5 Loading and Saving Data in Spark**

This chapter is primarily concerned with loading and saving data using various sources. RDDs typically hold the data, and allow fast parallel operations on data,

The chapter explains that RDDs often create a pipeline for data. RDDs use lazy evaluation, being run only when needed, when an action is requested. It’s possible to chain together a large number of transformations, without being concerned about blocking on a computation thread. RDDs are immutable, so a new one is created for a transformation, unless it is cached (which can improve performance).

The chapter continues with a look at loading data into RDDs, from various data sources. Spark supports loading data from various Hadoop formats (e.g. sequence files, text files, etc). Some useful example code is provided, showing how to create a RDD via the parallelize function. The use of the collect function shows how to transform data into a standard Scala array, however the function brings all the data to the machine running the code – so ensure you have sufficient memory.

The chapter ends with a very brief look at saving data, using 2 RDD methods: saveAsTextFile and saveAsObjectFile.

This is a useful but short chapter, highlighting additional functionality of RDDS, and introducing the loading and saving of data. Some useful example code is provided. However, the code is typically given whole before being briefly discussed, this is made worse by sometimes having the code given in Scala, Java, and Python, before being discussed. It would be better to have one language (Scala is the preferred language for Spark), and discuss the code in a piecemeal fashion.

**Chapter 6 Manipulating your RDD**

In many ways, the purpose of the previous chapters has been to give enough background for this chapter. Data manipulation is at the heart of applications.

The chapter opens with a look at manipulating RDDs in Scala and Java. Various RDD functions are briefly examined, including: map, flatMap, broadcast and accumulate variables. A large section of the chapter looks at various groups of RDD Scala functions, these include: 

*   Scala RDD functions (e.g. foldByKey, reduceByKey, groupByKey)

*   Functions for joining PairRDDs (e.g. coGroup, join, subtractKey)

*   Other PairRDD functions (e.g. lookup, mapValues, collectAsMap, countByKey)

*   Double RDD functions (e.g. mean, sampleStdev, Stats, Stdev, Sum, variance)

*   General RDD functions (e.g. aggregate, cache, collect, count, countByValue, distinct, filter, fitherWith, first, flatMap, fold, foreach, groupBy, keyBy, map, mapPartitions, mapPartitionsWithIndex, mapwith, persist, pope, sample, takeSample, toDebugString, union, unpersist, zip)

The chapter then looks at the corresponding Java RDD functions, many of which are similar to the Scala RDD functions. The chapter ends with a brief look at manipulating RDDs in Python, which is more limited, but supports the core functionality.

This is a useful chapter, outlining the major functions used to manipulate RDDs. The information supplied is too brief to be practical, but does highlight the range of functionality available. The chapter is split by language, and says you only need to read the language relevant to you. There are various statistics functions listed under the heading of “Double RDD functions”, it would have been better to list these as “RDD statistics functions”.

**Chapter 7 Spark SQL**

It seems all the big data platforms realise while there is a need for low-level processing (e.g. Java), there is considerably greater need for a SQL language to query the data. Like Hive and Impala, Spark also has a SQL language, Spark SQL. It should be remembered there is a vast pool of users that are already very familiar with SQL.

The chapter opens by describing Spark SQL as a versatile interface to Spark data that compliments other Spark functionality. Spark SQL can interface with dashboards.

The chapter proceeds with a look at Spark SQL’s place within the Spark architecture, and a helpful diagram is provided to illustrate this pictorially. Spark SQL centres on the use of SchemaRDDs, which are essentially the data together with a schema that describes that data (cf: typed datasets in .NET), these allow for simpler code.

The chapter then looks at some practical hands-on Spark SQL programming examples. The first example accesses a simple table (the Scala code loads a CSV file into a table), the second example deals with joining 2 tables together (again loading SchemaRDDs via a CSV file).

This is a helpful chapter, describing both the need for, and the place of Spark SQL. Essentially Spark data can be associated with a schema to enable easier programming, some useful examples of this are provided. The chapter is quite brief. It should be noted that SchemaRDDs have recently been superseded by data frames.

**Chapter 8 Spark with Big Data**

Spark is only one component of a larger big data environment. The chapter opens with a look at how Spark interacts with Parquet, a popular interoperable storage format. Parquet is optimized for column storage, so is very fast when only a few columns of a row are required.

Example Scala code is provided that reads data into a schemaRDD, and then saves it as a Parquet format file. To again illustrate the connected nature of big data tools, this file is then queried using Impala – and helpful instructions are provided on using Impala via Cloudera’s QuickStart VM.

The chapter continues with a look at how Spark can interact with HBase. HBase is Hadoop’s default NoSQL database. Spark interfaces to HBase via HadoopdataSet calls. Helpful Scala code is provided showing how to load data from HBase, and how to save data to HBase.

This chapter shows how Spark interacts with other big data components. The code examples might suggest ideas for your own processing (especially Impala’s fast processing via Massive Parallel Processing). I enjoyed this section, perhaps it could have been expanded to include other popular big data tools. All the example code is given in Scala only.

**Chapter 9 Machine Learning Using Spark MLlib**

Spark can scale computations hugely, and this is exactly what machine learning algorithms require. The chapter opens with a table showing Spark’s machine learning algorithms, together with a very brief description of the functionality. This is followed various examples, using Scala code only, for: 

*   Basic statistics

*   Linear regression

*   Classification

*   Clustering

*   Recommendation

This chapter illustrates an area of technology that is particularly suited to Spark’s processing model, in fact Spark has now become the default platform for machine learning algorithms and applications (e.g. Mahout is moving from using Hadoop’s MapReduce to Spark). Example Scala-only code is provided, but no effort is given either to describing what the code does, or its purpose. Again I suspect the authors have assumed too much of the reader.

**Chapter 10 Testing**

Anyone who works in IT will understand the importance of testable code and test automation. The chapter opens with a look at testing in Scala and Java, instilling the importance of writing your code so that it is amenable to testing or a testing framework (e.g. isolate code from RDDs or SparkContext, also use named functions instead of anonymous ones). This is extended to testing interactions with the SparkContext. The chapter ends with a brief look at testing in Python, and the test libraries docTest and unittest.

**Chapter 11 Tips and Tricks**

The chapter opens with a look at where to find log files, these are very useful for monitoring and debugging. There is one log file per machine in the cluster, and is typically found at SPARK_HOME/work. The Spark web UI can be used to see the STDOUT/STDERR for jobs etc.

The chapter continues with a look at various concurrency limitations, and various solutions are provided. Topics covered include: number of partitions, impact of the garbage collector, the amount of memory, and the serialization type (speed v space).

Brief sections on using Spark with other languages, and security follow. These are really only placeholders without significant detail. The chapter ends with links to community developed package index site, and 2 Spark mailing lists – however these same links have already been given in Chapter 1.

This chapter was mixed, the advice on performance tuning, logs, and the links should prove invaluable, and the sections on other languages and security were woefully inadequate.

**Conclusion**

This book aims to introduce you to distributed programming using Spark. Some basic level programming skills, in Python or Java, are expected.

Unfortunately I had several problems with this book. After the first reading, I had to read another Spark book (Learning Spark, also co-authored by Holden Karau and [reviewed for I Programmer by Kay Ewbank](http://www.i-programmer.info/bookreviews/218-data-science/8503-learning-spark.html)), to understand what this book was trying to say. I then read this book again.

The book assumes too much of its reader. It is not an easy book to learn from if you’re an experienced developer, but a beginner to Scala. The Scala code is not explained sufficiently (e.g. the fat arrow => is not explained). Often topics are not explained (e.g. Linear Regression and various statistical methods). Additionally, little description of the purpose of the code is given. The meanings of several terms (e.g. S3 and or AWS) were not explained

The code is given in its entirety before being discussed (briefly, if at all). It would be better if the code was discussed in a piecemeal fashion – if this is a book someone is supposed to learn from! This situation is compounded by the code often being given in three languages (Scala, Java, and Python).

Several chapters have the code only in Scala, perhaps the authors too also got tired with repeating it. The code should have been in Scala only, with a link to the corresponding code in other languages. The other languages have several areas that are either absent or need workarounds compared with Scala.

Several parts of the book are useful, but you probably need to know something about the subject matter already, to take advantage of these sections. I’m not sure whom this book has been written for. Someone new to Scala and functional programming will have trouble learning from this book.

