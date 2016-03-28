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
//            else
//                data.addEvent();
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