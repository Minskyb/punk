/**
 * Created by ASUS on 2016/4/8.
 */
'use strict';

define(function(require){

    var util = {};

    util.inherits = function(ChildClazz,BaseClazz){

        function TempClazz(){};
        TempClazz.prototype = BaseClazz.prototype;
        ChildClazz.prototype = new TempClazz();
        ChildClazz.prototype.constructor = ChildClazz;
    }

    return util;
});