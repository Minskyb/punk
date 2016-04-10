/**
 * Created by ASUS on 2016/4/7.
 */
'use strict';

define([
    'jquery',
    'BModule',
    'text!app/module/layer.html',
    'extendJquery'
],function($,BM,template){

    function MLayer(options){
        BM.call(this,options);
    }

    MLayer.prototype = $.PK.inheritPrototype(BM.prototype);

    MLayer.prototype.initProperty =function(){

        BM.prototype.initProperty.call(this);

        this.template = template;
    }

    MLayer.prototype.render = function(){

        BM.prototype.render.call(this);

        this.scrollTop = 0;

        $(".auto").each(function(i){
            var $this = $(this);
            console.log($this.css("background-position-y"));
            $this.data("pk-y",$this.css("background-position-y"));
        })
        setBackImagePosition();
        $(window).bind("scroll",setBackImagePosition.bind(this));
        $(window).bind("resize",setBackImagePosition.bind(this))
    }

    function setBackImagePosition(e){

        var scrollTop =  $(window).scrollTop();

        $(".auto").each(function(){
           var $this = $(this);
            $this.css("background-position-y",parseFloat($this.data("pk-y"))+scrollTop*$this.attr("data-ratio"));
        });
    }

    return MLayer;
});