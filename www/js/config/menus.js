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
                    name:"Slider 滑块",
                    id:"#slider",
                    key:"slider"
                },
                {
                    name:"Modal 弹出框",
                    id:"#modal",
                    key:"modal,弹出框"
                },
                {
                    name:"Abox 自动高度盒子",
                    id:"#abox",
                    key:"Abox,自动缩放"
                },
                {
                    name:"ImgClip 图片剪辑",
                    id:"#imgClip",
                    key:"imgClip,图片剪辑"
                },
                {
                    name:"ImgPreview 图片预览",
                    id:"#imgPreview",
                    key:"图片预览"
                },
                {
                    name:"ImgUpload 上传图片",
                    id:"#imgUpload",
                    key:"imgUpload,图片预览,异步上传，上传进度"
                }
            ]
        }

    ];

    return menus;
})