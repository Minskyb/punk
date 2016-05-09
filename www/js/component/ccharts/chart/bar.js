/**
 * Created by Administrator on 2016/4/9.
 */
'use strict';

define(function(require){

    var util = require('../util/util')
        ,ChartBase = require('./base')
        ,Axis = require('../component/axis');


    function Bar(option,myChart){
        this.myChart = myChart;
        this.option = option;
    }

//    util.inherits(Bar,ChartBase);

    Bar.prototype.refresh = function(option){
        this.option = option;
    }

    require('../chart').define('bar',Bar);

    return Bar
});