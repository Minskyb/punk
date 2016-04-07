/**
 * Created by ASUS on 2016/4/7.
 */
'use strict';

define([
    'jquery',
    'BModule',
    'text!app/module/layer.html',
    'extendJquery'
],function($,BM,template){

    function MLayer(options){
        BM.call(this,options);
    }

    MLayer.prototype = $.PK.inheritPrototype(BM.prototype);

    MLayer.prototype.initProperty =function(){

        BM.prototype.initProperty.call(this);

        this.template = template;
    }

    return MLayer;
});