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
        var _this = this;
        this.configuration = {
            selector: null,
            width: 800,
            height: 600,
            fps: 30,
            fullscreen: false,
        };
        this._frames = { default: [] };
        this._events = {};
        this._paused = false;
        this._iteration = 0;
        var eventSetter = function (name) {
            var _a;
            return _a = {}, _a[name] = { set: function (cb) { _this._events[name] = cb; } }, _a;
        };
        this.configuration = __assign({}, this.configuration, config);
        Object.defineProperties(this, __assign({}, eventSetter('onFrame'), eventSetter('onClick'), eventSetter('onMousemove'), eventSetter('onMousedown'), eventSetter('onMouseup'), eventSetter('onKeydown'), eventSetter('onKeyup'), { fps: { get: function () { return Math.ceil(_this._iteration / ((_this._fpsTimeThen - _this._fpsTimeFirst) / 1000)); } }, canvas: { get: function () { return _this._canvas; } }, context: { get: function () { return _this._context; } }, config: { writable: false, value: this.configuration }, width: { writable: false, value: this.configuration.width }, height: { writable: false, value: this.configuration.height } }));
        try {
            this._canvas = document.querySelector(this.configuration.selector);
            this._canvas.width = this.configuration.width;
            this._canvas.height = this.configuration.height;
            this._context = this._canvas.getContext('2d');
            this._fpsInterval = 1000 / this.configuration.fps;
        }
        catch (e) {
            throw new Error('Error of query canvas. Selector [' + this.configuration.selector + '] is not type of HTMLCanvasElement');
        }
        var c = new Clip();
        var m = new Movieclip();
    }
    Animate.prototype.getFPS = function () {
        return Math.ceil(this._iteration / ((this._fpsTimeThen - this._fpsTimeFirst) / 1000));
    };
    Animate.prototype.getCanvas = function () {
        return this._canvas;
    };
    Animate.prototype.getContext = function () {
        return this._context;
    };
    Animate.prototype.getConfig = function (param) {
        return param ? this.configuration[param] : this.configuration;
    };
    Animate.prototype.getSize = function (side) {
        switch (side) {
            case 'w':
            case 'width': return this.configuration.width;
            case 'h':
            case 'height': return this.configuration.height;
            default:
                return { width: this.configuration.width, height: this.configuration.height };
        }
    };
    Animate.prototype.loop = function () {
        var _this = this;
        if (!this._paused) {
            this._requestanimationframeid = requestAnimationFrame(function () { return _this.loop(); });
            this._fpsTimeNow = Date.now();
            this._fpsDelta = this._fpsTimeNow - this._fpsTimeThen;
            if (this._fpsDelta > this._fpsInterval) {
                this._fpsTimeThen = this._fpsTimeNow - (this._fpsDelta % this._fpsInterval);
                this._iteration++;
                this.clear();
                this.draw();
            }
        }
    };
    Animate.prototype.draw = function (frameName) {
        var _this = this;
        if (frameName === void 0) { frameName = 'default'; }
        this._frames[frameName].map(function (cb) {
            return cb.bind(_this)(_this._context, _this._iteration);
        });
    };
    Animate.prototype.stop = function () {
        this._paused = true;
        window.cancelAnimationFrame(this._requestanimationframeid);
    };
    Animate.prototype.pause = function () {
        this._paused = !this._paused;
    };
    Animate.prototype.start = function () {
        this._fpsTimeThen = Date.now();
        this._fpsTimeFirst = this._fpsTimeThen;
        this.loop();
    };
    Animate.prototype.clear = function () {
        this._context.clearRect(0, 0, this.configuration.width, this.configuration.height);
    };
    Animate.prototype.frame = function (params, cb) {
        this._frames.default.push(cb.bind(params));
    };
    Animate.Util = {};
    Animate.Extension = {};
    Animate.Modules = {};
    return Animate;
}());
(function (Animate) {
    Object.defineProperties(Animate, {
        version: { writable: false, value: '0.8.0' },
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
/////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", function (event) {
    var an = new Animate({
        selector: '#canvas',
        fps: 60,
    });
    var clip = function (cb) {
        var ctx = an.getContext();
        ctx.save();
        cb(ctx);
        ctx.restore();
    };
    an.frame({
        x: 100,
        y: 100,
        w: 200,
        h: 100,
        r: 45
    }, function (ctx, iter) {
        var _a = this, x = _a.x, y = _a.y, w = _a.w, h = _a.h, r = _a.r;
        var rad = Animate.Util.degreesToRadians(r);
        // work v2
        ctx.save();
        ctx.translate(x, y);
        clip(function (ctx) {
            ctx.translate(0, 0);
            ctx.strokeRect(0, 0, w, h);
        });
        clip(function (ctx) {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
            ctx.translate(w / 2, h / 2);
            ctx.rotate(rad);
            ctx.fillRect(-w / 2, -h / 2, w, h);
        });
        ctx.restore();
        this.r++;
        if (this.r > 360) {
            this.r = 0;
        }
        /* // work v1
        clip((ctx: CanvasRenderingContext2D) => {
          ctx.translate(x, y);
          ctx.strokeRect(0, 0, w, h);
        });
    
        clip((ctx: CanvasRenderingContext2D) => {
          ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
          ctx.translate(x + w/2, y + h/2);
          ctx.rotate(rad);
          ctx.fillRect(-w/2, -h/2, w, h);
        });*/
    });
    an.start();
});
