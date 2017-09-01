/*
 * Dylan Lettinga
 * 08/29/2017
 */
const mongo = require('./dbops');
var fs = require("fs");
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/get/search/pn/:lookup', function (req, res) {
    console.log("[200] " + req.method + " to " + req.url);
    mongo.query("invoice", res, {'phone_number': req.params.lookup });
})

app.get('/get/search/dte/:lookup', function (req, res) {
    console.log("[200] " + req.method + " to " + req.url);
    mongo.query("invoice", res, {'date': req.params.lookup });
})

app.get('/get/search/nme/:first/:last', function (req, res) {
    console.log("[200] " + req.method + " to " + req.url);
    mongo.query("invoice", res, 
    {$or:[{'first_name': req.params.first}, {'last_name': req.params.last }]});
})
//new RegExp('/'+req.params.first+'\.*/gi') 

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
