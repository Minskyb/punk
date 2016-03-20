/** version 1.0.0 author Punk.Li **//**
 * Created by Administrator on 2016/3/13.
 */
'use strict';

(function(callback){
    "function" == typeof define && define.amd ? define(['jquery',callback]) : "object" == typeof exprots ? module.exports = callback : callback(jQuery);
})(function($){

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
});