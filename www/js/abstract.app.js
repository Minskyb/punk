/**
 * Created by Administrator on 2016/3/21.
 */
'use strict';


define([
    'jquery',
    'app/config/router',
    'extendJquery'
],function($,router){

    function App(options){

        this.initProperty();

        if(options)
            this.setOptions(options);
    }

    App.prototype.initProperty =function(){

        this.$wrapper = $(".js-c-container");
        this.moduleId = null;
        this.module = undefined;
        this.views = {};
        this.components = [];
    }

    App.prototype.setOptions = function(options){

        $.extend(true,this,options);
    }

    App.prototype.hashChanged = function(){

        this.moduleId = this.getModuleIdByUrl();
        this.moduleId = "undefined" == typeof router[this.moduleId] ? "404" : this.moduleId;

        this.module = this.loadModule('app/module/'+this.moduleId,function(View){
            this.module = new View({
                $wrapper:this.$wrapper
            });
        });
    }

    App.prototype.getModuleIdByUrl = function(){

        var hash = window.location.hash;
        if(!hash)
            return 404;
        var arr = hash.match(/^\#(\S*)/);
        if(arr && arr[1])
            return arr[1];
        return 404;

    }

    App.prototype.loadModule = function(path,callback){

        var self = this;

        requirejs([path],function(View){
            callback && callback.call(self,View);
        });

    }

    App.prototype.init = function(){

        this.initComponents();
        this.hashChanged();
        var self = this;

        $(window).bind("hashchange",function(e){
            self.hashChanged();
        });
    }

    App.prototype.initComponents = function(){

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

    return App;
})