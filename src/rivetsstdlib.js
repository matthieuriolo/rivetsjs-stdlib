'use strict';

/**
 * Copyright:   Matthieu Riolo <advise@ocsource.ch>
 * Website:     http://www.ocsource.ch/
 * License:     <see file /License>
 * Created:     2014-11-05
 * Repository:  https://github.com/matthieuriolo/rivetsjs-stdlib
 */



(function (root, factory) {
    if(typeof exports === "object") {
        // CommonJS
        module.exports = factory(require("rivets"), require("moment"));
    }else if(typeof define === "function" && define.amd) {
        // AMD. Register as an anonymous module.
        define(["rivets", "moment"], factory);
    }else {
        // Browser globals
        factory(root.rivets, root.moment);
    }
})(this, function(rivets, moment) {
    rivets.stdlib = {
        defaultPrecision: 2,
        defaultThousandSeparator: "'",
        defaultDecimalSeparator: ".",

        defaultDateFormat: "YYYY-MM-DD",
        defaultTimeFormat: "HH:mm:ss",
        defaultDatetimeFormat: "YYYY-MM-DD HH:mm:ss",
    };

    /*
     * basic formatters for rivets
     *
     */

    /* general */
    rivets.formatters.log = function(target) {
        return console.log(target);
    };

    rivets.formatters.default = function(target, val) {
        return !rivets.formatters.isEmpty(target) ? target : val;
    };

    rivets.formatters.add = function(target, val) {
        return target + val;
    };

    rivets.formatters.sub = function(target, val) {
        return target - val;
    };

    rivets.formatters.map = function(target, obj, prop) {
        var args = Array.prototype.slice.call(arguments);
        args.splice(1,2);
        return obj[prop].apply(obj, args);
    };



    /* check JS types */

    rivets.formatters.isBoolean = function(target) {
        return typeof target == "boolean";
    };

    rivets.formatters.isNumeric = function(target) {
        return !isNaN(target);
    };

    rivets.formatters.isNaN = function(target) {
        if(rivets.formatters.isArray(target))
            return true;
        return isNaN(target);
    };


    rivets.formatters.isInteger = function(n) {
        /**
         * thanks a lot to Dagg Nabbit
         * http://stackoverflow.com/questions/3885817/how-to-check-if-a-number-is-float-or-integer
         */
        return n === +n && n === (n|0);
    };

    rivets.formatters.isFloat = function(n) {
        /**
         * thanks a lot to Dagg Nabbit
         * http://stackoverflow.com/questions/3885817/how-to-check-if-a-number-is-float-or-integer
         */
        return Infinity !== n && n === +n && n !== (n|0);
    };

    rivets.formatters.isNumber = function(target) {
        return rivets.formatters.isFloat(target) || rivets.formatters.isInteger(target);
    };

    rivets.formatters.isObject = function(target) {
        return rivets.formatters.toBoolean(target) && typeof target == "object" && !rivets.formatters.isArray(target);
    };

    rivets.formatters.isFunction = function(target) {
        return typeof target == "function";
    };

    rivets.formatters.isArray = function(target) {
        return rivets.formatters.isFunction(Array.isArray) ? Array.isArray(target) : target instanceof Array;
    };

    rivets.formatters.isString = function(target) {
        return typeof target == "string" || target instanceof String;
    };

    rivets.formatters.isInfinity = function(target) {
        return target === Infinity;
    };

    /* convert JS types */

    rivets.formatters.toBoolean = function(target) {
        return !!target;
    };

    rivets.formatters.toInteger = function(target) {
        var ret = parseInt(target * 1, 10);
        return isNaN(ret) ? 0 : ret;
    };

    rivets.formatters.toFloat = function(target) {
        var ret = parseFloat(target * 1.0);
        return isNaN(ret) ? 0.0 : ret;
    };

    rivets.formatters.toDecimal = function(target) {
        var retI = rivets.formatters.toInteger(target*1);
        var retF = rivets.formatters.toFloat(target);
        return retI == retF ? retI : retF;
    };

    rivets.formatters.toArray = function(target) {
        if(rivets.formatters.isArray(target)) {
            return target;
        }else if(rivets.formatters.isObject(target)) {
            return rivets.formatters.values(target);
        }

        return [target];
    };

    rivets.formatters.toString = function(target) {
        return target ? target.toString() : "";
    };

    rivets.formatters.integer = {
        read: function(target) {
            return rivets.formatters.toInteger(target);
        },

        publish: function(target) {
            return rivets.formatters.toInteger(target);
        }
    };

    /* Math functions */
    rivets.formatters.sum = function(target, val) {
        return (1 * target) + (1 * val);
    };

    rivets.formatters.substract = function(target, val) {
        return (1 * target) - (1 * val);
    };

    rivets.formatters.multiply = function(target, val) {
        return (1 * target) * (1 * val);
    };

    /*
    rivets.formaters.crossMultiplication = function(target, base, total) {
        return (target / base) * total
    }

    rivets.formaters.percents = function(target, base, total) {
        return rivets.formaters.crossMultiplication(target, base, total) + "%";
    }
    */

    rivets.formatters.divide = function(target, val) {
        return (1 * target) / (1 * val);
    };

    rivets.formatters.min = function() {
        return Math.min.apply(Math, arguments);
    };

    rivets.formatters.max = function() {
        return Math.max.apply(Math, arguments);
    };

    /* comparisons */

    rivets.formatters.isEqual = function(target, val) {
        return target === val;
    };

    rivets.formatters.isNotEqual = function(target, val) {
        return target !== val;
    };

    rivets.formatters.isLess = function(target, val) {
        return (target * 1) < (val * 1);
    };

    rivets.formatters.isGreater = function(target, val) {
        return (target * 1) > (val * 1);
    };

    rivets.formatters.isLessEqual = function(target, val) {
        return (target * 1) <= (val * 1);
    };

    rivets.formatters.isGreaterEqual = function(target, val) {
        return (target * 1) >= (val * 1);
    };

    /* logical functions */

    rivets.formatters.or = function() {
        for(var i = 0; i < arguments.length; i++) {
            if(rivets.formatters.toBoolean(arguments[i])) {
                return true;
            }
        }
        return false;
    };

    rivets.formatters.and = function() {
        for(var i = 0; i < arguments.length; i++) {
            if(!rivets.formatters.toBoolean(arguments[i])) {
                return false;
            }
        }

        return true;
    };

    rivets.formatters.negate = function(target) {
        return !rivets.formatters.toBoolean(target);
    };

    rivets.formatters.if = function(target, trueCase, falseCase) {
        return rivets.formatters.toBoolean(target) ? trueCase : falseCase;
    };

    /* number functions */
    rivets.formatters.numberFormat = function(target, precision, decimalSeparator, thousandSeparator) {
        target = rivets.formatters.isNumber(target) ? target : rivets.formatters.toDecimal(target);

        if(!rivets.formatters.isInteger(precision))
            precision = rivets.stdlib.defaultPrecision;
        if(!decimalSeparator)
            decimalSeparator = rivets.stdlib.defaultDecimalSeparator;
        if(!thousandSeparator)
            thousandSeparator = rivets.stdlib.defaultThousandSeparator;
        
        /*
         *thanks to user2823670
         * http://stackoverflow.com/questions/10015027/javascript-tofixed-not-rounding
         */
        var ret = (+(Math.round(+(Math.abs(target) + 'e' + precision)) + 'e' + -precision)).toFixed(precision)
        if(target < 0)
            ret = '-' + ret;

        /**
         * thanks to Elias Zamaria
         * http://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
         */
        ret = ret.split(".");
        if(ret.length==2) {
            return ret[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator) + decimalSeparator + ret[1];
        }

        return ret[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator);
    };

    /* date functions */

    rivets.formatters.date = function(target) {
        return moment(target).format(rivets.stdlib.defaultDateFormat);
    };

    rivets.formatters.time = function(target) {
        return moment(target).format(rivets.stdlib.defaultTimeFormat);
    };

    rivets.formatters.datetime = function(target) {
        return moment(target).format(rivets.stdlib.defaultDatetimeFormat);
    };

    rivets.formatters.toTimestamp = function(target) {
        return moment(target).format("X");
    };

    rivets.formatters.toDate = function(target) {
        return moment.unix(target).toDate();
    };

    rivets.formatters.toMoment = function(target) {
        return moment(target);
    };

    /**
     * The date formatter returns a formatted date string according to the moment.js
     * formatting syntax.
     *
     * ```html
     * <span rv-value="model:date | date 'dddd, MMMM Do'"></span>
     * ```
     *
     * @see {@link http://momentjs.com/docs/#/displaying} for format options.
     */
    rivets.formatters.dateFormat = function(target, val) {
        return moment(target).format(val);
    };

    /* object functions */

    rivets.formatters.pairs = function(target) {
        return Object.keys(target).map(function(key) {
            return {
                'object': target,
                'property': key,
                'value': target[key]
            };
        });
    };

    rivets.formatters.keys = function(target) {
        return Object.keys(target);
    };

    rivets.formatters.values = function(target) {
        return Object.keys(target).map(function(key) { return target[key]; });
    };

    /* string functions */

    rivets.formatters.stringFormat = function(target) {
        for(var i = 1; i < arguments.length; i++) {
            var offset = target.indexOf("%s");
            if(offset === -1){
                break;
            }

            target = target.slice(0, offset) + arguments[i] + target.slice(offset + 2);
        }

        return target;
    }


    rivets.formatters.split = function(target, val) {
        return target.split(val);
    };

    rivets.formatters.lower = function(target) {
        return target.toLowerCase();
    };

    rivets.formatters.upper = function(target) {
        return target.toUpperCase();
    };

    rivets.formatters.capitalize = function(target) {
        target = rivets.formatters.toString(target);
        return target.split(" ").map(function(seq) {
            return seq.split("-").map(function(word) {
                return word.charAt(0).toUpperCase() + word.slice(1);
            }).join("-");
        }).join(" ");
    };

    /* string&array functions */
    rivets.formatters.contains = function(target, val) {
        return target.indexOf(val) !== -1;
    };
    
    rivets.formatters.doesNotContain = function(target, val) {
        return rivets.formatters.negater(rivets.formatters.contains(target, val)) === -1;
    };

    rivets.formatters.prettyPrint = function(target) {
        return JSON.stringify(target, null, 2);
    };

    rivets.formatters.isEmpty = function(target) {
        if(!rivets.formatters.toBoolean(target))
            return true;
        return rivets.formatters.toArray(target).length === 0;
    };

    /* array formatters */

    rivets.formatters.length = function(target) {
        if(rivets.formatters.isString(target))
            return target.length
        return rivets.formatters.toArray(target).length;
    }

    rivets.formatters.join = function(target, val) {
        return rivets.formatters.toArray(target).join(val);
    };

    /* functions formatters */

    rivets.formatters.wrap = function(target) {
        var args = Array.prototype.slice.call(arguments);
        args.splice(0,1);

        return function(evt) {
            var cpy = args.slice();
            Array.prototype.push.apply(cpy, Array.prototype.slice.call(arguments));
            return target.apply(this, cpy);
        };
    };

    rivets.formatters.delay = function(target, ts) {
        var self = this;
        return function() {
            setTimeout(function() { target.apply(self, arguments); }, ts);
        };
    };

    rivets.formatters.preventDefault = function(target) {
        var self = this;
        return function(evt) {
            evt.preventDefault();
            target.call(self, evt);
            return false;
        };
    };

    /*
     * basic bindings for rivets
     *
     */
    
    rivets.binders.width = function(el, value) {
        el.style.width = value;
    };

    rivets.binders.height = function(el, value) {
        el.style.height = value;
    };

    /* extra bind-type for rivets - we may need a better solution than that one */
    rivets.binders.template = {
        block: true,
        
        bind: function() {
            
            this.subviews = []
        },
        
        unbind: function(el) {
            
            this.subviews.forEach(function(el) {
                el.unbind()
            })
        },
        
        routine: function(el, value) {
            
            var self = this
            
            //kill old data
            this.subviews.forEach(function(el) {
                el.unbind()
            })
            this.subviews = []
            
            //set new value
            $(el).html(value)
            
            //make subhtml binding capable
            var options = {
              binders: this.view.binders,
              formatters: this.view.formatters,
              adapters: this.view.adapters,
              config: this.view.config
            }
            
            var models = {}
            for(var k in self.view.models) {
                models[k] = self.view.models[k]
            }
            
            $(el).children().each(function() {
                var v = new rivets._.View(this, models)///rivets.bind(this, models)
                v.bind()
                self.subviews.push(v)
            })
        },
        
        update: function(models) {
            
            this.subviews.forEach(function(el) {
                el.update(models)
            })
        },
    }


    /* formatter shortcuts */
    rivets.formatters.eq = rivets.formatters.isEqual;
    rivets.formatters.ne = function(target, val) {
        return rivets.formatters.negate(rivets.formatters.isEqual(target, val));
    };

    rivets.formatters.lt = rivets.formatters.isLower;
    rivets.formatters.gt = rivets.formatters.isGreater;

    rivets.formatters.le = rivets.formatters.isLowerEqual;
    rivets.formatters.lte = rivets.formatters.isLowerEqual;
    
    rivets.formatters.ge = rivets.formatters.isGreaterEqual;
    rivets.formatters.gte = rivets.formatters.isGreaterEqual;

    rivets.formatters.prv = rivets.formatters.preventDefault;
    rivets.formatters.inject = rivets.formatters.stringFormat;
    rivets.formatters.format = rivets.formatters.dateFormat;
    rivets.formatters.len = rivets.formatters.length;
    rivets.formatters.def = rivets.formatters.default;
    rivets.formatters.neg = rivets.formatters.negate;

    rivets.formatters.date = rivets.formatters.dateFormat;

    rivets.formatters.stringify = rivets.formatters.prettyPrint;
    rivets.formatters.int = rivets.formatters.integer;
});
