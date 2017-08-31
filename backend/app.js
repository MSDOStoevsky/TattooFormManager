var fs = require("fs");
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongodb'), Schema = mongoose.Schema;


var urlencodedParser = bodyParser.urlencoded({ extended: false })
var app = express();

const { Pool, Client } = require('pg')

const pool = new Pool({
    user: 'appusr',
    host: '104.236.27.22',
    database: 'tattooformmgr',
    password: 'tatgetdopeshit',
    port: 5432,
})
  
/*pool.query('SELECT * FROM formmgr."Invoice"', (err, res) => {
    console.log(err, res)
    pool.end()
})*/

const client = new Client({
    user: 'appusr',
    host: '104.236.27.22',
    database: 'tattooformmgr',
    password: 'tatgetdopeshit',
    port: 5432,
})
client.connect()

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
})