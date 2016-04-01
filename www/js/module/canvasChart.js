/**
 * Created by ASUS on 2016/4/1.
 */
'use strict';

define([
    'jquery',
    'BModule',
    'text!app/module/canvasChart.html',
    'extendJquery'
],function($,BM,template){

    function CanvasChart(options){
        BM.call(this,options);
    }

    CanvasChart.prototype = $.PK.inheritPrototype(BM.prototype);

    CanvasChart.prototype.initProperty = function(){

        BM.prototype.initProperty.call(this);

        this.template = template;
    }

    CanvasChart.prototype.render =function(){

        BM.prototype.render.call(this);

        var canvas = $("#canvasChart")[0];
        if( !canvas.getContext) return

        var context = canvas.getContext('2d');

        context.rotate(Math.PI/4);
        context.strokeStyle = "black";
        context.fillRect(0,0,100,100);
    }

    return CanvasChart;
});