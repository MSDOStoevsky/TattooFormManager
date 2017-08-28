const { Client } = require('pg');
var fs = require("fs");
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false })
var app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/get/', function (req, res) {
    console.log( __dirname );
})

app.post('/post/', urlencodedParser, function (req, res) {
	console.log("[200] " + req.method + " to " + req.url);
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Server started at http://%s:%s", host, port)
})