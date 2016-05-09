/**
 * Created by Administrator on 2016/4/10.
 */
'use strict';

define(function(require){

    function Axis(option,mychart){
        this.mychart = mychart;
        this.option = option;
        this._init();
    }

    Axis.prototype._init = function(){
        this.minValue = 0;
        this.maxValue = 0;
    }

    Axis.prototype.refresh = function(option){
        this.option = option;
        this._render();
    }

    Axis.prototype._render = function(){

        this._resetMinMaxValue(this.mychart);
//        this._drawxAxis();
//        this._drawyAxis();
    }



    Axis.prototype._resetMinMaxValue = function(mychart){

        for(var i = 0,len = mychart.series.length; i<len; i++){
            var data = mychart.series[i].data;
            for(var j = 0,l = data.length; j<l; j++){
                this.minValue > data[j] ? data[j] : this.minValue;
                this.maxValue > data[j] ? this.maxValue : data[j];
            }
        }
    }


    return Axis;

});