/*
 * Dylan Lettinga
 * 08/29/2017
 */
require('dotenv').config();
const mongo = require('./dbops');
const val = require('./validate');
const auth = require('./auth');
var url = require('url');
var fs = require("fs");
var express = require('express');
var server = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var uuid = require('node-uuid');
//var phantom = require('phantom');

var app = express();

var jsonParser = bodyParser.json();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../frontend')));


app.get('/api/search/:userid', function (req, res) {
    console.log("[200] " + req.method + " to " + req.url);
    auth.authorize(req.headers.authorization, mongo, function(err, token){
        if (err) res.sendStatus(err);
        else {
            mongo.query("invoice", {'user_id': req.params.userid}, function(ret){
                res.cookie('SESSION', token, { });
                res.json(ret);
            });
        }
    });
})

app.get('/api/search/:userid/:lookup', function (req, res) {
    console.log("[200] " + req.method + " to " + req.url);
    auth.authorize(req.headers.authorization, mongo, function(err, token){
        if(err) res.sendStatus(err);
        console.log(token);
        mongo.query("invoice",
        {
            $and: [
                {'user_id': req.params.userid},
                {$or:[
                    {'first_name': new RegExp(req.params.lookup+'.*', 'gi')}, 
                    {'last_name': new RegExp(req.params.lookup+'.*', 'gi')},
                    {'full_name': new RegExp(req.params.lookup+'.*', 'gi')},
                    {'phone_number': new RegExp(req.params.lookup+'.*', 'gi')},
                    {'date': new RegExp(req.params.lookup+'.*', 'gi')}
                ]}
            ]
        }, function(ret){
            res.json(ret);
        });
    });
})

app.get('/api/pdf/', function (req, res) {
    console.log("[200] " + req.method + " to " + req.url);
    res.end('test.pdf');
})

app.delete('/api/invoice/:userid', jsonParser, function (req, res) {
    
    auth.authorize(req.headers.authorization, mongo, function(err, token){
        if(err) res.sendStatus(err);
        console.log(token);

        if (!req.body) return res.sendStatus(400);
        console.log("[200] " + req.method + " to " + req.url);

        if (val.is_valid(req.body))
            mongo.deletedoc("invoice", req.body);
        else
            res.sendStatus(400);

        
        var status = { "status": "[200]", "object": req.body};
        res.end(JSON.stringify(status));
    });
})

app.post('/api/invoice/', jsonParser, function (req, res) {

    auth.authorize(req.headers.authorization, mongo, function(err, token){
        if(err) res.sendStatus(err);
        console.log(token);

        if (!req.body) return res.sendStatus(400);
        console.log("[200] " + req.method + " to " + req.url);
    
        if (val.is_valid(req.body))
            mongo.insertdoc("invoice", req.body);
        else
            res.sendStatus(400);
        
        var status = { "status": "[200]", "object": req.body};
        res.end(JSON.stringify(status));
    });
})

app.post('/auth/login', jsonParser, function (req, res) {

    auth.authorize(req.headers.authorization, mongo, function(err, token){
        if(err) res.sendStatus(err);
        console.log(token);

        if (!req.body) return res.sendStatus(400);
        console.log("[200] " + req.method + " to " + req.url);
    
        if (val.is_valid(req.body))
            mongo.insertdoc("invoice", req.body);
        else
            res.sendStatus(400);
        
        var status = { "AccessToken": ""};
        res.end(JSON.stringify(status));
    });    
})

var server = app.listen(4067, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Server started at http://%s:%s", host, port);
    //mongo.createcol("invoice");
})
