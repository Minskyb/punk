/**
 * Created by ASUS on 2016/2/22.
 */
'use strict';

define(['underscore','jquery'],function(_,$){

    function BModule(options){

        this.initProperty();
    }

    BModule.prototype.initProperty = function(){

        this.$element = $(document);

        // 事件监听配置
        this.events = {};

        // 组件配置
        this.views = {}

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

        this.addEvent();

        this.initComponents();
        $.each(this.components,function(K,V){
            V.render();

        });
    }

    BModule.prototype.addEvent = function(){

        this.removeEvent();

        if(!this.events) return;

        var regExp = /^(\S*)\s(\S*)$/
            ,arr
            ,selector
            ,eventType
            ,handler
            ,that = this;

        // '.target click'
        $.each(this.events,function(k,v){

            arr = k.match(regExp);
            if(!arr || arr.length != 3) {
                console.error("this.views 事件类型正则表达式解析失败！");
                return
            }
            selector = arr[1];
            eventType = arr[2];

            // 设置事件处理函数的作用域为当前作用域
            handler = $.proxy(v,that);

            selector.length >0 ? that.$element.delegate(selector,eventType,handler) :that.$element(eventType,handler);

        });
    }

    /* 事件移除 */
    BModule.prototype.removeEvent = function(){

        this.$element.undelegate();
    }


    return BModule;
});