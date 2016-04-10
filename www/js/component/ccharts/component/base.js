/**
 * Created by Administrator on 2016/4/10.
 */
'use strict';

define(function(require){

    function ComponentBase(option,myChart){

        this.option = option;
        this.myChart = myChart;
        this.dom = myChart.dom;

        this._init();
    }


    ComponentBase.prototype._init = function(){

    }

    return ComponentBase;

});