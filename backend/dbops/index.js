var Client = require('mongodb').MongoClient;

db.createCollection("customers", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
});