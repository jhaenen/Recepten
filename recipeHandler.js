const mc = require("mongodb").MongoClient;

let dbURL = "";

exports.init = function(url) {
    dbURL = url;
}

exports.find = async function(query) {
    if(dbURL == "") {
        console.log("Recipe handler is not initialized!");
        return;
    }
    
    const client = await mc.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true}).catch(err => { console.log(err); });

    let dbRes;
    try {
        const db = client.db("recepten");
        if(query == null) query = {};
        dbRes = await db.collection("recept").find(query).toArray();
    } catch(err) {
        console.log(err);
    } finally {
        client.close();
    }

    return dbRes;
}