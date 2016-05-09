/**
 * Created by Administrator on 2016/3/21.
 */
'use strict';
requirejs(['./common','../lib/jquery/jquery.1.9.1'],function(common,$){

   requirejs([
       'jquery',
       'BApp',
       'app/component/menu',
       'extendJquery'
   ],function($,App,Menu){

       function Index(options){
           App.call(this,options);
       }

       Index.prototype = $.PK.inheritPrototype(App.prototype);

       Index.prototype.initProperty = function(){

           App.prototype.initProperty.call(this);

           this.views = {
                ".js-c-menu":Menu
           }
       }

       $(document).ready(function(){

           var index = new Index();

           index.init();
           console.log("index init completed !");
       });
   })

});