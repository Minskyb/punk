/**
 * Created by ASUS on 2016/3/23.
 */
'use strict';

define([],function(){

    var menus = [
        {
            name:"Canvas",
            id:'#canvas',
            keys:"canvas,draw"
        },
        {
            name:"Ajax",
            id:'javascript:;',
            keys:"Ajax,Ajax",
            child:[
                {
                    name:"Ajax 基础教程",
                    id:'#canvas',
                    keys:"canvas,基础"
                },
                {
                    name:"Ajax 发展史",
                    id:'#canvas_base',
                    keys:"canvas,基础"
                },
                {
                    name:"Ajax 人文",
                    id:'#canvas_base',
                    keys:"canvas,基础"
                }
            ]
        },
        {
            name: "Map",
            id: '#canvas',
            keys: "canvas,draw"
        }
    ];

    return menus;
})