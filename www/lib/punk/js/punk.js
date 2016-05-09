/** version 1.0.0 author Punk.Li **//**
 * Created by Administrator on 2016/3/27.
 * Abox  auto height box
 */
'use strict';

(function($){

    function Abox(element,ratio){
        this.$element = $(element);
        this.ratio = ratio;
    }

    Abox.prototype.resetHeight = function(){
        this.$element.css("height",this.$element.width()*this.ratio);
    }

    function Plugin(){
        resizeHandler();

       $(window).resize(resizeHandler);

        function resizeHandler(e){
            $('[data-toggle="pk-ratio"]').each(function(){
                var $this = $(this),
                    data = $this.data("pk-ratio"),
                    ratio = parseFloat($this.attr("data-ratio"));
                if(!ratio){
                    console.error("data-ratio 系数未设置\n"+ratio);
                    return;
                }
                if(!data)
                    $this.data("pk-ratio",(data = new Abox(this,ratio)));

                data.resetHeight();
            });
        }
    }

    $.fn.Abox = Plugin;

//    $(document).on("resize",function(){
//
//        $("")
//    });

})(jQuery);
/**
 * Created by ASUS on 2016/3/28.
 */
'use strict';

(function(){
    function DExcute(){

    }

    function Plugin(){

    }

    $.fn.DExcute = Plugin;

})(jQuery);
/**
 * Created by ASUS on 2016/3/29.
 */
'use strict';

(function($){
    function ImgClip(element,setting){

        this.$element = $(element);

        this.loadComponent();
        this.initProperty(setting);
        this.addEvent();
    }

    ImgClip.defaults = {
         width:100   // 被选区的初始宽度，
        ,height:100  // 被选区的初始高度，
        ,handle:true   // 选择区域大小是否可变
        ,top:0
        ,left:0
    }

    ImgClip.prototype.initProperty = function(setting){
        this.setting = $.extend(true,ImgClip.defaults,setting ? setting : {});

        // 考虑 image.onload 事件兼容刷新处理，IE浏览器二次刷新好像不会触发 onload 事件。
        this.$origin.attr("src",this.setting.img);
        $(".pk-imgclip-chosen-img").attr("src",this.setting.img);

        // 设置大小
        this.$mask.width(this.setting.width);
        this.$mask.height(this.setting.height);

        // 设置位置
        this.setPosition(this.setting.top,this.setting.left);

        this.width = this.$mask.width();
        this.height = this.$mask.height();
        this.top = this.$mask[0].offsetTop;
        this.left = this.$mask[0].offsetLeft;

    }

    ImgClip.prototype.loadComponent = function(){

        var mask = '<div class="pk-imgclip-mask"><div class="pk-imgclip-chosen"><img class="pk-imgclip-chosen-img"><div class="pk-chosen-border top"></div><div class="pk-chosen-border bottom"></div><div class="pk-chosen-border left"></div><div class="pk-chosen-border right"></div></div><div class="pk-imgclip-handle"><div class="pk-handle-border top"></div><div class="pk-handle-border bottom"></div><div class="pk-handle-border left"></div><div class="pk-handle-border right"></div><div class="pk-handle-box top-center"></div><div class="pk-handle-box top-left"></div><div class="pk-handle-box top-right"></div><div class="pk-handle-box bottom-center"></div><div class="pk-handle-box bottom-left"></div><div class="pk-handle-box bottom-right"></div><div class="pk-handle-box left-middle"></div><div class="pk-handle-box right-middle"></div></div></div>'

        var origin = '<img class="pk-imgclip-origin">';

        this.$mask =$(mask);
        this.$origin = $(origin);

        this.$chosenImg = $(".pk-imgclip-chosen-img",this.$mask);

        this.$element.append(this.$mask);
        this.$element.append(this.$origin);

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

        $(document).on("mousemove",{type:handleType}, $.proxy(this.handleMoving,this));
        $(document).one("mouseup",{type:handleType},$.proxy(this.handleMoveEnd,this));
    }

    ImgClip.prototype.setPosition = function(top,left){

        this.$mask.css({
            "top":top+"px",
            "left":left+"px"
        });
        this.$chosenImg.css({
            "top":-top+"px",
            "left":-left+"px"
        });
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

        this.width = this.$mask.width();
        this.height = this.$mask.height();
        this.top = this.$mask[0].offsetTop;
        this.left = this.$mask[0].offsetLeft;

        $(document).off("mousemove",$.proxy(this.handleMoving,this));
    }

    ImgClip.prototype.changeChosenPosition = function(dX,dY){

        var originTop = this.top || 0;
        var originLeft = this.left || 0;

        console.log("top,left:"+(originTop+dY)+","+(originLeft+dX));
       if(this.isMoveOut(dX,dY,false) || originTop+dY<0 || originLeft+dX<0 ) return;

        this.setPosition(originTop+dY,originLeft+dX);
    }

    ImgClip.prototype.changeBoxSize = function(direction,distance,pn){

        console.log("width,height:("+this.width+","+this.height+")");

        if(direction == 'X'){
            var dY = distance * this.height / this.width;

            // 超出边界
            if(this.isMoveOut(distance*pn,dY*pn, pn<0 ? true:false)) return;

            this.$mask.width(this.width+distance*pn);
            this.$mask.height(this.height+dY*pn);

            if(pn<0){
                this.changeChosenPosition(distance,dY);
            }
        }
        else if(direction == 'Y'){
            var dX = distance * this.width / this.height;

            // 超出边界
            if(this.isMoveOut(dX*pn,distance*pn, pn<0 ? true:false)) return;

            this.$mask.width(this.width+dX*pn);
            this.$mask.height(this.height+distance*pn);

            if(pn<0){
                this.changeChosenPosition(dX,distance);
            }
        }
    }

    ImgClip.prototype.isMoveOut = function(dX,dY,ismoving){

        var width = dX + this.width + this.left;
        var height = dY + this.height + this.top;

        console.log("width,height:"+width+","+height);


        if(width > this.$chosenImg.width() || width <0 || height > this.$chosenImg.height() || height <0){
            return true;
        }
        else if(ismoving){

            var top = this.top - dY;
            var left = this.left - dX;

            console.log("top,left:"+top+","+left);

            if(top<0 || left <0){
                return true;
            }
        }
        return false;
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
/**
 * Created by ASUS on 2016/3/30.
 */
'use strict';
(function($){
    function ImgUpload(element,setting){

    }

    function Plugin(){

    }

    $.fn.ImgUpload = Plugin;

})(jQuery);
/**
 * Created by Administrator on 2016/4/9.
 */
(function($,w){

    function Layer(element){
        this.$element = element;
        this._init();
    }

    Layer.prototype._init = function(){
        this._saveOriginPosition();
        this._addEvent();
    }

    Layer.prototype._saveOriginPosition = function(){

        this.$element.each(function(){
            var $this = $(this);
            var data = $this.data("data-layer-origin-position-y");
            if(!data) $this.data("data-layer-origin-position-y",parseFloat($this.css("background-position-y"),10));
        });
    }

    Layer.prototype._addEvent = function(){
        $(w).bind("load",this._scrollHandler.bind(this));
        $(w).bind("scroll",this._scrollHandler.bind(this));
        $(w).bind("resize",this._scrollHandler.bind(this));
    }

    Layer.prototype._scrollHandler = function(e){

        var scrollTop = $(w).scrollTop();
        var wHeight = $(w).height();

        this.$element.each(function(i){

            var $this = $(this)
                ,offset = $this.offset();
            if(offset.top+$this.height() > scrollTop && scrollTop+wHeight > offset.top){

                var ratio = parseFloat($this.attr("data-layer-position-ratio"),10);
                var origin = $this.data("data-layer-origin-position-y");
                $this.css("background-position-y",origin+(scrollTop+wHeight-offset.top)*ratio);
                console.log(i+":--->"+(origin+(scrollTop+wHeight-offset.top)*ratio));
            }
        });
    }

    Layer.prototype.setTarget = function(element){
        this.$element = element;
        this._saveOriginPosition();
    }

    Layer.prototype.dispose = function(){

        this.$element.data("pk-layer",null);
        this.$element = null;

        $(w).unbind("load",this._scrollHandler.bind(this));
        $(w).unbind("scroll",this._scrollHandler.bind(this));
        $(w).unbind("resize",this._scrollHandler.bind(this));
    }

    function Plugin(){
        var data;
        this.each(function(){
            var $this = $(this);
            data = $this.data("pk-layer");
        });
        if(!data) this.data("pk-layer",(data = new Layer(this)));
        else data.setTarget(this);
    }

    $.fn.layer = Plugin;

})(jQuery,window)
/**
 * Created by ASUS on 2016/3/25.
 * LimitWords
 */
'use strict';

(function($){
    function LimitWords(element,setting){

        this.setting = $.extend(LimitWords.defaults,setting);

        this.$element = $(element);
        this.addEvent();
    }

    LimitWords.defaults = {
        limitLength:200
    }

    LimitWords.prototype.addEvent = function(){

        this.$element.on("keyup", $.proxy(this.chargeWordsNumber,this));

        // 当 textarea 失去焦点时，移除 keyup 事件监听
        var self = this;
        this.$element.one("focusout",function(){
            //self.$element.off("keyup","**");  // 这种方法无法解除 keyup 事件监听
            self.$element.off("keyup",$.proxy(self.chargeWordsNumber,self));
        })
    }

    LimitWords.prototype.chargeWordsNumber = function(e){

        var originValue = this.$element.val(), i=0,len=originValue.length,codeLength=0;
        for(;i<len;i++){

            codeLength += originValue.charCodeAt(i)>255 ? 2:1;

            if(codeLength>this.setting.limitLength){
                codeLength -= originValue.charCodeAt(i)>255 ? 2:1;
                this.$element.next(".pk-input-add>.js-number").text(codeLength);
                return this.$element.val(originValue.slice(0,i));
            }
        }
        return this.$element.next(".pk-input-add").children(".js-number").text(codeLength);
    }

    function Plugin(setting){
        return this.each(function(){
            var $this = $(this);
            var data = $this.data("limit-words");
            if(!data)
            $this.data("limit-words",(data = new LimitWords(this,setting)));
            else
                data.addEvent();
        });
    }

    $.fn.LimitWords = Plugin;

    // 自动执行，可以省略让用户手动添加，因为当插件逐渐变多，会导致自动添加的监听事件过多
    // 从而产生不必要的内存浪费。
    $(document).ready(function(){
        $(document).on("click",'[data-toggle="limit-words"]',function(e){
            var $target = $(e.target);
            var limitLength = parseInt($target.attr("data-limit"));
            Plugin.call($target,{limitLength:limitLength});
        });
    });
})(jQuery);
/**
 * Created by ASUS on 2016/3/22.
 */
'use strict';

(function($){

    $(document).on("click",'[class*="pk-menu-item-content"]',function(e){

        var $target = $(e.target);
        // if the click is trigger by pk-menu-item-content then continue
        //if(/pk-menu-item-content/.test($target[0].className)){

            $target.parent().toggleClass("toggle");
            // ignore the click when which triggered by toggle menu
            if($($target.parent()).attr("data-toggle") == "menu")return;

            // remove all active
            var menu = $target.parents(".pk-menu")[0];
            $(".pk-menu-item-content",menu).removeClass("active");

            // add active for self
            $target.addClass('active');

            // find all parent item and add active for their child content
            var $parent = $target.parents(".pk-menu-item");
            if($parent)
                $parent.children(".pk-menu-item-content").addClass("active");
        //}

    });
})(jQuery);
/**
 * Created by ASUS on 2015/12/24.
 */
'use strict';
(function($){

    var Modal = function(element,setting){

        this.$body = $(document.body);
        this.$element = $(element);
        this.$dialog = this.$element.find(".pk-modal-dialog");
        this.$backdrop           = null;
        this.isShown             = null;
        //this.ignoreBackdropClick = false;

    }

    Modal.TRANSITION_DURATION = 300;

    Modal.defualts = {};

    /*
    * _relatedTarget was the trigger object
    * */
    Modal.prototype.show = function(_relatedTarget){
        var self = this;

        var e = $.Event('show.pk.modal',{relatedTarget:_relatedTarget});
        this.$element.trigger(e);

        if(this.isShown) return;
        this.isShown = true;

        var scrollBarWidth = this.measureScrollbar();
        //屏蔽 body 的滚动条，并且在需要的时候给 modal 添加滚动条
        this.$body.addClass('pk-modal-open');
        this.hideScrollbar(scrollBarWidth);



        /* 点击 × 符号 */
        //this.$element.on('click.dismiss.bt.modal','[data-dismiss="modal"]', $.proxy(this.hide,this));

        //this.$dialog.on('mousedown.dismiss.bt.modal',function(){
        //    self.$element.one('mouseup.dismiss.bt.modal',function(e){
        //       self.ignoreBackdropClick = true;
        //    });
        //});


        this.backdrop(function(){});
    }

    Modal.prototype.hide = function(_relatedTarget){

        this.$element
            .removeClass('in')
            .off('.dismiss.pk.modal')
        this.$backdrop
            .removeClass('in')
            .off('dismiss.pk.modal');
        this.isShown = false;
        this.$element.hide();
        this.$body.removeClass('pk-modal-open');
        this.resetScrollbar();
        this.removeBackdrop();
    }


    Modal.prototype.toggle = function(_relatedTarget){
        this.isShown ? this.hide(_relatedTarget) : this.show(_relatedTarget);
    }

    Modal.prototype.backdrop = function(callback){

        var self = this;

        if(!this.isShown) return;
        this.$backdrop = $(document.createElement('div'));
        this.$backdrop.addClass('pk-modal-backdrop fade')
            .appendTo(this.$body);


        this.$element.on('click.dismiss.pk.modal',function(e){
           if($(e.target).is(self.$element[0]) ) self.hide();
        });
        /*兼容IE8 浏览器，通过上面的方法 IE8只能监听到 content 内部的点击事件，而无法监听到 content 以外的事件*/
        this.$backdrop.on("click",function(e){
            self.hide();
        });

        this.$backdrop.addClass('in');
        this.$element.show(0).addClass('in');
    }

    Modal.prototype.removeBackdrop = function(){
        this.$backdrop && this.$backdrop.remove()
        this.$backdrop = null;
        //this.ignoreBackdropClick = false;
    }

    Modal.prototype.hideScrollbar = function(scrollBarWidth){

        this.originBodyPaddingRight = parseInt((this.$body.css('padding-right') || 0),10);
        this.$body.css('padding-right',this.originBodyPaddingRight+scrollBarWidth);
    }

    Modal.prototype.resetScrollbar = function(){

        this.$body.css('padding-right',this.originBodyPaddingRight);
    }

    Modal.prototype.measureScrollbar = function(){

        var scrollDiv = document.createElement('div');
        scrollDiv.className = 'pk-modal-measure-scrollbar';
        this.$body.append(scrollDiv);
        var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        this.$body[0].removeChild(scrollDiv);

        return scrollbarWidth;

    }

    function Plugin(setting,_relatedTarget){

        return this.each(function(){
            var $this = $(this);
            var data = $this.data("pk.modal");
            if(!data) $this.data("pk.modal",(data=new Modal(this,setting)));

            // execute the specified function
            if(typeof setting == 'string') data[setting](_relatedTarget);
            else if(setting.show)
                data.show(_relatedTarget);
        });
    }

    $.fn.modal = Plugin;

    // MODAL   AUTO-INITd
    // 为了兼容 Bolt 框架，顶层事件监听，我们采用 $(document.body) 而非 $(document)
    // 是因为：采用 $(document) 监听的事件无法再 Bolt 框架中多模块之间共用。
    $(document.body).on('click.bt.modal.auto-init','[data-toggle="modal"]',function(e){

        var $this   = $(this)
        var href    = $this.attr('href')
        var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7

        var option = $target.data('pk.modal') ? 'toggle': $.extend({show:true},$target.data(),$this.data());// $target.data() 返回 $target 元素上所有通过 data 保存的数据

        if ($this.is('a')) e.preventDefault();

        Plugin.call($target, option, this);
    });

})(jQuery);
/**
 * Created by Administrator on 2016/3/13.
 */
'use strict';

//(function(callback){
//    "function" == typeof define && define.amd ? define(['jquery'],callback) : "object" == typeof exprots ? module.exports = callback : callback(jQuery);
//})
(function($){

    var Slider = function(element,setting){

        this.setting = $.extend(true,Slider.defaults,setting);

        this.$element = $(element);
        this.$content = $(".pk-content",this.$element);
        this.$page = $(".pk-page",this.$element);

        this.height = this.$element[0].clientHeight; // Slider 控件高度
        this.width = this.$element[0].clientWidth; // Slider 控件宽度
        this.num = this.$page.length; // page 数量

        this.index = 0;  // 当前展示 page 原始序号

        this.initContent();
        this.initNav();

        var browser = window.navigator.userAgent.match(/MSIE\s(\d)/)
       if(browser && parseInt(browser[1])<9 ){
            this.setting.ANIMATION = false;
       }

    };

    Slider.defaults = {
        TRANSITION_DURATION:300,
        NAV:true,
        ANIMATION:true
    }

    /* *
    *  规范 page 大小
    *  设置 content 大小
    * */
    Slider.prototype.initContent = function(){

        $(this.$page[0]).clone().appendTo(this.$content);
        $(this.$page[this.num-1]).clone().prependTo(this.$content);

        this.$page = $(".pk-page",this.$element);

        this.$page.css({width:this.width+"px"});

        if(!this.height){
            this.height = this.$page[0].clientHeight;
        }

        this.$element.css({height:this.height+"px"});
        this.$page.css({height:this.height+"px"});

        this.len = this.width * (this.num+2);
        this.$content.css({width:this.len+"px",left:-this.width+'px'});

    }

    Slider.prototype.initNav = function(){

        if(!this.setting.NAV) return;

        this.$element.append('<div class="pk-slider-previous"></div><div class="pk-slider-next"></div>');

        $(".pk-slider-next",this.$element).on("click",$.proxy(this.next,this));
        $(".pk-slider-previous",this.$element).on("click",$.proxy(this.previous,this));
    }

    Slider.prototype.next = function(e){

        if(!this.setting.ANIMATION){
            this.$content.append($(".pk-page",this.$element)[0]);
            return;
        }


        var left = this.$content[0].style.left.match(/-?\d+(?=px)/)[0] ;
        var that = this;
        this.setLeft(parseInt(left) - that.width,that.setting.TRANSITION_DURATION,function(){

            that.index++;
            if( that.index == that.num){
                that.setLeft(-that.width,0);
                that.index = 0;
            }
        });

    }

    Slider.prototype.previous = function(e){

        if(!this.setting.ANIMATION){
            this.$content.prepend($(".pk-page",this.$element)[this.num-1]);
            return;
        }

        var left = this.$content[0].style.left.match(/-?\d+(?=px)/)[0] ;
        var that = this;
        this.setLeft( parseInt(left) + that.width,that.setting.TRANSITION_DURATION,function(){

            that.index--;
            if( that.index == -1){
                that.setLeft(-that.width*that.num,0);
                that.index = that.num -1;
            }
        });

    }

    Slider.prototype.setLeft = function(newLeft,time,callback){

        this.$content.animate({
            left:newLeft+"px"
        },time,callback);
    }


    function Plugin(setting){

        this.each(function(){

            var $this = $(this);
            var data = $this.data("pk.slider");
            if(!data){
                $this.data("pk.slider",(data = new Slider(this,setting)));
            }
        });

    }

    $.fn.Slider = Plugin;
})(jQuery);