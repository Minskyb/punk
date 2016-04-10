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