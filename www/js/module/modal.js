/**
 * Created by Administrator on 2016/3/25.
 */
'use strict';

define([
    'jquery',
    'BModule',
    'text!app/module/modal.html',
    'extendJquery'
],function($,BM,template){

    function Modal(options){
        BM.call(this,options);
    }

    Modal.prototype = $.PK.inheritPrototype(BM.prototype);

    Modal.prototype.initProperty = function(){

        BM.prototype.initProperty.call(this);

        this.template = template;
    }

    return Modal;
});