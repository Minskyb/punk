/**
 * Created by Administrator on 2016/3/18.
 */
'use strict';

requirejs.config({
    packages: [
        {
            name: 'echarts',
            location: '../src',
            main: 'echarts'
        },
        {
            name: 'zrender',
            location: 'http://ecomfe.github.io/zrender/src',
            //location: '../../../zrender/src',
            main: 'zrender'
        }
    ],
    baseUrl:'lib',
    paths:{

        app:'../js',
        jquery:'jquery/jquery.1.9.1',
        require:'require/require-2.1.20.min',
        text:'require/require.text-2.0.5.min',
        css:'require/require.css-0.1.8.min',
        underscore:'underscore/underscore-min-1.8.3',
        punk:'punk/js/punk',
        react:'react/react',
        jsx:'react/JSXTransformer',

        BView:'../js/component/abstract.view',
        BModule:'../js/module/abstract.module',
        BApp:'../js/abstract.app'
    },
    skim:{
        punk:{
            deps:['jquery'],
            exports:'punk'
        }
    }
})