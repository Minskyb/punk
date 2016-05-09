/**
 * Created by Administrator on 2016/4/4.
 */
'use strict';

define(function(require){

    var $ = require('jquery')
        ,BM = require('BModule')
        ,template = require('text!app/module/ccharts.html')
        ,extendJquery = require('extendJquery')
        ,cchart = require('app/component/ccharts/ccharts')
        ,bar = require('app/component/ccharts/chart/bar');

    function MCCharts(options){
        BM.call(this,options);
    }

    MCCharts.prototype = $.PK.inheritPrototype(BM.prototype);

    MCCharts.prototype.construction = MCCharts;

    MCCharts.prototype.initProperty = function(){

        BM.prototype.initProperty.call(this);

        this.template = template;

        this.option = {
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
        }
    }

    MCCharts.prototype.render = function(){

        BM.prototype.render.call(this);

        var myChart = cchart.init(document.getElementById("main"));
        myChart.setOption(this.option);
    }

//    function drawAxis(context,width,height,pt,pr,pb,pl){
//
//        if(arguments.length == 4)
//        pr = pb = pl =pt;
//
//        context.lineWidth = 1;
//        context.strokeStyle = "#333";
//        context.gloableAlpha = 1;
//        context.translate(pl,height -pb);
//        context.beginPath();
//        context.moveTo(0,0);
//        context.lineTo(width-pr-pl,0);
//        context.moveTo(0,0);
//        context.lineTo(0,-height+pt+pb);
//        context.closePath();
//        context.stroke();
//
//        context.font="12px Arial";
//        context.textAlign = 'center';
//        context.textBaseline = 'top';
//
//        var num = this.option.xAxis[0].data.length;
//        var eWidth = (width-pl-pr)/num;
//        for(var i = 0 ; i <= num ; i++){
//            context.beginPath();
//            context.moveTo(i*eWidth,0);
//            context.lineTo(i*eWidth,-5);
//            context.closePath();
//            context.stroke();
//            context.fillText(i+1+"月",i*eWidth+eWidth/2,5);
//        }
//    }

    return MCCharts;
});