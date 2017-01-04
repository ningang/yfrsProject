/**
 * Nw通用组件框架
 * Created by 江苏宁吾电子商务有限公司 on 2016/12/13.
 * @author XuYuanChang
 * 版权所有  侵权必究
 * 　　　┏┓　　　┏┓
 * 　　┏┛┻━━━┛┻┓
 * 　　┃　　　　　　　┃
 * 　　┃　　　━　　　┃
 * 　　┃　┳┛　┗┳　┃
 * 　　┃　　　　　　　┃
 * 　　┃　　　┻　　　┃
 * 　　┃　　　　　　　┃
 * 　　┗━┓　　　┏━┛
 * 　　　　┃　　　┃神兽保佑
 * 　　　　┃　　　┃代码无BUG！
 * 　　　　┃　　　┗━━━┓
 * 　　　　┃　　　　　　　┣┓
 * 　　　　┃　　　　　　　┏┛
 * 　　　　┗┓┓┏━┳┓┏┛
 * 　　　　　┃┫┫　┃┫┫
 * 　　　　　┗┻┛　┗┻┛
 */
;!function(w){
    // 使用严格模式
    // "use strict";

    var
        // 定义但概念页面路径: nw(document)
        rootNw,

        // 定义dom树
        readyList,

        // Support: IE9
        // 对于 `typeof xmlNode.method` instead of `xmlNode.method !== undefined`
        core_strundefined = typeof undefined,

        // 定义一些window全局对象
        location = window.location,
        document = window.document,
        docElem = document.documentElement,

        // 防止变量冲突
        _Nw = window.Nw,

        // [[Class]] -> type pairs
        class2type = {},

        // List of deleted data cache ids, so we can reuse them
        core_deletedIds = [],

        core_version = "2.0.3",

        // Save a reference to some core methods
        core_concat = core_deletedIds.concat,
        core_push = core_deletedIds.push,
        core_slice = core_deletedIds.slice,
        core_indexOf = core_deletedIds.indexOf,
        core_toString = class2type.toString,
        core_hasOwn = class2type.hasOwnProperty,
        core_trim = core_version.trim;

    /**
     * 初始化
     * @param selector
     * @param context
     * @returns {Nw.init}
     * @constructor
     */
    var Nw = function(selector,context) {
        return new Nw.fn.init(selector,context,rootNw);
    };

    /**
     * 定义框架原型对象
     * @type {{version: string, constructor: Nw, init: Nw.init}}
     */
    Nw.fn = Nw.prototype = {
        // 定义版本
        version:core_version,
        // 修正construcotr;
        constructor:Nw,
        // 初始化
        init:function(selector,context,rootNw) {

        }
    };

    // 初始化原型对象的引用指向构造函数的原型
    Nw.fn.init.prototype = Nw.prototype;

    // document对象赋值
    rootNw = document;
    // 定义继承函数
    Nw.extend = Nw.fn.extend = function() {
        var options, name, src, copy, copyIsArray, clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;

        // Handle a deep copy situation
        if ( typeof target === "boolean" ) {
            deep = target;
            target = arguments[1] || {};
            // skip the boolean and the target
            i = 2;
        }

        // Handle case when target is a string or something (possible in deep copy)
        if ( typeof target !== "object" && !Nw.isFunction(target) ) {
            target = {};
        }

        // extend jQuery itself if only one argument is passed
        if ( length === i ) {
            target = this;
            --i;
        }

        for ( ; i < length; i++ ) {
            // Only deal with non-null/undefined values
            if ( (options = arguments[ i ]) != null ) {
                // Extend the base object
                for ( name in options ) {
                    src = target[ name ];
                    copy = options[ name ];

                    // Prevent never-ending loop
                    if ( target === copy ) {
                        continue;
                    }

                    // Recurse if we're merging plain objects or arrays
                    if ( deep && copy && ( Nw.isPlainObject(copy) || (copyIsArray = Nw.isArray(copy)) ) ) {
                        if ( copyIsArray ) {
                            copyIsArray = false;
                            clone = src && Nw.isArray(src) ? src : [];

                        } else {
                            clone = src && Nw.isPlainObject(src) ? src : {};
                        }

                        // Never move original objects, clone them
                        target[ name ] = Nw.extend( deep, clone, copy );

                        // Don't bring in undefined values
                    } else if ( copy !== undefined ) {
                        target[ name ] = copy;
                    }
                }
            }
        }

        // Return the modified object
        return target;
    };
    // 通用检测
    Nw.check = Nw.fn.check = {
        isString:function(str) { return Object.prototype.toString.call(str) ==="[object String]";},
        isFunction: function( obj ) {
            return Nw.type(obj) === "function";
        },
        isArray: Array.isArray,

        isWindow: function( obj ) {
            return obj != null && obj === obj.window;
        },
        isPlainObject: function( obj ) {
            // Not plain objects:
            // - Any object or value whose internal [[Class]] property is not "[object Object]"
            // - DOM nodes
            // - window
            if ( Nw.type( obj ) !== "object" || obj.nodeType || Nw.isWindow( obj ) ) {
                return false;
            }

            // Support: Firefox <20
            // The try/catch suppresses exceptions thrown when attempting to access
            // the "constructor" property of certain host objects, ie. |window.location|
            // https://bugzilla.mozilla.org/show_bug.cgi?id=814622
            try {
                if ( obj.constructor &&
                    !core_hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
                    return false;
                }
            } catch ( e ) {
                return false;
            }

            // If the function hasn't returned already, we're confident that
            // |obj| is a plain object, created by {} or constructed with new Object
            return true;
        }
    };
    // 字符串处理
    Nw.str   = Nw.fn.str = {
        /**
         * 去除字符串中的空格(默认)/指定字符
         * @param s
         * @param v
         * @returns {string|void|XML}
         */
        trim:function(s,v){
            if(v) {
                if(this.isString(v)) return s.replace(v,'');
                else throw new Error(v +'不是一个字符串');
            }
            return s.replace(/\s+/g,'');
        },
        /**
         * 去除字符串左边的空格(默认)/或者指定字符
         * @param s
         * @param v
         * @returns {string|void|XML}
         */
        ltrim:function(s,v) {
            if(v) {
                if(this.isString(v)) return s.replace(eval("/^"+v+"*/"),'');
                else throw new Error(v +'不是一个字符串');
            }
            return s.replace(/^\s+/,''); },
        /**
         * 去除字符串右边的空格(默认)/或者指定字符
         * @param s
         * @param v
         * @returns {string|void|XML}
         */
        rtrim:function(s,v) {
            if(v) {
                if(this.isString(s)) return s.replace(eval("/"+v+"*$/"),'');
                else  throw new Error(v +'不是一个字符串');
            }
            return s.replace(/\s+$/,'');
        },
        /**
         * 单词首字符大写
         * @param str
         * @returns {string}
         */
        ucfirst:function(str) {return str.substr(0,1).toUpperCase()+str.substr(1); }
    };
    // 事件处理
    Nw.event = Nw.fn.event  = {
        on:function(id,type,fn) {
            if(typeof id == 'string') {
                var dom = document.getElementById(id);
            }else {
                var dom = id;
            }
            if(dom.addEventListener) {
                dom.addEventListener(type,fn,false)
            }else {
                dom.attachEvent(type,fn);
            }
        },
        un:function(id,type,fn) {
            if(typeof id == 'string') {
                var dom = document.getElementById(id);
            }else {
                var dom = id;
            }
            if(dom.removeEventListener) {
                dom.removeEventListener(type,fn,false);

            }else {
                dom.detachEvent(type,fn);
            }
        },
        click:function(fn) {

        }
    };
    // 动画
    Nw.extend({
        config:{},
        easing:{
            linear:function(t,b,c,d){
                return (c-b)*(t/d);
            },
            swing: function(t,b,c,d) {
                return this.easeOutQuad(t,b,c,d);
            },
            easeInQuad: function (t, b, c, d) {
                return c*(t/=d)*t + b;
            },
            easeOutQuad: function (t, b, c, d) {
                return -c *(t/=d)*(t-2) + b;
            },
            easeInOutQuad: function (t, b, c, d) {
                if ((t/=d/2) < 1) return c/2*t*t + b;
                return -c/2 * ((--t)*(t-2) - 1) + b;
            },
            easeInCubic: function (t, b, c, d) {
                return c*(t/=d)*t*t + b;
            },
            easeOutCubic: function (t, b, c, d) {
                return c*((t=t/d-1)*t*t + 1) + b;
            },
            easeInOutCubic: function (x, t, b, c, d) {
                if ((t/=d/2) < 1) return c/2*t*t*t + b;
                return c/2*((t-=2)*t*t + 2) + b;
            },
            easeInQuart: function (b, c, d) {
                return c*(t/=d)*t*t*t + b;
            },
            easeOutQuart: function (t, b, c, d) {
                return -c * ((t=t/d-1)*t*t*t - 1) + b;
            },
            easeInOutQuart: function (t, b, c, d) {
                if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
                return -c/2 * ((t-=2)*t*t*t - 2) + b;
            },
            easeInQuint: function (t, b, c, d) {
                return c*(t/=d)*t*t*t*t + b;
            },
            easeOutQuint: function (t, b, c, d) {
                return c*((t=t/d-1)*t*t*t*t + 1) + b;
            },
            easeInOutQuint: function ( t, b, c, d) {
                if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
                return c/2*((t-=2)*t*t*t*t + 2) + b;
            },
            easeInSine: function (t, b, c, d) {
                return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
            },
            easeOutSine: function (t, b, c, d) {
                return c * Math.sin(t/d * (Math.PI/2)) + b;
            },
            easeInOutSine: function (t, b, c, d) {
                return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
            },
            easeInExpo: function (t, b, c, d) {
                return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
            },
            easeOutExpo: function (t, b, c, d) {
                return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
            },
            easeInOutExpo: function (t, b, c, d) {
                if (t==0) return b;
                if (t==d) return b+c;
                if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
                return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
            },
            easeInCirc: function (t, b, c, d) {
                return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
            },
            easeOutCirc: function (t, b, c, d) {
                return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
            },
            easeInOutCirc: function (t, b, c, d) {
                if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
                return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
            },
            easeInElastic: function (t, b, c, d) {
                var s=1.70158;var p=0;var a=c;
                if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
                if (a < Math.abs(c)) { a=c; var s=p/4; }
                else var s = p/(2*Math.PI) * Math.asin (c/a);
                return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
            },
            // 没有实现
            easeOutElastic: function (t, b, c, d) {
                var s=1.70158;var p=0;var a=c;
                if (t==0) return b;
                if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
                if (a < Math.abs(c)) { a=c; var s=p/4; }
                else var s = p/(2*Math.PI) * Math.asin (c/a);
                return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
            },
            // 犹豫运动
            easeInOutElastic: function (t, b, c, d) {
                var s=1.70158;var p=0;var a=c;
                if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
                if (a < Math.abs(c)) { a=c; var s=p/4; }
                else var s = p/(2*Math.PI) * Math.asin (c/a);
                if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
                return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
            },
            // 后退缓冲
            easeInBack: function (t, b, c, d, s) {
                if (s == undefined) s = 1.70158;
                return c*(t/=d)*t*((s+1)*t - s) + b;
            },
            // 终点缓冲
            easeOutBack: function ( t, b, c, d, s) {
                if (s == undefined) s = 1.70158;
                return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
            },
            // 弹射运动
            easeInOutBack: function (t, b, c, d, s) {
                if (s == undefined) s = 1.70158;
                if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
                return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
            },
            // 跳跃运动
            easeInBounce: function ( t, b, c, d) {
                return c - Nw.easing.easeOutBounce ( d-t, 0, c, d) + b;
            },
            // 弹簧运动
            easeOutBounce: function (t, b, c, d) {
                if ((t/=d) < (1/2.75)) {
                    return c*(7.5625*t*t) + b;
                } else if (t < (2/2.75)) {
                    return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
                } else if (t < (2.5/2.75)) {
                    return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
                } else {
                    return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
                }
            },
            // 快速弹跳
            easeInOutBounce: function (t, b, c, d) {
                if (t < d/2) return Nw.easing.easeInBounce ( t*2, 0, c, d) * .5 + b;
                return Nw.easing.easeOutBounce ( t*2-d, 0, c, d) * .5 + c*.5 + b;
            }
        },
        timer:'',
        add:function(dom,json,duration,easing) {
            // 设置属性 调用适配器
            this.adapter(dom,json,duration,easing);
            // 执行动画
            this.run();
        },
        run:function() {
            this.timer = setInterval(function(){
                Nw.move();
            },30);
        },
        move:function() {
            if(this.config.tween>=1 || this.config.tween<=-1 ) {
                this.stop();
            }else {
                var pass = +new Date();
                this.config.tween = this.tween(pass);
                // console.log( this.config.tween);  运动时间
                var styles = this.config.styles;
                for (var i = 0; i<styles.length; i++) {

                    this.oneProperty(this.config.dom,styles[i].property,styles[i].start+styles[i].distance*this.config.tween);
                }
            }
        },
        stop:function() {
            var that = this;
            clearInterval(that.timer);
        },
        tween:function(pass,ease) {
            var withTime = pass-this.config.now;
            // var tween = withTime/this.config.duration;

            // console.log(this.easing[ease](withTime,0,1,this.config.duration));
            return this.easing[this.config.easing](withTime,0,1,this.config.duration);
        },
        oneProperty:function(dom,k,v) {

            if(k == 'opacity') {
                dom.style[k] = v;
            }else {
                dom.style[k] = v+'px';
            }
        },
        adapter:function(dom,json,duration,easing) {
            var getStyles = function(dom,json) {
                var data = [];
                for(var i in json) {
                    var obj = {};
                    // 元素的起始位置
                    obj.start = parseFloat(Nw.css(dom,i));
                    // 设定的目标位置-起始位置 = 距离
                    obj.distance = parseFloat(json[i]-obj.start);
                    // 运动的属性挂载
                    obj.property = i;
                    data.push(obj);
                }
                return data;
            };
            // 运动元素
            this.config.easing = easing;
            // 当前dom
            this.config.dom = dom;
            // 当前时间
            this.config.now = +new Date();
            // 运动周期
            this.config.duration = duration;
            // 动画渐变间隔
            this.config.tween = 0;
            // 动画属性
            this.config.styles = getStyles(dom,json);
        }
    });
    //css
    Nw.extend({
        css:function(dom,key,value) {
            if(typeof dom=='string') throw new Error(dom+'不是元素');
            /**
             *------------------ 获取样式-------------
             * currentStyle 获取样式
             * getComputeStyle() 获取样式 兼容性问题
             */
            var getStyle = function(dom,key) {
                // 当前浏览器支持currentStyle
                if(dom.currentStyle) {
                    return currentStyle[key];
                }
                // 当前浏览器支持getComputeStyle()
                return getComputedStyle(dom,null)[key];
            };
            /**
             *------------------ 设置样式-------------
             * currentStyle 获取样式
             * getComputeStyle() 获取样式 兼容性问题
             */
            var setStyle = function(dom,key,value) {
                dom.style[key] = value;
            };

            // 是否是多个dom
            if(dom.length) {
                // 存在value
                if(value) {
                    // 为多个context设置样式
                    for(var i=dom.length-1;i>=0;i--) {
                        setStyle(dom[i],key,value);
                    }
                }else {
                    // 不存在value
                    var styles = [];
                    for(var i=0;i<dom.length;i++) {
                        styles.push(getStyle(dom[i],key));
                    }
                    return styles;
                }
            }else {
                // 存在value
                if(value) {
                    // 为单个context设置样式
                    setStyle(dom,key,value);
                    // 不存在value
                }else {
                    // 获取style
                    return getStyle(dom,key);
                }

            }
        }
    });
    // 日期处理
    Nw.date = Nw.fn.date = {
        format:function(date,format) {
            var o = {
                "M+" : date.getMonth()+1, //month
                "d+" : date.getDate(),    //day
                "h+" : date.getHours(),   //hour
                "m+" : date.getMinutes(), //minute
                "s+" : date.getSeconds(), //second
                "q+" : Math.floor((date.getMonth()+3)/3),  //quarter
                "S" : date.getMilliseconds() //millisecond
            }
            if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
                (date.getFullYear()+"").substr(4- RegExp.$1.length));
            for(var k in o)if(new RegExp("("+ k +")").test(format))
                format = format.replace(RegExp.$1,
                    RegExp.$1.length==1? o[k] :
                        ("00"+ o[k]).substr((""+ o[k]).length));
            return format;
        }
    };
    w.yfrs = Nw;
}(window);
// jquery-validate
yfrs.extend({
    validate:function(dom,rules,messages){
        if(typeof dom == 'string') throw new Error(dom +'is string,please use form element');
        dom.validate({
            rules:rules,
            messages:messages,
            errorPlacement: function(error, element) {
                error.appendTo(element.parent());  
            },
            debug:false,
        });
    }
})