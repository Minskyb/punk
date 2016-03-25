/**
 * Created by ASUS on 2015/12/24.
 */
'use strict';
(function($){

    var Modal = function(element,setting){

        this.$body = $(document.body);
        this.$element = $(element);
        this.$dialog = this.$element.find(".modal-dialog");
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

        //var paddingRight = this.measureScrollbar();
        // 如何屏蔽 body 的滚动条，并且在需要的时候给 modal 添加滚动条
        //this.resetScrollbar();
        //this.$body.addClass('modal-open');


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
        this.$body.removeClass('modal-open');
        this.removeBackdrop();
    }


    Modal.prototype.toggle = function(_relatedTarget){
        this.isShown ? this.hide(_relatedTarget) : this.show(_relatedTarget);
    }

    Modal.prototype.backdrop = function(callback){

        var self = this;

        if(!this.isShown) return;
        this.$backdrop = $(document.createElement('div'));
        this.$backdrop.addClass('modal-backdrop fade')
            .appendTo(this.$body);


        this.$element.on('click.dismiss.bt.modal',function(e){
           if($(e.target).is(self.$element[0]) ) self.hide();
        });
        /*兼容IE8 浏览器，通过上面的方法 IE8只能监听到 content 内部的点击事件，而无法监听到 content 以外的事件*/
        this.$backdrop.on("click",function(e){
            self.hide();
        });

        this.$backdrop.addClass('in');
        this.$element.show(100).addClass('in');
    }

    Modal.prototype.removeBackdrop = function(){
        this.$backdrop && this.$backdrop.remove()
        this.$backdrop = null;
        //this.ignoreBackdropClick = false;
    }

    Modal.prototype.resetScrollbar = function(){

        var bodyPad = parseInt((this.$body.css('padding-right') || 0),10);
        var originalBodyPad = document.body.style.paddingRight || "";

        console.log( );
    }

    Modal.prototype.measureScrollbar = function(){

        var scrollDiv = document.createElement('div');
        scrollDiv.className = 'modal-measure-scrollbar';
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