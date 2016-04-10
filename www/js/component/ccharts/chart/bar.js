/**
 * Created by Administrator on 2016/4/9.
 */
'use strict';

define(function(require){

    var util = require('../util/util')
        ,ChartBase = require('./base')
        ,Axis = require('../component/axis');


    function Bar(myChart){
        this.myChart = myChart;
    }

//    util.inherits(Bar,ChartBase);

    Bar.prototype.refresh = function(series){

    }

    require('../chart').define('bar',Bar);

    return Bar
});