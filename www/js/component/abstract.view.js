/**
 * Created by ASUS on 2016/2/22.
 */
'use strict';

define(['underscore','jquery'],function(_,$){

    function BView(options){

        this.initProperty();
        this.setOptions(options);
        this.initData();
    }

    /* 变量初始化 */
    BView.prototype.initProperty = function(){

        // 父节点 jquery 对象
        this.$wrapper = undefined;

        // 视图模块，可能是字符串，也可能是解析后的 function
        this.template = undefined;

        // 视图模块解析数据源
        this.data = undefined;

        // 解析后模块保存 jquery 对象
        this.$element = undefined;

        // 监听事件集合
        this.events = undefined;

        // 对象唯一标识
        this.id = _.uniqueId("template_ui_");

        // 当前对象状态
        this.status = 'init';

        // 是否立即执行 render，给外部 render 调用做判断用。
        this.renderImmediately = false;

    };

    /* 变量自定义 */
    BView.prototype.setOptions = function(options){

        $.extend(true,this,options);

    };

    /* DOM 元素构造 */
    BView.prototype.create = function(){

        this.$element = $(this.parse());

        this.createDone = true;
        // 判断是放在此处还是放入 render 中合适
        this.addEvent();

        this.render();

    };

    /* 界面呈现 */
    BView.prototype.render = function(){

//        if(!this.$element){
//            this.renderImmediately = true;
//            return;
//        }

        this.$wrapper.empty();
        this.$wrapper.append(this.$element);
    };

    /* template 模板解析 */
    BView.prototype.parse = function(data){

        if(_.isString(this.template)){
            this.template = _.template(this.template);
        }

        if(data)
            return this.template(data);
        return this.template(this.data);
    }

    /* 事件监听 */
    BView.prototype.addEvent = function(){

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
    BView.prototype.removeEvent = function(){

        this.$element.undelegate();
    }

    /* 模板数据更新 */
    BView.prototype.setParseData = function(data){

        this.data = data;
        this.create();
        this.render();
    }

    /* 异步获取数据 */
    BView.prototype.initData = function(){

        this.create();
    }

    /* 刷新 */
    BView.prototype.refresh = function(){

        this.renderImmediately = true;
        this.initData();
        this.create();
        this.render();
    }

    return BView;
});