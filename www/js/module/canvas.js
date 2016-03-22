/**
 * Created by ASUS on 2016/3/22.
 */
'use strict';

define([
    'jquery',
    'BView',
    'text!app/module/canvas.html',
    'extendJquery',
    'punk'
],function($,BV,template){

    function Canvas(options){
        BV.call(this,options);
    }

    Canvas.prototype = $.PUNK.inheritPrototype(BV.prototype);

    Canvas.prototype.initProperty = function(){

        BV.prototype.initProperty.call(this);

        this.template = template;
    }

    Canvas.prototype.render =function(){

        BV.prototype.render.call(this);

        $(".pk-slider").Slider({});
    }

    return Canvas;
});