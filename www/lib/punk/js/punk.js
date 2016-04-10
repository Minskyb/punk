/** version 1.0.0 author Punk.Li **//**
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