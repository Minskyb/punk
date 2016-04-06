/**
 * Created by Administrator on 2016/3/18.
 */

'use strict';

//var fs = require('fs');
var path = require('path');
var express = require('express');
//var bodyParser = require('body-parser');
var app = new express();

var COMMENTS_FILE = path.join(__dirname,'./data/comments.json');

//app.set('port', (process.env.PORT || 3000));
app.use(express.static(path.join(__dirname,'../www')));

//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: true}));
//
//
//app.use(function(req,res,next){
//    res.setHeader('Access-Control-Allow-Origin', '*');
//    res.setHeader('Cache-Control', 'no-cache');
//    next();
//});
//
//app.get('/api/comments',function(req,res){
//    fs.readFile(COMMENTS_FILE,function(err,data){
//        if(err){
//            console.error(err);
//            process.exit(1);
//        }
//        res.json(JSON.parse(data));
//    });
//});
//
//app.post('/api/comments',function(req,res){
//    fs.readFile(COMMENTS_FILE, function(err, data) {
//        if (err) {
//            console.error(err);
//            process.exit(1);
//        }
//        var comments = JSON.parse(data);
//        // NOTE: In a real implementation, we would likely rely on a database or
//        // some other approach (e.g. UUIDs) to ensure a globally unique id. We'll
//        // treat Date.now() as unique-enough for our purposes.
//        var newComment = {
//            id: Date.now(),
//            author: req.body.author,
//            text: req.body.text
//        };
//        comments.push(newComment);
//        fs.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 4), function(err) {
//            if (err) {
//                console.error(err);
//                process.exit(1);
//            }
//            res.json(comments);
//        });
//    });
//});

module.exports = app;