/**
 * Created by Administrator on 2016/4/4.
 */
'use strict';

define(function(require){


    var $ = require('jquery');

    var ccharts = {};

    ccharts.version = '1.0.0';
    ccharts.dependencies = {
        jquery:'1.9.1'
    }

    var _idBase = new Date() - 0;
    // 保存 ccharts 实例
    var _instance = {};
    var DOM_ATTRIBUTE_KEY = 'ccharts_instance';

    ccharts.init = function(dom){

        var key = dom.getAttribute(DOM_ATTRIBUTE_KEY);
        if(!key){
            key = _idBase++;
            dom.setAttribute(DOM_ATTRIBUTE_KEY,key);
        }

        if(_instance[key]){
            // 同一个 DOM 上只能 init 一次。
            _instance[key].dispose();
        }

        var instance = new CCharts(dom);
        _instance[key] = instance;
        instance.id = key;
        return instance;
    }

    function CCharts(dom){

        this.dom = dom;

        this._init();
    }

    CCharts.default = {

    }

    CCharts.prototype._init = function(){

        this.chart = {};

    }

    CCharts.prototype._render = function(){

       this._series(this._option.series);
    }
    // notMerge = true 数据不替换，转为添加。
    CCharts.prototype.setOption = function(option,notMerge){

       notMerge ? this._addOption(option) : this._setOption(option);
    }

    CCharts.prototype._setOption = function(option){

        this._option = $.extend(true,CCharts.default,this.getOption(),option);
    }

    CCharts.prototype._addOption = function(options){

    }

    CCharts.prototype.dispose = function(){

        // 清空所有；
        var key = this.dom.getAttribute(DOM_ATTRIBUTE_KEY);
        key &&  delete _instance[key];
    }



    return ccharts;
});