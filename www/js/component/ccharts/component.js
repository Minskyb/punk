/**
 * Created by Administrator on 2016/4/10.
 */
'use strict';

define(function(){

    var self = {};

    var _componentLibrary = {};

    self.define = function(name,clazz){
        _componentLibrary[name] = clazz;

        return _componentLibrary
    }

    self.get = function(name){
        return _componentLibrary[name];
    }

    return self;

});