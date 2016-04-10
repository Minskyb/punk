/**
 * Created by ASUS on 2016/3/23.
 */
'use strict';

define(function(require){

    var $ = require('jquery')
        ,BV = require('BView')
        ,template = require('text!app/component/menu.html')
        ,menus = require( 'app/config/menus')
        ,extendJquery = require('extendJquery')
        ,punk = require('punk');

    function Menu(options){
        BV.call(this,options);
    }

    Menu.prototype = $.PK.inheritPrototype(BV.prototype);

    Menu.prototype.initProperty = function(){

        BV.prototype.initProperty.call(this);

        this.template = template;

        this.data = {
            menus:menus
        }
    }

    return Menu;
});