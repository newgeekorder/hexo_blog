title: "Mean - Mongo Express Angular Node"
date: 2015-05-25 14:00:43
tags:
- mean
- mongo
- express
- angular
- node
- richard.donovan
---


```
$ npm install -g mean-cli
$ mean init <myApp>
$ cd <myApp> && npm install
```

Starting a mean app 

```
grunt
```

not surprisingly the application expects mongo to be present, for development purposes one may want to configure a local data path as well as use small file size option 

```
mongod --datapath \home\richard\data --smallfiles 
```

## Mean.io vs Mean.js 

Both use swig for templating, they both use karma and mocha for tests, grunt with livereload, passport integration, nodemon, etc.

Why so similar? Mean.js is a fork of Mean.io and both initiatives were started by the same guy... Mean.io is now under the umbrella of the company Linnovate and looks like the guy (Amos Haviv) stopped his collaboration with this company and started Mean.js. You can read more about the reasons here.

Now... main (or little) differences you can see right now are:


## Comparison

| Feature | Mean.io | Mean.Js |
|:------- |:--------|:------- |
| SCAFFOLDING AND BOILERPLATE GENERATION | Mean.io uses a custom cli tool named 'mean' (very original name)  | Mean.js uses Yeoman Generators
| MODULARITY |  uses a more self-contained node packages modularity with client and server files inside the modules. | Mean.js uses modules just in the front-end (for angular), and connects them with Express. Although they're working on vertical modules as well...|
| DOCUMENTATION | Mean.io has ok docs | Mean.js has AWESOME docs |



