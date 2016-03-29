/**
 * Created by ASUS on 2016/3/29.
 */
'use strict';

(function($){
    function ImgClip(element,setting){

        this.$element = $(element);
        this.setting = $.extend(true,ImgClip.defaults,setting ? setting : {});
        this.loadComponent();
        this.loadImage();
    }

    ImgClip.defaults = {
        chosenWidth:100   // 被选区的初始宽度，
        ,chosenHeight:100  // 被选区的初始高度，
        ,handle:true   // 选择区域大小是否可变
    }

    ImgClip.prototype.loadComponent = function(){

        var mask = '<div class="pk-imgclip-mask"><div class="pk-imgclip-chosen"><img class="pk-imgclip-chosen-img"><div class="pk-chosen-border up"></div><div class="pk-chosen-border down"></div><div class="pk-chosen-border left"></div><div class="pk-chosen-border right"></div></div><div class="pk-imgclip-handle"><div class="pk-handle-border up"></div><div class="pk-handle-border down"></div><div class="pk-handle-border left"></div><div class="pk-handle-border right"></div><div class="pk-handle-box top-center"></div><div class="pk-handle-box top-left"></div><div class="pk-handle-box top-right"></div><div class="pk-handle-box bottom-center"></div><div class="pk-handle-box bottom-left"></div><div class="pk-handle-box bottom-right"></div><div class="pk-handle-box left-middle"></div><div class="pk-handle-box right-middle"></div></div></div>'

        var origin = '<img class="pk-imgclip-origin">';

        this.$mask =$(mask);
        this.$origin = $(origin);

        this.$element.append(this.$mask);
        this.$element.append(this.$origin);
    }

    ImgClip.prototype.loadImage = function(){

        var image = new Image();
        image.src =  this.setting.originImg;
        image.onload = function(){
            console.log("yep");
        };

    }

    ImgClip.prototype.addEvent =function(){


    }

    function Plugin(setting){

        return this.each(function(){
            var $this = $(this);
            var data = $this.data("pk.imgClip");

            if(!data)
            $this.data("pk.imgClip",(data = new ImgClip(this,setting)));
            else
            data.addEvent();
        });
    }

    $.fn.ImgClip = Plugin;

})(jQuery);