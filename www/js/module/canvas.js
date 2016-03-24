/**
 * Created by ASUS on 2016/3/22.
 */
'use strict';

define([
    'jquery',
    'BModule',
    'text!app/module/canvas.html',
    'extendJquery',
    'punk'
],function($,BM,template,extend){

    function Canvas(options){
        BM.call(this,options);
    }

    Canvas.prototype = $.PK.inheritPrototype(BM.prototype);

    Canvas.prototype.initProperty = function(){

        BM.prototype.initProperty.call(this);

        this.template = template;
    }

    Canvas.prototype.render =function(){

        BM.prototype.render.call(this);

        $(".pk-slider").Slider({});
    }

    return Canvas;
});