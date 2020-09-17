const express = require("express");
const app = express();
const fs = require("fs");
const util = require("util");
const recipe = require("./recipeHandler");

var dbURL = "mongodb://localhost:27017";
recipe.init(dbURL);

const readfile = util.promisify(fs.readFile);

app.get("/", async function (getReq, getRes) {
    let data;
    try {
        data = await readfile("site/dist/index.html");
    } catch (err) {
        getRes.writeHead(500, "HTTP error" + err,  {"Content-Type": "text/html"});
        return;
    }

    getRes.writeHead(200, {"Content-Type": "text/html"});
    getRes.write(data);

    let dbRes = await recipe.find();

    dbRes.forEach(element => {
        getRes.write("<div>" + element.name + "</div>");
    });  
    getRes.end();  
});

app.get("/main.js", async function(getReq, getRes) {
    let data;
    try {
        data = await readfile("site/dist/main.js");
    } catch (err) {
        getRes.writeHead(500, "HTTP error" + err,  {"Content-Type": "application/javascript"});
        return;
    }

    getRes.writeHead(200, {"Content-Type": "application/javascript"});
    getRes.write(data);

    getRes.end(); 
});

app.listen(2413);