var Client = require('mongodb').MongoClient;
var conn = "mongodb://104.236.27.22:27017/tattooformmgr";

module.exports = {
    /* create collection (table) */
    createcol: (name) => {
        Client.connect(conn, function(err, db) {
            if (err) throw err;

            db.createCollection(name, function(err, res) {
                if (err) throw err;
                console.log("Collection created!");
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
                if (delOK) console.log("Collection deleted");
                db.close();
            });
        });
    },
    /* insert document (record) */
    insertdoc: (name, insertobj) => {
        Client.connect(conn, function(err, db) {
            if (err) throw err;
            db.collection(name).insertOne(insertobj, function(err, res) {
                if (err) throw err;
                console.log("1 document inserted");
                db.close();
            });
        });
    },
    /* delete document (record) */
    deletedoc: (name, deleteobj) => {
        Client.connect(conn, function(err, db) {
            if (err) throw err;
            db.collection(name).deleteOne(deleteobj, function(err, res) {
                if (err) throw err;
                console.log("document deleted");
                db.close();
            });
        });
    },
    /* query database */
    query: (name, queryobj) => {
        Client.connect(conn, function(err, db) {
            if (err) throw err;
            db.collection(name).find(queryobj).toArray(function(err, result) {
                if (err) throw err;
                console.log(result);
                db.close();
            });
        });
    }
}