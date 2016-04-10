/**
 * Created by Punk.Li on 2016/4/9.
 *
 * chartLibrary 记录已经加载的 chart
 */
'use strict';

define(function(){
    var self = {};

    var _chartLibrary = {};

    /*记录已经记载的 chart*/
    self.define = function(name,clazz){
        _chartLibrary[name] = clazz;
        return self;
    }

    /*获取 chart*/
    self.get = function(name){
        return _chartLibrary[name];
    }

    return self;
});