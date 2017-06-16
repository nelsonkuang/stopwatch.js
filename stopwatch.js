; (function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['stopwatch'], function (stopwatch) {
            // Also create a global in case some scripts
            // that are loaded still are looking for
            // a global even when an AMD loader is in use.
            return (root.stopwatch = factory(stopwatch));
        });
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory(require('stopwatch'));
    } else {
        // Browser globals (root is window)
        root.stopwatch = factory(root.stopwatch);
    }
}(this, function (stopwatch) {

    var root = this || global;
    var previousStopwatch = root.stopwatch;
    /**
     *
     * @param options
     * @constructor
     */
    var stopwatch = function (options) {
        var defaults = {
            el: '.stopwatch', // 元素
            startTime: 0, // 要倒计时的时间，秒为单位
            displayTpl: '{hour} : {minute} : {second} : {millisecond}' // 显示模版
        };
        options = this.extend(defaults, options);
        this.name = 'stopwatch';
        this.version = "1.0.0";
        this.el = document.querySelector(options.el);
        this.timer = '';
        this.startTime = options.startTime;
        this.currentTime = options.startTime;
        this.displayTpl = options.displayTpl;
        this.init();
    };
    stopwatch.prototype = {
        /**
         * initialization
         * @private
         */
        init: function () {
            var This = this,
                currentTime = This.startTime;
            this.timer = setInterval(function () {
                currentTime += 0.01;
                This.setTime(currentTime, This.displayTpl);
                This.currentTime = currentTime;
            }, 10);
        },
        /**
         * pause
         */
        pause: function () {
            clearInterval(this.timer);
            this.timer = '';
        },
        /**
         * start
         */
        start: function () {
            var This = this,
                currentTime = This.currentTime;
            this.timer = setInterval(function () {
                currentTime += 0.01;
                This.setTime(currentTime, This.displayTpl);
                This.currentTime = currentTime;
            }, 10);
        },
        /**
         * reset
         */
        reset: function () {
            this.pause();
            this.setTime(0, this.displayTpl);
        },
        /**
         * set current time
         * @param {Number} currentTime
         * @param {String} tpl
         */
        setTime: function (currentTime, displayTpl) {
            hour = Math.floor((currentTime / 3600) % 24);
            minute = Math.floor((currentTime / 60) % 60);
            second = Math.floor(currentTime % 60);
            millisecond = Math.floor(currentTime * 100 % 100);
            if (hour < 10) {
                hour = '0' + hour;
            }
            if (minute < 10) {
                minute = '0' + minute;
            }
            if (second < 10) {
                second = '0' + second;
            }
            if (millisecond < 10) {
                millisecond = '0' + millisecond;
            }
            this.el.innerHTML = displayTpl.replace('{hour}', hour).replace('{minute}', minute).replace('{second}', second).replace('{millisecond}', millisecond);
        },
        getName: function () {
            return this.name;
        },
        getVersion: function () {
            return this.version;
        },
        /**
         * clone objs
         * @param target
         * @param source
         */
        extend: function (target, source) {
            for (var p in source) {
                if (source.hasOwnProperty(p)) {
                    target[p] = source[p];
                }
            }
            return target;
        },
        /**
        * change namespace of library to prevent name collisions
        * @private
        */
        setNamespace: function () {
            root.stopwatch = previousStopwatch;
            return this;
        }
    };
    return stopwatch;
}));
