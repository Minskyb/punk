/**
 * Created by ASUS on 2016/3/30.
 */
'use strict';

define([
    'jquery',
    'BModule',
    'text!app/module/imgPreview.html',
    'extendJquery'
],function($,BM,template){

    function MImgPreview(options){
        BM.call(this,options);
    }

    MImgPreview.prototype = $.PK.inheritPrototype(BM.prototype);

    MImgPreview.prototype.initProperty = function(){

        BM.prototype.initProperty.call(this);

        this.template = template;
    }

    MImgPreview.prototype.render = function() {

        BM.prototype.render.call(this);

        $(".js-file").on("change", this.onUploadImgChange);
    }

    MImgPreview.prototype.onUploadImgChange = function(e){

        var preview = $(".js-preview")[0];
        var previewBox = $(".js-preview-box")[0];

        if(this.files && this.files[0]){

            preview.src = window.URL.createObjectURL(this.files[0]);
            preview.onload = function(){
                this.style.top = (previewBox.clientHeight -  this.clientHeight)/2 + "px";
                this.style.visibility = "visible";
            }
        }
        else{
            this.select();
            this.blur();
            var imgSrc = document.selection.createRange().text;
            document.selection.empty();
            // sizingMethod = 'image' 时，改变容器大小，以满足图片大小
            preview.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + imgSrc + "',sizingMethod = 'image';)";

            // 根据载入图片的实际高度及宽度比，及容器宽度，算出缩放后的高度，在根据情况设置 top。
            var previewFix = $(".js-preview-fix")[0];
            $(previewFix).height(preview.offsetHeight* preview.clientWidth / preview.offsetWidth);

            previewFix.style.top = (previewBox.clientHeight -  previewFix.clientHeight)/2 + "px";
            // sizingMethod = 'scale' 时，改变图片大小，以满足容器大小
            previewFix.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + imgSrc + "',sizingMethod = 'scale';)"
        }
    }

    return MImgPreview;
});