/*
 * Dylan Lettinga
 * 08/29/2017
 */
var fs = require("fs");
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var Client = require('mongodb').MongoClient;

var conn = "mongodb://localhost:27017/tattooformmgr";

var urlencodedParser = bodyParser.urlencoded({ extended: false })
var app = express();
  
/*pool.query('SELECT * FROM formmgr."Invoice"', (err, res) => {
    console.log(err, res)
    pool.end()
})*/

app.use(express.static(path.join(__dirname, 'public')));

app.get('/get/search/:lookup', function (req, res) {
    var res_obj = { "invoices" : [] };
    console.log("[200] " + req.method + " to " + req.url);
    client.query('SELECT * FROM formmgr."Invoice" WHERE date::text LIKE \'%' + req.params.lookup +'%\'', (err, qres) => {
        for(row = 0; row < qres.rowCount; row++)
        {
            res_obj.invoices[row] = qres.rows[row];
        }
        res.end(JSON.stringify(res_obj))
    })
})

app.post('/post/login', urlencodedParser, function (req, res) {
	console.log("[200] " + req.method + " to " + req.url);
})

app.post('/post/client', urlencodedParser, function (req, res) {
	console.log("[200] " + req.method + " to " + req.url);
})

app.post('/post/invoice', urlencodedParser, function (req, res) {
	console.log("[200] " + req.method + " to " + req.url);
})

var server = app.listen(4067, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Server started at http://%s:%s", host, port)

    Client.connect(conn, function(err, db) {
        if (err) throw err;
        console.log("Database created/connected");
        db.close();
    });
})