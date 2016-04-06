/**
 * Created by Administrator on 2016/3/21.
 */
'use strict';

(function(callback){
    "function" ==  typeof define && define.amd ? requirejs(['jquery'],callback) : "object" == typeof exports ? module.exports = callback : callback(jQuery);
})(function($){

    $.extend({
        PK:{
            inheritPrototype:function(prototype){
                function tempClass(){};
                tempClass.prototype = prototype;
                return new tempClass();
            },
            create:function(that){

                that.create();
                if(that.renderImmediately) that.render();
            },
            searchopts:function(){

                var obj = {},kv,str;
                kv =location.search.slice(1).search.split("&");

                for(var i = 0,item ,len = kv.length ; i<len ; i++){
                    item = kv[i].split("=");
                    if(item)
                        obj[item[0]] = obj[item[1]];
                }

                return obj;
            },
            interatorTemplate:function(options){
                requirejs(['underscore',options.template],function(_,template){

                    var $wrapper = $(options.index);

                    var data = "object" == typeof options.data ? options.data : JSON.parse(options.data);
                    var $element = $(_.template(template)(data));

                    $element.insertBefore($wrapper);
                    $wrapper.remove();

                });
            }
        }
    });
});