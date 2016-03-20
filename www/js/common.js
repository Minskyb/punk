/**
 * Created by Administrator on 2016/3/18.
 */
'use strict';

requirejs.config({

    baseUrl:'lib',
    paths:{
        app:'../js',

        jquery:'jquery/jquery.1.9.1',
        require:'require/require-2.1.20.min',
        text:'require/require.text-2.0.5.min',
        css:'require/require.css-0.1.8.min',
        punk:'punk/js/punk',

        BView:'app/component/abstract.view',
        BModule:'app//abstract.module'

    },
    skim:{
        punk:{
            deps:['jquery'],
            exports:'punk'
        }
    }
})