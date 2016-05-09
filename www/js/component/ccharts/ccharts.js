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



    /*确保每个 dom 只对应一个 CCharts*/
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

        var charts = new CCharts(dom);
        _instance[id] = charts;

        return charts;
    }


    function CCharts(dom){

        this.dom = dom;
        // 初始化事件监听？
        this._init();
    }

    CCharts.prototype._init = function(){

        // 保存已经初始化好的图表
        this.charts = {};
        // 图表刷新状态
        this._chartsState = {};
        // 图表组件
        this.components = {};

        this._originData = {};

        this._chartsData = require('./util/data');

        /*预加载组件，并保存到组件库中，方便后面调用*/
        var componentLibrary = require('./component');
        componentLibrary.define('title',require('./component/title'));
        componentLibrary.define('legend',require('./component/legend'));
        componentLibrary.define('tooltip',require('./component/tooltip'));

    }

    CCharts.prototype.setOption = function(option,isMerge){
        isMerge ? this._mergeOption(option) : this._setOption(option);
//        this._chartsData.setData(option,isMerge);
    }

    CCharts.prototype._setOption = function(option){

        this._originData = option;
        this._render(this._originData );
    }

    CCharts.prototype._mergeOption = function(option){

        this._originData = $.extend(true,this.originData,option);
        this._render(this._originData );
    }

    CCharts.prototype._render = function(option){
        // 重置所有刷新状态
        for(var type in this._chartsState){
            this._chartsState[type] = false;
        }
        // 只要确保，用到的组件已经添加进入组件库，图表和组件的解析顺序可随意
        this._parseChartType(option);
        this._parseComponent(option);
    }

    CCharts.prototype._parseComponent = function(option){

        /*
        * title:标题
        * legend：图例。用不同形状、颜色、文字等标示不同数据列。
        * tooltip：数据提示框，当鼠标停留在某点上时，以框的形式提示该点的数据。
        * grid：网格
        * xAxis：x 轴
        * yAxis：y 轴
        * polar：极坐标
        * */

        var componentList = [
            'title', 'legend', 'tooltip','grid',
            'xAxis', 'yAxis', 'polar'
        ];

        // 获取组件库
        var componentLibrary = require('./component');

        var component
            ,componentType
            ,componentClass;
        /*遍历比对需要初始化哪些组件*/
        for(var i = 0,len = componentList.length; i < len; i++){

            componentType = componentList[i];
            component = this.components[componentType];

            // 如果有指定组件
            if(option[componentType]){
                if(component){
                    component.refresh && component.refresh(option)
                }
                else{
                    componentClass = componentLibrary.get(/^[xy]Axis$/.test(componentType) ? 'axis': componentType);
                    component = new componentClass(option,this);
                    this.components[componentType] = component;
                }
            }// 删除已初始化但未指定的组件
            else if(component){
                component.dispose();
                this.components[componentType] = null;
                delete this.components[componentType];
            }
        }
    }

    CCharts.prototype._parseChartType = function(option){
        var series = option.series
            ,chartLibrary = require('./chart')
            ,item
            ,type;
        for(var i = 0,len = series.length ; i < len ; i ++){
            item = series[i];
            type = item.type;
            if(!type){
                console.error("series["+i+"] chart type has not been defined.");
                continue;
            }
            if(!this.charts[type]){
                var ChartClass = chartLibrary.get(type);
                if(!ChartClass){
                    console.error("chart"+type+"don't required.");
                    continue;
                }
                this.charts[type] = new ChartClass(option,this);
                this._chartsState[type] = true;
            }
            else if(this.charts[type] && !this._chartsState[type]){ /* 确保 chart 每次只刷新一次 */
                var chart = this.charts[type];
                chart.refresh && chart.refresh(option);
                this._chartsState[type] = true;
            }
        }
        // 回收不再用的 chart
        for(var type in this._chartsState){
            if(!this._chartsState[type]){
                this.charts[type].dispose();
                this.charts[type] = null;
                delete this.charts[type];
            }
        }
    }

    CCharts.prototype._dispose = function(){

    }

    return ccharts;
});