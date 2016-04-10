/**
 * Created by ASUS on 2016/4/1.
 */
'use strict';

define([
    'jquery',
    'BModule',
    'text!app/module/echarts.html',
    'echarts',
    'echarts/chart/bar',
//    'echarts/chart/line',
    'extendJquery'
],function($,BM,template,ec){

    function MEcharts(options){
        BM.call(this,options);
    }

    MEcharts.prototype = $.PK.inheritPrototype(BM.prototype);

    MEcharts.prototype.initProperty = function(){

        BM.prototype.initProperty.call(this);

        this.template = template;
    }

    MEcharts.prototype.render =function(){

        BM.prototype.render.call(this);
        var myChart = ec.init(document.getElementById('main'));
        myChart.setOption({
            title:{
                text:"hello"
            },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:['蒸发量','降水量']
            },
            toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    magicType : {show: true, type: ['line', 'bar']},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            calculable : true,
            xAxis : [
                {
                    type : 'category',
                    data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    splitArea : {show : true}
                }
            ],
            series : [
                {
                    name:'蒸发量',
                    type:'bar',
                    data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
                },
                {
                    name:'降水量',
                    type:'bar',
                    data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
                }
            ]
        });
    }

    return MEcharts;
});