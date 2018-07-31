var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var Animate = /** @class */ (function () {
    function Animate(config) {
        if (config === void 0) { config = {}; }
        var _this = this;
        this.version = 1.54;
        this._events = {};
        this.config = config;
        var gp = function (name) {
            var _a;
            return _a = {}, _a[name] = { set: function (cb) { _this._events[name] = cb; } }, _a;
        };
        Object.defineProperties(this, __assign({}, gp('onFrame'), gp('onClick'), gp('onMousemove'), gp('onMousedown'), gp('onMouseup'), gp('onKeydown'), gp('onKeyup')));
        var c = new Clip();
        var m = new Movieclip();
    }
    Animate.prototype.loop = function () { };
    Animate.prototype.draw = function () { };
    Animate.prototype.drawframe = function () { };
    Animate.Util = {};
    Animate.Extension = {};
    Animate.Modules = {};
    return Animate;
}());
(function (Animate) {
    Object.defineProperties(Animate, {
        LOOP_TIMER: { value: 'timer', writable: false },
        LOOP_ANIMATE: { value: 'animation', writable: false },
        DEGREE: { value: 0.017453292519943295, writable: false },
        DEGREE_360: { value: 6.283185307179586, writable: false },
    });
})(Animate);
var Clip = /** @class */ (function () {
    function Clip() {
        this.visibility = false;
        this.visibility = true;
    }
    Clip.prototype.create = function (options, callback, thisInstance) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return callback.bind(options).apply(thisInstance || {}, args);
        };
    };
    Clip.prototype.m = function () {
    };
    return Clip;
}());
var Movieclip = /** @class */ (function () {
    function Movieclip() {
        this.visibility = false;
        this.visibility = true;
    }
    Movieclip.prototype.create = function (options, callback, thisInstance) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return callback.bind(options).apply(thisInstance || {}, args);
        };
    };
    return Movieclip;
}());
Animate.Util.degreesToRadians = function (deg) {
    return (deg * Math.PI) / 180;
};
Animate.Util.radiansToDegrees = function (rad) {
    return (rad * 180) / Math.PI;
};
Animate.Util.distanceBetween = function (p1, p2) {
    var dx = p2.x - p1.x;
    var dy = p2.y - p1.y;
    return Math.sqrt(dx * dx + dy * dy);
};
Animate.Util.calculateAngle = function (p1, p2) {
    var dx = p2.x - p1.x;
    var dy = p2.y - p1.y;
    var angle = Math.atan2(dy, dx);
    return {
        angle: angle,
        x: Math.cos(angle),
        y: Math.sin(angle)
    };
};
Animate.Util.clone = function (srcBase, src) {
    if (Animate.Util.typeOf(srcBase, 'function')) {
        return srcBase.bind({}, src);
    }
    else if (Animate.Util.typeOf(src, 'object') || Animate.Util.typeOf(src, 'array')) {
        var coping = JSON.parse(JSON.stringify(srcBase));
        for (var i in src)
            coping[i] = src[i];
        return coping;
    }
};
Animate.Util.copy = function (srcBase, src) {
    if (Animate.Util.typeOf(srcBase, 'function')) {
        return srcBase.bind({}, src);
    }
    else if (Animate.Util.typeOf(src, 'object') || Animate.Util.typeOf(src, 'array')) {
        var coping = JSON.parse(JSON.stringify(srcBase));
        for (var i in src)
            coping[i] = src[i];
        return coping;
    }
};
/*
Animate.Util = {};

(function () {

  Animate.Util.clone = function () {

  };

})();*/
Animate.Util.isset = function () {
};
Animate.Util.random = function (min, max) {
    min = min || 0;
    max = max || 100;
    return Math.floor(Math.random() * (max - min + 1) + min);
};
Animate.Util.randomColor = function () {
    var letters = '0123456789ABCDEF'.split(''), color = '#';
    for (var i = 0; i < 6; i++)
        color += letters[Math.floor(Math.random() * 16)];
    return color;
};
Animate.Util.randomItem = function (list) {
    return list[Animate.Util.random(0, list.length - 1)];
};
Animate.Util.typeOf = function () {
};
Animate.Util.typeOfStrict = function () {
};
