title: "Microsoft forks up Nodejs for Windows 10"
date: 2015-05-25 14:00:28
tags:
- richard.donovan
- node
- windows
author: richard.donovan
---

Node.js is a way of running JavaScript on the server and until now it has been tied to the V8 JavaScript engine. Now Microsoft has forked Node.js to make it run on its Chakra JavaScript engine so that Node.js is available on Windows 10 IoT core. 

But it also makes it available on Windows 10 in general and potentially frees Node.js from being tied to any particular JavaScript engine.

Node.js is essentially a loose collection of libraries designed to provide facilities needed when running JavaScript on a server, or more generally outside of a browser, under an OS. As such the JavaScript engine that is used to run it has to be extended and this is done via a hosting API. A JavaScript engine's hosting API allows it to be used by another program to run custom scripts. In the case of Node.js the choice was made early on to implement the system using the V8 engine, but it could have been made to work with any JavaScript engine.

Now Microsoft has announced a temporary fork of Node.js that runs under the Chakra JavaScript engine. The reason for this being necessary is a strange one. Windows 10 IoT Core, which Microsoft seems very keen on, has an interesting restriction. When running on ARM hardware it restricts the ability to create other executables to whitelisted DLLs, which essentially means that the only JIT compilers allowed are the CLR and Chakra. This is also the case under iOS and this is how Apple stops the installation of alternative scripting engines.

Under Windows 10 on Intel hardware you can simply download V8 and Node.js and start working. On Windows 10 IoT Core, or Windows 10 on ARM, you can't do this; hence the fork to make use of the existing Chakra engine. 

Of course, the fork works under all of the versions of Windows 10 and there might be enough reason to want to always use Chakra-based Node.js under Windows 10\. Notice, however, that you only **have** to use the Chakra based Node.js under Windows 10 on ARM hardware. 

The wrapper that connects Node.js to the Chakra engine also brings some new features to the Node.js fork that allow: 

*   Node.js to run as a Classic Windows application on any device running Windows 10  

*   Node.js to be hosted inside a Universal Windows application, which can run on all Windows10 devices  

*   Full access to Universal Windows Platform APIs from Node.js applications  

*   Visual Studio debugging of Node.js applications on Windows 10

The idea is that when the development is complete the forked Node.js will be offered back to the Node.js project and the plan is to modify Node.js so that it can work with any JavaScript engine. 

At the moment, while the Chakra fork can be used to write Win32 console applications via a native addon on that makes system calls, most of the emphasis is on creating Universal and IoT apps.  An npm module called uwp is available and this gives access to IoT facilities so you can read or set a GPIO line. 

At the moment there is very little documentation available and so this isn't for the beginner. 

The idea that Microsoft helps with the development of Node.js is a very strange one given its history. Being able to run Node.js with any JavaScript engine might be generally useful. Having Microsoft create npm libraries to provide access to OS and hardware features is something that makes all version of Windows 10 look more attractive.