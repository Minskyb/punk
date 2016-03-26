/** version 1.0.0 author Punk.Li **//**
 * Created by ASUS on 2016/3/25.
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

    $(document).on("click",function(e){

        var $target = $(e.target);
        // if the click is trigger by pk-menu-item-content then continue
        if(/pk-menu-item-content/.test($target[0].className)){

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
        }

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

        var e = $.Event('show.bt.modal',{relatedTarget:_relatedTarget});
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
            .off('.dismiss.bt.modal')
        this.$backdrop
            .removeClass('in')
            .off('dismiss.bt.modal');
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


        this.$element.on('click.dismiss.bt.modal',function(e){
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
            var data = $this.data("bt.modal");
            if(!data) $this.data("bt.modal",(data=new Modal(this,setting)));

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

        var option = $target.data('bt.modal') ? 'toggle': $.extend({show:true},$target.data(),$this.data());// $target.data() 返回 $target 元素上所有通过 data 保存的数据

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