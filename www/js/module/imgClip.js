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

        this.events = {
            '.js-got click':getPosition
        }
    }

    ImgClip.prototype.render = function(){

        BM.prototype.render.call(this);
        $(function(){

            $(".pk-imgclip").ImgClip({
               width:100,
               height:100,
               top:100,
               left:100,
               img:"images/20160329111037.png"
           });
        });
    }

    function getPosition(){

        var data = $(".pk-imgclip").data("pk.imgClip");
        console.log("width,height"+data.width+","+data.height);
        console.log("top,left"+data.top+","+data.left);
    }
    return ImgClip;
});
