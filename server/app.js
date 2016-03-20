/**
 * Created by Administrator on 2016/3/18.
 */

'use strict';

var express = require('express');
var path = require('path');

var app = new express();

app.use(express.static(path.join(__dirname,'../www')));

module.exports = app;