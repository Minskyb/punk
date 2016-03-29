/**
 * Created by ASUS on 2016/3/29.
 */
'use strict';

define([
    'jquery',
    'BModule',
    'text!app/module/imgClip.html',
    'extendJquery',
    'punk'
],function($,BM,template){

    function ImgClip(options){
        BM.call(this,options);
    }

    ImgClip.prototype = $.PK.inheritPrototype(BM.prototype);

    ImgClip.prototype.initProperty = function(){

        BM.prototype.initProperty.call(this);

        this.template = template;
    }

    ImgClip.prototype.render = function(){

        BM.prototype.render.call(this);
        $(function(){
           $(".pk-imgclip").ImgClip({
               chosenWidth:100,
               choseHeight:100,
               originImg:"images/20160329111037.png"
           });
        });
    }
    return ImgClip;
});
