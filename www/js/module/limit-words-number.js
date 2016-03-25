/**
 * Created by ASUS on 2016/3/25.
 */
'use strict';


define([
    'jquery',
    'BModule',
    'text!app/module/limit-words-number.html',
    'extendJquery',
    'punk'
],function($,BM,template){

    function LWNumber(options){
        BM.call(this,options);
    }

    LWNumber.prototype = $.PK.inheritPrototype(BM.prototype);

    LWNumber.prototype.initProperty = function(){

        BM.prototype.initProperty.call(this);

        this.template = template;
    }

    return LWNumber;
});