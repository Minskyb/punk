/**
 * Created by Administrator on 2016/3/24.
 */
'use strict';

define([
    'jquery',
    'BModule',
    'text!app/module/background.html',
    'extendJquery'
],function($,BM,template){

    function Background(options){
        BM.call(this,options)
    }

    Background.prototype = $.PK.inheritPrototype(BM.prototype);

    Background.prototype.initProperty = function(){

        BM.prototype.initProperty.call(this);

        this.template = template;
    }

    return Background;

});