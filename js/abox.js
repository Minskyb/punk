/**
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