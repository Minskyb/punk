/**
 * Created by ASUS on 2016/3/29.
 */
'use strict';

(function($){
    function ImgClip(element,setting){

        this.$element = $(element);

        this.initProperty(setting);
        this.loadComponent();
        this.setImage();
        this.addEvent();
    }

    ImgClip.defaults = {
        chosenWidth:100   // 被选区的初始宽度，
        ,chosenHeight:100  // 被选区的初始高度，
        ,handle:true   // 选择区域大小是否可变
    }

    ImgClip.prototype.initProperty = function(setting){
        this.setting = $.extend(true,ImgClip.defaults,setting ? setting : {});
    }

    ImgClip.prototype.loadComponent = function(){

        var mask = '<div class="pk-imgclip-mask"><div class="pk-imgclip-chosen"><img class="pk-imgclip-chosen-img"><div class="pk-chosen-border up"></div><div class="pk-chosen-border down"></div><div class="pk-chosen-border left"></div><div class="pk-chosen-border right"></div></div><div class="pk-imgclip-handle"><div class="pk-handle-border up"></div><div class="pk-handle-border down"></div><div class="pk-handle-border left"></div><div class="pk-handle-border right"></div><div class="pk-handle-box top-center"></div><div class="pk-handle-box top-left"></div><div class="pk-handle-box top-right"></div><div class="pk-handle-box bottom-center"></div><div class="pk-handle-box bottom-left"></div><div class="pk-handle-box bottom-right"></div><div class="pk-handle-box left-middle"></div><div class="pk-handle-box right-middle"></div></div></div>'

        var origin = '<img class="pk-imgclip-origin">';

        this.$mask =$(mask);
        this.$origin = $(origin);

        this.$chosen = $(".pk-imgclip-chosen",this.$mask);
        this.$chosenImg = $(".pk-imgclip-chosen-img",this.$mask);

        this.$element.append(this.$mask);
        this.$element.append(this.$origin);

    }

    ImgClip.prototype.setImage = function(){

        // 考虑 image.onload 事件兼容刷新处理，IE浏览器二次刷新好像不会触发 onload 事件。
        this.$origin.attr("src",this.setting.originImg);
        $(".pk-imgclip-chosen-img").attr("src",this.setting.originImg);
    }

    ImgClip.prototype.addEvent =function(){

        this.$mask.on("mousedown",$.proxy(this.listenStartMove,this));
    }

    ImgClip.prototype.listenStartMove = function(e){

        e.stopPropagation();
        e.preventDefault();

        this.clientX = e.clientX;
        this.clientY = e.clientY;
        this.$mask.on("mousemove", $.proxy(this.handleMoving,this));
        var self = this;
        this.$mask.one("mouseup", function(){
            self.$mask.off("mousemove", $.proxy(self.handleMoving,self));
        });
//        this.$mask.one("mouseout", function(){
//            self.$mask.off("mousemove", $.proxy(self.handleMoving,self));
//        });
    }

    ImgClip.prototype.handleMoving = function(e){

        e.stopPropagation();
        e.preventDefault();

        var dX = e.clientX - this.clientX;
        var dY = e.clientY - this.clientY;

        this.clientX = e.clientX;
        this.clientY = e.clientY;

        console.log("in handleMoving:("+dX+","+dY+")");
        this.changeChosenPosition(dX,dY);
    }

   ImgClip.prototype.changeChosenPosition = function(dX,dY){
       var originTop = parseFloat(this.$mask.css("top").match(/[0-9]+(?=px)/)[0])  || 0;
       var originLeft = parseFloat(this.$mask.css("left").match(/[0-9]+(?=px)/)[0]) || 0;

       console.log("in changeChosenPosition:("+originTop+","+originLeft+")");
       this.$mask.css({
           "top":originTop+dY+"px",
           "left":originLeft+dX+"px"
       });
       this.$chosenImg.css({
           "top":-originTop-dY+"px",
           "left":-originLeft-dX+"px"
       });
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