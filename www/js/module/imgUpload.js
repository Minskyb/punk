/**
 * Created by ASUS on 2016/3/30.
 */
'use strict';

define([
    'jquery',
    'BModule',
    'text!app/module/imgUpload.html',
    'extendJquery',
    'punk'
],function($,BM,template){

    function MImgUpload(options){
        BM.call(this,options);
    }

    MImgUpload.prototype = $.PK.inheritPrototype(BM.prototype);

    MImgUpload.prototype.initProperty = function(){

        BM.prototype.initProperty.call(this);

        this.template = template;
    }

    MImgUpload.prototype.render = function() {

        BM.prototype.render.call(this);
    }

    return MImgUpload;
});