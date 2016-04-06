/**
 * Created by ASUS on 2016/4/6.
 */
'use strict';
define([
    'jquery',
    'BModule',
    'text!app/module/reactjs.html',
    'react',
    'jsx',
    'extendJquery'
],function($,BM,template,React){

    function ReactJS(options){
        BM.call(this,options);
    }

    ReactJS.prototype = $.PK.inheritPrototype(BM.prototype);

    ReactJS.prototype.initProperty =function(){

        BM.prototype.initProperty.call(this);

        this.template = template;
    }

    ReactJS.prototype.render = function(){

        BM.prototype.render.call(this);

        var HelloMessage = React.createClass({displayName: "HelloMessage",
            render: function() {
                return React.createElement("div", null, "Hello ", this.props.name);
            }
        });

        React.render(React.createElement(HelloMessage, {name: "John"}), document.getElementById("example"));
    }

    return ReactJS;
})