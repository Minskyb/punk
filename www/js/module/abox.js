/**
 * Created by Administrator on 2016/3/27.
 */
define([
    'jquery',
    'BModule',
    'text!app/module/abox.html',
    'extendJquery',
    'punk'
],function($,BM,template){

    function Abox(options){
        BM.call(this,options)
    }

    Abox.prototype = $.PK.inheritPrototype(BM.prototype);

    Abox.prototype.initProperty = function(){

        BM.prototype.initProperty.call(this);

        this.template = template;
    }

    Abox.prototype.render =function(){

        BM.prototype.render.call(this);

        $(".pk-animation-box").Abox();
    }
    return Abox;

});