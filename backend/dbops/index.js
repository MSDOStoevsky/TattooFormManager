var Client = require('mongodb').MongoClient;
var conn = "mongodb://"+process.env.USER_IP+":27017/tattooformmgr";

module.exports = {
    /* create collection (table) */
    createcol: (name) => {
        Client.connect(conn, function(err, db) {
            if (err) throw err;

            db.createCollection(name, function(err, res) {
                if (err) throw err;
                console.log("Collection created/connected");
                db.close();
            });
        });
    },
    /* drop collection (table) */
    dropcol: (name) => {
        Client.connect(conn, function(err, db) {
            if (err) throw err;
            db.collection(name).drop(function(err, delOK) {
                if (err) throw err;
                if (delOK) console.log("Collection dropped");
                db.close();
            });
        });
    },
    /* insert document (record) */
    insertdoc: (name, obj) => {
        Client.connect(conn, function(err, db) {
            if (err) throw err;
            db.collection(name).insertOne(obj, function(err, res) {
                if (err) throw err;
                console.log("document inserted");
                db.close();
            });
        });
    },
    /* delete document (record) */
    deletedoc: (name, obj) => {
        Client.connect(conn, function(err, db) {
            if (err) throw err;
            db.collection(name).deleteOne(obj, function(err, res) {
                if (err) throw err;
                console.log("document deleted");
                db.close();
            });
        });
    },
    /* query database */
    query: (name, obj, res) => {
        if(Object.keys(obj).length === 0 && obj.constructor === Object)
        {
            throw err;
        }
        else {
            var queryResult;
            Client.connect(conn, function(err, db) {
                if (err) throw err;
                db.collection(name).find(obj).sort({date: -1}).toArray(function(err, result) {
                    if (err) throw err;
                    res(result);
                    db.close();
                })
            });
        }
        
    }
}
