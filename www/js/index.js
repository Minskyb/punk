/**
 * Created by Administrator on 2016/3/21.
 */
'use strict';

requirejs(['./common','../lib/jquery/jquery.1.9.1'],function($){

   requirejs(['jquery','BApp','punk'],function($,App){

       $(document).ready(function(){

           var app = new App({});

           app.init();
       });
   })

});