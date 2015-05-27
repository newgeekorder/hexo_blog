title: "Tabris.js for mobile app development"
date: 2015-05-20 13:00:31
author: Richard Donovan
tags:
- nodejs
- javascript
- mobile

---

Tabris.js is a mobile app development framework that gives you the tools to develop your mobile apps entirely in JavaScript. Tabris.js 1.0 was released on April 30th.
 

The Tabris.js JavaScript API uses a fluent programming model inspired by backbone. With a fluent programming model you can create a widget, set properties on the widget, add an event listener and position it on the page, all
with a single call chain.

```
tabris.create("Button", {
    layoutData: {left: 10, top: 10}, text: "Button"
}).on("select", function () {
    this.set("text", "Pressed " + (++count) + "
    times
    "); }).appendTo(page);
```

With the Selector API, you can access widgets dynamically and apply or change 
the properties on those widgets. For example, using a selector you could select 
all the widgets that contain text and translate them to a particular locale.

```
page.apply({ "#okbutton": {"text": "OK!"}, "#cancelbutton": {"text": "Cancel!"} 
});
```

And using the module system, the translations can be encapsulated into their own 
files.

Tabris.js also supports the Window Object, Console Object and several W3C 
standards such as the Timer, XMLHttpRequest and Storage.

```
var xhr = new tabris.XMLHttpRequest();
xhr.onreadystatechange = function () {
    if
    (xhr.readyState === xhr.DONE) {
        tabris.create("TextView", {
            layoutData: {
                left: 10, right: 10, top: [page.children().last(), 10]
            }, text: JSON.parse(xhr.responseText)[1].join(", ")
        }).appendTo(page);
    }
};
xhr.open("GET", "http://en.wiktionary.org/w/api.php?action=opensearch&search=mobile&limit=100");
xhr.send();
```

And finally, since Tabris.js executes the JavaScript directly on your device using the native JavaScript runtimes, standard JavaScript libraries work without modification. For example, you can use Chart.js in your application to render beautiful charts for your mobile application.

```
var Chart = require("chart.js/Chart.min.js");
var ctx = createCanvasContext();
ctx.scale(1 / window.devicePixelRatio, 1 / window.devicePixelRatio);
new
    Chart(ctx)["Doughnut"](chartData, {
    animation: checkboxAnimate.get("selection"),
    showScale: true, showTooltips: false, scaleShowLabels: true
});
```

To try out these examples install the developer apps, they are available on http://tabrisjs.com.
