/**
 * Created by Administrator on 2016/3/18.
 */

'use strict';

var app = require('./app');

var server = app.listen(3000,function(){

    var host = server.address().address;
    var port = server.address().port;

    console.log("server is listening at http://%s:%s ",host,port);
});