const express = require("express");
const app = express();
const fs = require("fs");
const util = require("util");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv/config")

const readfile = util.promisify(fs.readFile);

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}, () => console.log("Connected to database."));

app.use(bodyParser.json());

const recipeRoute = require("./routes/recipe");

app.use("/recipe", recipeRoute);

app.get("/", async function (getReq, getRes) {
    let data;
    try {
        data = await readfile("app/dist/index.html");
    } catch (err) {
        getRes.writeHead(500, "HTTP error" + err,  {"Content-Type": "text/html"});
        return;
    }

    getRes.writeHead(200, {"Content-Type": "text/html"});
    getRes.write(data);
    getRes.end();  
});

app.get("/main.js", async function(getReq, getRes) {
    let data;
    try {
        data = await readfile("app/dist/main.js");
    } catch (err) {
        getRes.writeHead(500, "HTTP error" + err,  {"Content-Type": "application/javascript"});
        return;
    }

    getRes.writeHead(200, {"Content-Type": "application/javascript"});
    getRes.write(data);

    getRes.end(); 
});

app.listen(2413);