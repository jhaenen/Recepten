const express = require("express");
const app = express();
const fs = require("fs");
const util = require("util");
const mc = require("mongodb").MongoClient;

var dbURL = "mongodb://localhost:27017";

const readfile = util.promisify(fs.readFile);

app.get("/", async function (getReq, getRes) {
    let data;
    try {
        data = await readfile("index.html");
    } catch (err) {
        getRes.writeHead(500, "HTTP error" + err,  {"Content-Type": "text/html"});
        return;
    }

    getRes.writeHead(200, {"Content-Type": "text/html"});
    getRes.write(data);

    const client = await mc.connect(dbURL, { useNewUrlParser: true }).catch(err => { console.log(err); });

    let dbRes;
    try {
        const db = client.db("recepten");
        dbRes = await db.collection("recept").find({}).toArray();
    } catch(err) {
        console.log(err);
    } finally {
        client.close();
    }

    dbRes.forEach(element => {
        getRes.write("<div>" + element.name + "</div>");
    });  
    getRes.end();  
});

app.listen(2413);