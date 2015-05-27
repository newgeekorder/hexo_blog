/// <reference path="./typings/node/node.d.ts" />
/// <reference path="./typings/fs-extra/fs-extra.d.ts" />
/// <amd-dependency path="fs"/>
/// <amd-dependency path="fs-extra"/>

//"use strict";
var http = require('http');
var fs =  require("fs");
var toMarkdown = require('to-markdown');


class HtmlToMd {


    public readDir() {
        var dir = fs.readdirSync("./htmlClipboard");
        dir.forEach(s => {
            console.log("File name: " + s);
            this.convert(s);
        });
    }

    public convert(fileName: string){
        var data = fs.readFileSync("./htmlClipboard/" + fileName);
        //console.log(data.toString());
        var mdData = toMarkdown(data.toString(), {converters: []});
        console.log(mdData);
        var mdName = fileName.split(".").slice(0, -1).join(".")
        fs.writeFileSync("./mdClipboard/" + mdName + ".md", mdData );
    }


}

console.log("script running ");
var h2md = new HtmlToMd();
h2md.readDir();