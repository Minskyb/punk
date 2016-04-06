/**
 * Created by Administrator on 2016/4/4.
 */
'use strict';

define([
    'jquery',
    'BModule',
    'text!app/module/ccharts.html',
    'extendJquery'
],function($,BM,template){

    function MCCharts(options){
        BM.call(this,options);
    }

    MCCharts.prototype = $.PK.inheritPrototype(BM.prototype);

    MCCharts.prototype.construction = MCCharts;

    MCCharts.prototype.initProperty = function(){

        BM.prototype.initProperty.call(this);

        this.template = template;
    }

    return MCCharts;
});