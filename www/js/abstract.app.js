/**
 * Created by Administrator on 2016/3/21.
 */
'use strict';

define([
    'jquery',
    './config/router',
    'extendJquery'
],function($,router){

    function App(options){

        this.$wrapper = $(".js-container");
        this.moduleId = null;

        if(options)
            this.setOptions(options);
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
            this.module.render();
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

        this.hashChanged();
        var self = this;

        $(window).bind("hashchange",function(e){
            self.hashChanged();
        });

    }

    return App;
})