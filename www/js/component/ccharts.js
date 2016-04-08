/**
 * Created by Administrator on 2016/4/4.
 */
'use strict';

define(function(require){


    var $ = require('jquery');


    var ccharts = {
        version : '1.0.0',
        dependencies : {
            jquery:'1.9.1'
        }
    }
        ,_instance = [] // 实例对象集
        ,_baseId = Date.now()-1
        ,_DATA_CHARTS_ID = "data-charts-id";



    ccharts.init = function(dom){

        if(!dom.getContext){
            console.error("your browser don't support canvas");
            return ;
        }
        var id = dom.getAttribute(_DATA_CHARTS_ID);
        if(id){
            _instance[id]._dispose();
            delete _instance[id];
        }
        if(!id){
            id = _baseId++;
            dom.setAttribute(_DATA_CHARTS_ID,id);
        }

        var charts = new CCharts();
        _instance[id] = charts;

        return charts;
    }


    function CCharts(){

        // 初始化事件监听？
        this._init();
    }

    CCharts.prototype._init = function(){

        // 保存几经初始化好的图标
        this.chart = {};
    }

    CCharts.prototype.setOption = function(option,isMerge){
        isMerge ? this._mergeOption(option) : this._setOption(option);
    }

    CCharts.prototype._setOption = function(option){

        this.originData = option;
        this._refresh();
    }

    CCharts.prototype._mergeOption = function(option){

        this.originData = $.extend(true,this.originData,option);
        this._refresh();
    }

    CCharts.prototype._refresh = function(){
        // 数据解析
        this._chartType();
    }

    CCharts.prototype._chartType = function(){
        var series = this.option.series
        for(var i = 0,len = series.length ; i < len ; i ++){
            
        }
    }

    CCharts.prototype._dispose = function(){

    }





    return ccharts;
});