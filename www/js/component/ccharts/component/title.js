/**
 * Created by Administrator on 2016/4/10.
 */
'use strict'

define(function(require){


    var BaseComponent = require('./base')
        ,util = require('../util/util');

    function Title(option,myChart){

        BaseComponent.call(this,option,myChart);
    }

    util.inherits(Title,BaseComponent);

    return Title;

});