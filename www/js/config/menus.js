/**
 * Created by ASUS on 2016/3/23.
 */
'use strict';

define([],function(){

    var menus = [
        {
            name:"边框+背景",
            id:'javascript:;',
            keys:"canvas,draw",
            child:[
                {
                    name:"background",
                    id:"#background",
                    key:"background,linear-gradient,radial-gradient"
                },
                {
                    name:"border-radius",
                    id:"#border-radius",
                    key:"border-radius,border"
                }
            ]
        },
        {
            name:"常用插件",
            id:"javascript:;",
            keys:'插件',
            child:[
                {
                    name:"字数限制",
                    id:"#limit-words-number",
                    key:""
                },
                {
                    name:"Slider",
                    id:"#slider",
                    key:"slider"
                }
            ]
        }

    ];

    return menus;
})