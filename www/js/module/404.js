/**
 * Created by Administrator on 2016/3/22.
 */
'use strict';

define([
    'jquery',
    'BModule',
    'text!app/module/404.html',
    'extendJquery'
],function($,BM,template){

    function P404(options){
        BM.call(this,options);
    }

    P404.prototype = $.PUNK.inheritPrototype(BM.prototype);

    P404.prototype.initProperty = function(){

        BM.prototype.initProperty.call(this);

        this.template = template;
    }

    return P404;
});