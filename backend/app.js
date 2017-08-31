/*
 * Dylan Lettinga
 * 08/29/2017
 */
const mongo = require('./DBops');
var fs = require("fs");
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/get/search/:lookup', function (req, res) {
    var res_obj = { "invoices" : [] };
    console.log("[200] " + req.method + " to " + req.url);
    res.end(mongo.query("invoice", {}));
})

app.post('/post/login', function (req, res) {
	console.log("[200] " + req.method + " to " + req.url);
})

app.post('/post/invoice', function (req, res) {
    console.log("[200] " + req.method + " to " + req.url);
    console.log(req);
    mongo.insertdoc("invoice", req.body);
    var status = { "status": "success", "object": req.body}
    res.end('{"status":"success"}')
})

var server = app.listen(4067, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Server started at http://%s:%s", host, port);
    mongo.createcol("invoice");
})
