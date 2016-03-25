/**
 * Created by ASUS on 2016/3/25.
 */
'use strict';

define([
    'jquery',
    'BModule',
    'text!app/module/slider.html',
    'extendJquery',
    'punk'
],function($,BM,template,extend){

    function Slider(options){
        BM.call(this,options);
    }

    Slider.prototype = $.PK.inheritPrototype(BM.prototype);

    Slider.prototype.initProperty = function(){

        BM.prototype.initProperty.call(this);

        this.template = template;
    }

    Slider.prototype.render =function(){

        BM.prototype.render.call(this);

        $(".pk-slider").Slider({});
    }

    return Slider;
});