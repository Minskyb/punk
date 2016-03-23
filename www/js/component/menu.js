/**
 * Created by ASUS on 2016/3/23.
 */
'use strict';

define([
    'jquery',
    'BView',
    'text!app/component/menu.html',
    '../config/menus',
    'extendJquery',
    'punk'
],function($,BV,template,menus){

    function Menu(options){
        BV.call(this,options);
    }

    Menu.prototype = $.PUNK.inheritPrototype(BV.prototype);

    Menu.prototype.initProperty = function(){

        BV.prototype.initProperty.call(this);

        this.template = template;

        this.data = {
            menus:menus
        }
    }

    return Menu;
});