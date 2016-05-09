/**
 * Created by Administrator on 2016/4/19.
 * 图标数据基础处理类
 */
'use strict';

define(function(require){

    var $ = require('jquery');

    var self = {};
    var _chartsData = {};
    var _chartsDataState = {};

    self.getSeries = function(){
        return _chartsData.series;
    }

    self.getData = function(){
        return _chartsData;
    }

    self.setData = function(option,isMerge){

        if(isMerge){
            self._mergeData(option)
        }
        else{
            self._setData(option);
        }

        self._resetState();

        return self;
    }

    self._mergeData = function(option){
        _chartsData = $.extend(_chartsData,option)
    }

    self._setData = function(option){
        _chartsData = option;
    }

    self._resetState = function(){

        var seriesMaxMin = self._getSeriesMaxMinValue();

        _chartsDataState['series'] = {
            length:_chartsData.series.length,
            max:seriesMaxMin[0],
            min:seriesMaxMin[1]
        }
    }

    self._getSeriesMaxMinValue = function(){

        var max = 0,min = 0,serie = [];
        for(var i = 0 , len = _chartsData.series; i<len; i++){
            serie = _chartsData.series[i];
            for(var j = 0,l = serie.length; j<l; j++){
                max = max > serie[j] ? max : serie[j];
                min = min > serie[j] ? serie[j] : min;
            }
        }
        return [max,min];
    }

    return self;
});