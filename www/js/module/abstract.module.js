/**
 * Created by ASUS on 2016/2/22.
 */
'use strict';

define([
    'jquery',
    'BView',
    'extendJquery'
],function($,BV){

    function BModule(options){

        BV.call(this,options);
    }

    BModule.prototype = $.PK.inheritPrototype(BV.prototype);

    BModule.prototype.initProperty = function(){

        BV.prototype.initProperty.call(this);

        // 组件配置
        this.views = {};

        // 组件集合
        this.components = [];
    }

    BModule.prototype.initComponents = function(){

        var that = this;
        $.each(this.views,function(K,V){

            if(K && 'function'== typeof V){
                that.components.push(new V({$wrapper:$(K)}));
            }
            else if(K && 'object' == typeof V){
                var options = $.extend(true,{$wrapper:$(K)}, V.option);
                that.components.push(new V.Func(options));
            }
            else {
                console.error("initComponents 组件配置错误！");
            }
        })
    }

    BModule.prototype.render = function(){


        BV.prototype.render.call(this);

        this.initComponents();
    }

    return BModule;
});