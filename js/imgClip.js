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

        var mask = '<div class="pk-imgclip-mask"><div class="pk-imgclip-chosen"><img class="pk-imgclip-chosen-img"><div class="pk-chosen-border top"></div><div class="pk-chosen-border bottom"></div><div class="pk-chosen-border left"></div><div class="pk-chosen-border right"></div></div><div class="pk-imgclip-handle"><div class="pk-handle-border up"></div><div class="pk-handle-border down"></div><div class="pk-handle-border left"></div><div class="pk-handle-border right"></div><div class="pk-handle-box top-center"></div><div class="pk-handle-box top-left"></div><div class="pk-handle-box top-right"></div><div class="pk-handle-box bottom-center"></div><div class="pk-handle-box bottom-left"></div><div class="pk-handle-box bottom-right"></div><div class="pk-handle-box left-middle"></div><div class="pk-handle-box right-middle"></div></div></div>'

        var origin = '<img class="pk-imgclip-origin">';

        this.$mask =$(mask);
        this.$origin = $(origin);

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

        this.$mask.on("mousedown",$.proxy(this.startMove,this));
    }

    ImgClip.prototype.startMove = function(e){

        e.stopPropagation();
        e.preventDefault();

        this.clientX = e.clientX;
        this.clientY = e.clientY;

        var handleType = this.getHandleType(e.target.classList.toString());

        // 变量初始化
//        switch(handleType){
//            块移动
//            case 0:
                this.originMaskTop = this.$mask[0].offsetTop;
                this.originMaskLeft = this.$mask[0].offsetLeft;
//                break;
//            // border 上移
//            case 1:
//            // border 下移
//            case 2:
//            // border 左移
//            case 3:
//            // border 右移
//            case 4:
                this.originMaskWidth = this.$mask.width();
                this.originMaskHeight = this.$mask.height();
//                break;
//        }

        $(document).on("mousemove",{type:handleType}, $.proxy(this.handleMoving,this));
        $(document).one("mouseup",{type:handleType},$.proxy(this.handleMoveEnd,this));
    }


    ImgClip.prototype.handleMoving = function(e){

        e.stopPropagation();
        e.preventDefault();

        var dX = e.clientX - this.clientX;
        var dY = e.clientY - this.clientY;

        console.log("dX,dY:("+dX+","+dY+")");

        switch(e.data.type){
            case 0:
                this.changeChosenPosition(dX,dY);
                break;
            case 1:
                this.changeBoxSize('Y',dY,-1);
                break;
            case 2:
                this.changeBoxSize('Y',dY,1);
                break;
            case 3:
                this.changeBoxSize('X',dX,-1);
                break;
            case 4:
                this.changeBoxSize('X',dX,1);
                break;
        }
    }

    ImgClip.prototype.handleMoveEnd = function(e){

        switch(e.data.type){
            case 0:
                break;
            case 1:
                break;
            case 2:
                break;
            case 3:
                break;
            case 4:
                break;
        }

        $(document).off("mousemove",$.proxy(this.handleMoving,this));
    }

    ImgClip.prototype.changeChosenPosition = function(dX,dY){

        var originTop = this.originMaskTop || 0;
        var originLeft = this.originMaskLeft || 0;

        this.$mask.css({
            "top":originTop+dY+"px",
            "left":originLeft+dX+"px"
        });
        this.$chosenImg.css({
            "top":-originTop-dY+"px",
            "left":-originLeft-dX+"px"
        });
    }

    ImgClip.prototype.changeBoxSize = function(direction,distance,pn){

        console.log("width,height:("+this.originMaskWidth+","+this.originMaskHeight+")");

        if(direction == 'X'){
            var dY = distance * this.originMaskHeight / this.originMaskWidth;
            this.$mask.width(this.originMaskWidth+distance*pn);
            this.$mask.height(this.originMaskHeight+dY*pn);

            if(pn<0){
                this.changeChosenPosition(distance,dY);
            }
        }
        else if(direction == 'Y'){
            var dX = distance * this.originMaskWidth / this.originMaskHeight;
            this.$mask.width(this.originMaskWidth+dX*pn);
            this.$mask.height(this.originMaskHeight+distance*pn);

            if(pn<0){
                this.changeChosenPosition(dX,distance);
            }
        }
    }

    ImgClip.prototype.getHandleType = function(classStr){

        if(/pk-imgclip-chosen-img/.test(classStr)){
            console.log("chosen 移动");
            return 0;
        }
        else if(/pk-handle-(border|box)\stop/.test(classStr)){
            console.log("border 上移");
            return 1;
        }
        else if(/pk-handle-(border|box)\sbottom/.test(classStr)){
            console.log("border 下移");
            return 2;
        }
        else if(/pk-handle-(border|box)\sleft/.test(classStr)){
            console.log("border 左移");
            return 3;
        }
        else if(/pk-handle-(border|box)\sright/.test(classStr)){
            console.log("border 右移");
            return 4;
        }
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