/*
 * Dylan Lettinga
 * 08/29/2017
 */
const mongo = require('./dbops');
const val = require('./validate');
var url = require('url');
var fs = require("fs");
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
//var phantom = require('phantom');

var app = express();

var jsonParser = bodyParser.json()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/api/search/:uid', function (req, res) {
    console.log("[200] " + req.method + " to " + req.url);
    mongo.query("invoice", res, {'UID': req.params.uid});
})

app.get('/api/search/:uid/:lookup', function (req, res) {
    console.log("[200] " + req.method + " to " + req.url);
    mongo.query("invoice", res, 
    {
        $and: [
            {'UID': req.params.uid},
            {$or:[
                {'first_name': new RegExp(req.params.lookup+'.*', 'gi')}, 
                {'last_name': new RegExp(req.params.lookup+'.*', 'gi')},
                {'full_name': new RegExp(req.params.lookup+'.*', 'gi')},
                {'phone_number': new RegExp(req.params.lookup+'.*', 'gi')},
                {'date': new RegExp(req.params.lookup+'.*', 'gi')}
            ]}
        ]
    });
})

app.get('/api/pdf/', function (req, res) {
    console.log("[200] " + req.method + " to " + req.url);
    res.end('test.pdf');
})

app.delete('/api/invoice', jsonParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);
    console.log("[200] " + req.method + " to " + req.url);

    if (val.is_valid(req.body))
        mongo.deletedoc("invoice", req.body);
    else
        res.sendStatus(400);

    var status = { "status": "[200]", "object": req.body};
    res.end(JSON.stringify(status));
})

app.post('/api/invoice', jsonParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);
    console.log("[200] " + req.method + " to " + req.url);

    if (val.is_valid(req.body))
        mongo.insertdoc("invoice", req.body);
    else
        res.sendStatus(400);
    
    var status = { "status": "[200]", "object": req.body};
    res.end(JSON.stringify(status));
})

var server = app.listen(4067, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Server started at http://%s:%s", host, port);
    //mongo.createcol("invoice");
})
