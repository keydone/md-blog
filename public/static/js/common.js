// 动画函数
(function(win) {
    // 匀速运动
    function linear(option) {
        var
            time = option.time,
            now = option.now,
            aims = option.aims,
            spendTime = option.spendTime;

        var next = now + (aims - now) * 60 / (time - spendTime);

        return aims - now > 0
            ? next >= aims ? aims : next
            : next <= aims ? aims : next;
    }

    function Amt() {
        this.record = [];
        this.timeoutMap = {};
        this.listeners = {
            start: [],
            frame: [],
            end: []
        };
        this.frames = 0;

        this._init();
    }

    Amt.prototype = {
        _init: function() {
            this.index = 0;
            this.nowIndex = 0;
            this.timer = null;
            this.time = 0;
            this.startTime = null;
            this.record.forEach(function(point) {
                eachObj(point, function(value, key) {
                    if (~key.indexOf('_')) return;

                    point[key].now = point[key].from;
                });
            });

            return this;
        },
        // 获取当前周期已消耗的时间
        _getSpendTime: function() {
            var
                otherPointSpendTime,
                time = this.time,
                nowIndex = this.nowIndex;

            otherPointSpendTime = this.record.reduce(function(p, n, idx) {
                if (idx < nowIndex) {
                    p += n['_time'];
                }

                return p;
            }, 0);

            return time - otherPointSpendTime;
        },
        // 启动逐帧渲染器
        _request: function(fun) {
            var requestAnimationFrame = window.requestAnimationFrame
                || window.mozRequestAnimationFrame
                || window.webkitRequestAnimationFrame
                || window.msRequestAnimationFrame;

            this.timer = requestAnimationFrame(fun);
            return this;
        },
        // 关闭逐帧渲染器
        _cancel: function() {
            var cancelAnimationFrame = window.cancelAnimationFrame
                || window.mozCancelAnimationFrame
                || window.webkitCancelAnimationFrame
                || window.msCancelAnimationFrame;

            cancelAnimationFrame(this.timer);
            return this;
        },
        // 缓动算法
        _algorithm: function(option) {
            var
                type = option.type || 'linear',
                time = option.time || 1000,
                now = option.now,
                aims = option.aims || 0,
                spendTime = option.spendTime || 0;

            switch(type) {
                case 'linear':
                    return linear({
                        time: time,
                        now: now,
                        aims: aims,
                        spendTime: spendTime
                    });
            }
        },
        // 触发事件
        _emit: function(event, option) {
            this.listeners[event] && this.listeners[event].forEach(function(handler) {
                handler(option);
            });

            return this;
        },
        // 事件
        on: function(event, handler) {
            if (~getKeys(this.listeners).indexOf(event) && handler) {
                this.listeners[event].push(handler);
            }

            return this;
        },
        // 起始点
        from: function(option) {
            option = option || {};
            var point = this.record[this.index] || {};

            eachObj(option, function(value, key) {
                point[key] = {
                    from: value,
                    now: value,
                    to: 0
                };
            });

            this.record[this.index] = point;

            return this;
        },
        // 目标点
        to: function(option) {
            option = option || {};
            var point = this.record[this.index] || {};

            eachObj(option, function(value, key) {
                point[key] = extend(point[key] || {
                    from: 0,
                    now: 0
                }, {
                    to: value
                });
            });

            this.record[this.index] = point;

            return this;
        },
        // 变换规律
        transition: function(option) {
            var
                type,
                time;

            if (typeof option === 'string') {
                time = option;
            } else {
                type = option.type || 'linear';
                time = option.time || 200;
            }

            var point = this.record[this.index] || {};

            extend(point, {
                '_time': time,
                '_type': type
            });

            this.record[this.index] = point;

            return this;
        },
        // 进入下一个变换周期
        next: function() {
            this.index = this.record.length;
            return this;
        },
        // 等待
        timeout: function(time) {
            if (time && typeof time === 'number') {
                var index = this.record.length === 0 ? -1 : this.index;
                this.timeoutMap[index] = this.timeoutMap[index] != null
                    ? this.timeoutMap[index] + time
                    : time;
            }

            return this;
        },
        // 启动动画
        start: function() {
            var
                record = this.record,
                self = this;

            return this
                .next()
                ._emit('start')
                ._request(function render() {
                    var
                        point = record[self.nowIndex],
                        result = {};

                    if (!self.startTime && self.timeoutMap['-1']) {
                        self.startTime = (new Date()).getTime();
                        self.pause();
                        setTimeout(function() {
                            self._request(render);
                        }, self.timeoutMap['-1']);

                        return;
                    }

                    if (self.time === point['_time']) {
                        var timeout = self.timeoutMap[self.nowIndex];

                        self.time = 0;
                        self.nowIndex++;
                        if (timeout) {
                            self.pause();
                            setTimeout(function() {
                                self._request(render)
                            }, timeout);
                            return;
                        }

                        point = record[self.nowIndex];
                    }

                    if (self.nowIndex === record.length) {
                        self._emit('end').close();
                        return;
                    }

                    eachObj(point, function(item, key) {
                        if (~key.indexOf('_')) return;

                        var nextValue = self._algorithm({
                            type: point['_type'],
                            time: point['_time'],
                            now: item['now'],
                            aims: item['to'],
                            spendTime: self.time
                        });

                        result[key] = nextValue;
                        point[key].now = nextValue;

                        if (nextValue === item['to']) {
                            self.time = point['_time'];
                        }
                    });

                    if (self.time != point['_time']) {
                        self.time += 60;
                    }

                    self._emit('frame', result);
                    self.frames++;
                    self._request(render);
                });
        },
        // 暂停
        pause: function() {
            return this._cancel();
        },
        // 关闭动画
        close: function() {
            return this._cancel()._init();
        }
    }

    win.Amt = Amt;
})(window);

window.addEventListener('DOMContentLoaded', function() {
    // 回到顶部
    (function() {
        var backTopEle = document.getElementById('back-top'),
            packBackTop = new Pack(backTopEle);

        if (backTopEle) {
            packBackTop.transfrom('back-top--hidden').base('js-hidden').lastStart();

            function toggleBackTop() {
                var scrollTop = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop,
                    isHidden = backTopEle.classList.contains('back-top--hidden') && backTopEle.classList.contains('js-hidden');

                if ((scrollTop > 350 && isHidden) || (scrollTop < 350 && !isHidden)) {
                    packBackTop.toggle();
                }
            }

            toggleBackTop();
            document.addEventListener('scroll', toggleBackTop);

            backTopEle.addEventListener('click', function() {
                var backTopAmt = new Amt();

                backTopAmt
                    .from({
                        top: window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop
                    })
                    .to({
                        top: 0
                    })
                    .transition(1000)
                    .on('frame', function(data) {
                        window.scrollTo(0, data.top);
                    })
                    .start();
            });
        }
    })();
});

window.addEventListener('DOMContentLoaded', function() {
    (function() {
        var headerEle = document.getElementById('page-header');

        function toggleNavStyle() {
            var scrollTop = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;

            headerEle.classList[ scrollTop > 30 ? 'add' : 'remove' ]('page__header--small');
        }

        headerEle && document.addEventListener('scroll', toggleNavStyle);
    })();

    (function() {
        var
            btn = document.querySelector('button.page__menu-btn'),
            menu = document.querySelector('nav.page__nav');

        if (btn && menu) {
            var packMenu = new Pack(menu);

            packMenu.base('js-open').transfrom('page__nav--open');

            btn.addEventListener('click', function() {
                packMenu.toggle();
            });
        }
    })();
});

// loading
$(function(){
    var page = document.getElementById('page'),
        loading = $('#page-loading');
    if (page.classList.contains('js-hidden')) {
        setTimeout(function() {
            loading[0].classList.add('hidden');
            setTimeout(function() {
                page.classList.add('showPage');
                page.classList.remove('js-hidden');
                window._skappPostAnimation();
                loading.hide();
            });
        });
    }
});

/* messenger 1.5.0 */

(function(){
  var _prevMessenger = window.Messenger;
  var localMessenger;

  localMessenger = window.Messenger = function(){
      return localMessenger._call.apply(this, arguments);
  }

  window.Messenger.noConflict = function(){
      window.Messenger = _prevMessenger;

      return localMessenger;
  }
})();

/*
* This file contains shims for when Underscore and Backbone
* are not included.
*
* Portions taken from Underscore.js and Backbone.js
* Both of which are Copyright (c) 2009-2013 Jeremy Ashkenas, DocumentCloud
*/
window.Messenger._ = (function() {
  if (window._)
      return window._

  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var push             = ArrayProto.push,
          slice            = ArrayProto.slice,
          concat           = ArrayProto.concat,
          toString         = ObjProto.toString,
          hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
      nativeForEach      = ArrayProto.forEach,
      nativeMap          = ArrayProto.map,
      nativeReduce       = ArrayProto.reduce,
      nativeReduceRight  = ArrayProto.reduceRight,
      nativeFilter       = ArrayProto.filter,
      nativeEvery        = ArrayProto.every,
      nativeSome         = ArrayProto.some,
      nativeIndexOf      = ArrayProto.indexOf,
      nativeLastIndexOf  = ArrayProto.lastIndexOf,
      nativeIsArray      = Array.isArray,
      nativeKeys         = Object.keys,
      nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = {};

  // Establish the object that gets returned to break out of a loop iteration.
  var breaker = {};

  var each = _.each = _.forEach = function(obj, iterator, context) {
      if (obj == null) return;
      if (nativeForEach && obj.forEach === nativeForEach) {
          obj.forEach(iterator, context);
      } else if (obj.length === +obj.length) {
          for (var i = 0, l = obj.length; i < l; i++) {
              if (iterator.call(context, obj[i], i, obj) === breaker) return;
          }
      } else {
          for (var key in obj) {
              if (_.has(obj, key)) {
                  if (iterator.call(context, obj[key], key, obj) === breaker) return;
              }
          }
      }
  };

  _.result = function(object, property) {
      if (object == null) return null;
      var value = object[property];
      return _.isFunction(value) ? value.call(object) : value;
  };

  _.once = function(func) {
      var ran = false, memo;
      return function() {
          if (ran) return memo;
          ran = true;
          memo = func.apply(this, arguments);
          func = null;
          return memo;
      };
  };

  var idCounter = 0;
  _.uniqueId = function(prefix) {
      var id = ++idCounter + '';
      return prefix ? prefix + id : id;
  };

  _.filter = _.select = function(obj, iterator, context) {
      var results = [];
      if (obj == null) return results;
      if (nativeFilter && obj.filter === nativeFilter) return obj.filter(iterator, context);
      each(obj, function(value, index, list) {
          if (iterator.call(context, value, index, list)) results[results.length] = value;
      });
      return results;
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
  each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
      _['is' + name] = function(obj) {
          return toString.call(obj) == '[object ' + name + ']';
      };
  });

  _.defaults = function(obj) {
      each(slice.call(arguments, 1), function(source) {
          if (source) {
              for (var prop in source) {
                  if (obj[prop] == null) obj[prop] = source[prop];
              }
          }
      });
      return obj;
  };

  _.extend = function(obj) {
      each(slice.call(arguments, 1), function(source) {
          if (source) {
              for (var prop in source) {
                  obj[prop] = source[prop];
              }
          }
      });
      return obj;
  };

  _.keys = nativeKeys || function(obj) {
      if (obj !== Object(obj)) throw new TypeError('Invalid object');
      var keys = [];
      for (var key in obj) if (_.has(obj, key)) keys[keys.length] = key;
      return keys;
  };

  _.bind = function(func, context) {
      if (func.bind === nativeBind && nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
      var args = slice.call(arguments, 2);
      return function() {
          return func.apply(context, args.concat(slice.call(arguments)));
      };
  };

  _.isObject = function(obj) {
      return obj === Object(obj);
  };

  return _;
})();

window.Messenger.Events = (function() {
  if (window.Backbone && Backbone.Events) {
      return Backbone.Events;
  }

  var eventsShim = function() {
      var eventSplitter = /\s+/;

      var eventsApi = function(obj, action, name, rest) {
          if (!name) return true;
          if (typeof name === 'object') {
              for (var key in name) {
                  obj[action].apply(obj, [key, name[key]].concat(rest));
              }
          } else if (eventSplitter.test(name)) {
              var names = name.split(eventSplitter);
              for (var i = 0, l = names.length; i < l; i++) {
                  obj[action].apply(obj, [names[i]].concat(rest));
              }
          } else {
              return true;
          }
      };

      var triggerEvents = function(events, args) {
          var ev, i = -1, l = events.length;
          switch (args.length) {
          case 0: while (++i < l) (ev = events[i]).callback.call(ev.ctx);
          return;
          case 1: while (++i < l) (ev = events[i]).callback.call(ev.ctx, args[0]);
          return;
          case 2: while (++i < l) (ev = events[i]).callback.call(ev.ctx, args[0], args[1]);
          return;
          case 3: while (++i < l) (ev = events[i]).callback.call(ev.ctx, args[0], args[1], args[2]);
          return;
          default: while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args);
          }
      };

      var Events = {

          on: function(name, callback, context) {
              if (!(eventsApi(this, 'on', name, [callback, context]) && callback)) return this;
              this._events || (this._events = {});
              var list = this._events[name] || (this._events[name] = []);
              list.push({callback: callback, context: context, ctx: context || this});
              return this;
          },

          once: function(name, callback, context) {
              if (!(eventsApi(this, 'once', name, [callback, context]) && callback)) return this;
              var self = this;
              var once = _.once(function() {
                  self.off(name, once);
                  callback.apply(this, arguments);
              });
              once._callback = callback;
              this.on(name, once, context);
              return this;
          },

          off: function(name, callback, context) {
              var list, ev, events, names, i, l, j, k;
              if (!this._events || !eventsApi(this, 'off', name, [callback, context])) return this;
              if (!name && !callback && !context) {
                  this._events = {};
                  return this;
              }

              names = name ? [name] : _.keys(this._events);
              for (i = 0, l = names.length; i < l; i++) {
                  name = names[i];
                  if (list = this._events[name]) {
                      events = [];
                      if (callback || context) {
                          for (j = 0, k = list.length; j < k; j++) {
                              ev = list[j];
                              if ((callback && callback !== ev.callback &&
                                                               callback !== ev.callback._callback) ||
                                      (context && context !== ev.context)) {
                                  events.push(ev);
                              }
                          }
                      }
                      this._events[name] = events;
                  }
              }

              return this;
          },

          trigger: function(name) {
              if (!this._events) return this;
              var args = Array.prototype.slice.call(arguments, 1);
              if (!eventsApi(this, 'trigger', name, args)) return this;
              var events = this._events[name];
              var allEvents = this._events.all;
              if (events) triggerEvents(events, args);
              if (allEvents) triggerEvents(allEvents, arguments);
              return this;
          },

          listenTo: function(obj, name, callback) {
              var listeners = this._listeners || (this._listeners = {});
              var id = obj._listenerId || (obj._listenerId = _.uniqueId('l'));
              listeners[id] = obj;
              obj.on(name, typeof name === 'object' ? this : callback, this);
              return this;
          },

          stopListening: function(obj, name, callback) {
              var listeners = this._listeners;
              if (!listeners) return;
              if (obj) {
                  obj.off(name, typeof name === 'object' ? this : callback, this);
                  if (!name && !callback) delete listeners[obj._listenerId];
              } else {
                  if (typeof name === 'object') callback = this;
                  for (var id in listeners) {
                      listeners[id].off(name, callback, this);
                  }
                  this._listeners = {};
              }
              return this;
          }
      };

      Events.bind   = Events.on;
      Events.unbind = Events.off;
      return Events;
  };
  return eventsShim();
})();

(function() {
var $, ActionMessenger, BaseView, Events, RetryingMessage, _, _Message, _Messenger, _ref, _ref1, _ref2,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __slice = [].slice,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

$ = window.$;

_ = (_ref = window._) != null ? _ref : window.Messenger._;

Events = (_ref1 = typeof Backbone !== "undefined" && Backbone !== null ? Backbone.Events : void 0) != null ? _ref1 : window.Messenger.Events;

BaseView = (function() {

  function BaseView(options) {
    $.extend(this, Events);
    if (_.isObject(options)) {
      if (options.el) {
        this.setElement(options.el);
      }
      this.model = options.model;
    }
    this.initialize.apply(this, arguments);
  }

  BaseView.prototype.setElement = function(el) {
    this.$el = $(el);
    return this.el = this.$el[0];
  };

  BaseView.prototype.delegateEvents = function(events) {
    var delegateEventSplitter, eventName, key, match, method, selector, _results;
    if (!(events || (events = _.result(this, "events")))) {
      return;
    }
    this.undelegateEvents();
    delegateEventSplitter = /^(\S+)\s*(.*)$/;
    _results = [];
    for (key in events) {
      method = events[key];
      if (!_.isFunction(method)) {
        method = this[events[key]];
      }
      if (!method) {
        throw new Error("Method \"" + events[key] + "\" does not exist");
      }
      match = key.match(delegateEventSplitter);
      eventName = match[1];
      selector = match[2];
      method = _.bind(method, this);
      eventName += ".delegateEvents" + this.cid;
      if (selector === '') {
        _results.push(this.jqon(eventName, method));
      } else {
        _results.push(this.jqon(eventName, selector, method));
      }
    }
    return _results;
  };

  BaseView.prototype.jqon = function(eventName, selector, method) {
    var _ref2;
    if (this.$el.on != null) {
      return (_ref2 = this.$el).on.apply(_ref2, arguments);
    } else {
      if (!(method != null)) {
        method = selector;
        selector = void 0;
      }
      if (selector != null) {
        return this.$el.delegate(selector, eventName, method);
      } else {
        return this.$el.bind(eventName, method);
      }
    }
  };

  BaseView.prototype.jqoff = function(eventName) {
    var _ref2;
    if (this.$el.off != null) {
      return (_ref2 = this.$el).off.apply(_ref2, arguments);
    } else {
      this.$el.undelegate();
      return this.$el.unbind(eventName);
    }
  };

  BaseView.prototype.undelegateEvents = function() {
    return this.jqoff(".delegateEvents" + this.cid);
  };

  BaseView.prototype.remove = function() {
    this.undelegateEvents();
    return this.$el.remove();
  };

  return BaseView;

})();

_Message = (function(_super) {

  __extends(_Message, _super);

  function _Message() {
    return _Message.__super__.constructor.apply(this, arguments);
  }

  _Message.prototype.defaults = {
    hideAfter: 10,
    scroll: true,
    closeButtonText: "&times;",
    escapeText: false
  };

  _Message.prototype.initialize = function(opts) {
    if (opts == null) {
      opts = {};
    }
    this.shown = false;
    this.rendered = false;
    this.messenger = opts.messenger;
    return this.options = $.extend({}, this.options, opts, this.defaults);
  };

  _Message.prototype.show = function() {
    var wasShown;
    if (!this.rendered) {
      this.render();
    }
    this.$message.removeClass('messenger-hidden');
    wasShown = this.shown;
    this.shown = true;
    if (!wasShown) {
      return this.trigger('show');
    }
  };

  _Message.prototype.hide = function() {
    var wasShown;
    if (!this.rendered) {
      return;
    }
    this.$message.addClass('messenger-hidden');
    wasShown = this.shown;
    this.shown = false;
    if (wasShown) {
      return this.trigger('hide');
    }
  };

  _Message.prototype.cancel = function() {
    return this.hide();
  };

  _Message.prototype.update = function(opts) {
    var _ref2,
      _this = this;
    console.log(_);
    if (_.isString(opts)) {
      opts = {
        message: opts
      };
    }
    $.extend(this.options, opts);
    this.lastUpdate = new Date();
    this.rendered = false;
    this.events = (_ref2 = this.options.events) != null ? _ref2 : {};
    this.render();
    this.actionsToEvents();
    this.delegateEvents();
    this.checkClickable();
    if (this.options.hideAfter) {
      this.$message.addClass('messenger-will-hide-after');
      if (this._hideTimeout != null) {
        clearTimeout(this._hideTimeout);
      }
      this._hideTimeout = setTimeout(function() {
        return _this.hide();
      }, this.options.hideAfter * 1000);
    } else {
      this.$message.removeClass('messenger-will-hide-after');
    }
    if (this.options.hideOnNavigate) {
      this.$message.addClass('messenger-will-hide-on-navigate');
      if ((typeof Backbone !== "undefined" && Backbone !== null ? Backbone.history : void 0) != null) {
        Backbone.history.on('route', function() {
          return _this.hide();
        });
      }
    } else {
      this.$message.removeClass('messenger-will-hide-on-navigate');
    }
    return this.trigger('update', this);
  };

  _Message.prototype.scrollTo = function() {
    if (!this.options.scroll) {
      return;
    }
    return $.scrollTo(this.$el, {
      duration: 400,
      offset: {
        left: 0,
        top: -20
      }
    });
  };

  _Message.prototype.timeSinceUpdate = function() {
    if (this.lastUpdate) {
      return (new Date) - this.lastUpdate;
    } else {
      return null;
    }
  };

  _Message.prototype.actionsToEvents = function() {
    var act, name, _ref2, _results,
      _this = this;
    _ref2 = this.options.actions;
    _results = [];
    for (name in _ref2) {
      act = _ref2[name];
      _results.push(this.events["click [data-action=\"" + name + "\"] a"] = (function(act) {
        return function(e) {
          e.preventDefault();
          e.stopPropagation();
          _this.trigger("action:" + name, act, e);
          return act.action.call(_this, e, _this);
        };
      })(act));
    }
    return _results;
  };

  _Message.prototype.checkClickable = function() {
    var evt, name, _ref2, _results;
    _ref2 = this.events;
    _results = [];
    for (name in _ref2) {
      evt = _ref2[name];
      if (name === 'click') {
        _results.push(this.$message.addClass('messenger-clickable'));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  _Message.prototype.undelegateEvents = function() {
    var _ref2;
    _Message.__super__.undelegateEvents.apply(this, arguments);
    return (_ref2 = this.$message) != null ? _ref2.removeClass('messenger-clickable') : void 0;
  };

  _Message.prototype.parseActions = function() {
    var act, actions, n_act, name, _ref2, _ref3;
    actions = [];
    _ref2 = this.options.actions;
    for (name in _ref2) {
      act = _ref2[name];
      n_act = $.extend({}, act);
      n_act.name = name;
      if ((_ref3 = n_act.label) == null) {
        n_act.label = name;
      }
      actions.push(n_act);
    }
    return actions;
  };

  _Message.prototype.template = function(opts) {
    var $action, $actions, $cancel, $link, $message, $text, action, _i, _len, _ref2,
      _this = this;
    $message = $("<div class='messenger-message message alert " + opts.type + " message-" + opts.type + " alert-" + opts.type + "'>");
    if (opts.showCloseButton) {
      $cancel = $('<button type="button" class="messenger-close" data-dismiss="alert">');
      $cancel.html(opts.closeButtonText);
      $cancel.click(function() {
        var _base;
        _this.cancel();
        if (typeof (_base = _this.options).onClickClose === "function") {
          _base.onClickClose();
        }
        return true;
      });
      $message.append($cancel);
    }
    if (opts.escapeText) {
      $text = $('<div class="messenger-message-inner"></div>').text(opts.message);
    } else {
      $text = $("<div class=\"messenger-message-inner\">" + opts.message + "</div>");
    }
    $message.append($text);
    if (opts.actions.length) {
      $actions = $('<div class="messenger-actions">');
    }
    _ref2 = opts.actions;
    for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
      action = _ref2[_i];
      $action = $('<span>');
      $action.attr('data-action', "" + action.name);
      $link = $('<a>');
      $link.html(action.label);
      $action.append($('<span class="messenger-phrase">'));
      $action.append($link);
      $actions.append($action);
    }
    $message.append($actions);
    return $message;
  };

  _Message.prototype.render = function() {
    var opts;
    if (this.rendered) {
      return;
    }
    if (!this._hasSlot) {
      this.setElement(this.messenger._reserveMessageSlot(this));
      this._hasSlot = true;
    }
    opts = $.extend({}, this.options, {
      actions: this.parseActions()
    });
    this.$message = $(this.template(opts));
    this.$el.html(this.$message);
    this.shown = true;
    this.rendered = true;
    return this.trigger('render');
  };

  return _Message;

})(BaseView);

RetryingMessage = (function(_super) {

  __extends(RetryingMessage, _super);

  function RetryingMessage() {
    return RetryingMessage.__super__.constructor.apply(this, arguments);
  }

  RetryingMessage.prototype.initialize = function() {
    RetryingMessage.__super__.initialize.apply(this, arguments);
    return this._timers = {};
  };

  RetryingMessage.prototype.cancel = function() {
    this.clearTimers();
    this.hide();
    if ((this._actionInstance != null) && (this._actionInstance.abort != null)) {
      return this._actionInstance.abort();
    }
  };

  RetryingMessage.prototype.clearTimers = function() {
    var name, timer, _ref2, _ref3;
    _ref2 = this._timers;
    for (name in _ref2) {
      timer = _ref2[name];
      clearTimeout(timer);
    }
    this._timers = {};
    return (_ref3 = this.$message) != null ? _ref3.removeClass('messenger-retry-soon messenger-retry-later') : void 0;
  };

  RetryingMessage.prototype.render = function() {
    var action, name, _ref2, _results;
    RetryingMessage.__super__.render.apply(this, arguments);
    this.clearTimers();
    _ref2 = this.options.actions;
    _results = [];
    for (name in _ref2) {
      action = _ref2[name];
      if (action.auto) {
        _results.push(this.startCountdown(name, action));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  RetryingMessage.prototype.renderPhrase = function(action, time) {
    var phrase;
    phrase = action.phrase.replace('TIME', this.formatTime(time));
    return phrase;
  };

  RetryingMessage.prototype.formatTime = function(time) {
    var pluralize;
    pluralize = function(num, str) {
      num = Math.floor(num);
      if (num !== 1) {
        str = str + 's';
      }
      return 'in ' + num + ' ' + str;
    };
    if (Math.floor(time) === 0) {
      return 'now...';
    }
    if (time < 60) {
      return pluralize(time, 'second');
    }
    time /= 60;
    if (time < 60) {
      return pluralize(time, 'minute');
    }
    time /= 60;
    return pluralize(time, 'hour');
  };

  RetryingMessage.prototype.startCountdown = function(name, action) {
    var $phrase, remaining, tick, _ref2,
      _this = this;
    if (this._timers[name] != null) {
      return;
    }
    $phrase = this.$message.find("[data-action='" + name + "'] .messenger-phrase");
    remaining = (_ref2 = action.delay) != null ? _ref2 : 3;
    if (remaining <= 10) {
      this.$message.removeClass('messenger-retry-later');
      this.$message.addClass('messenger-retry-soon');
    } else {
      this.$message.removeClass('messenger-retry-soon');
      this.$message.addClass('messenger-retry-later');
    }
    tick = function() {
      var delta;
      $phrase.text(_this.renderPhrase(action, remaining));
      if (remaining > 0) {
        delta = Math.min(remaining, 1);
        remaining -= delta;
        return _this._timers[name] = setTimeout(tick, delta * 1000);
      } else {
        _this.$message.removeClass('messenger-retry-soon messenger-retry-later');
        delete _this._timers[name];
        return action.action();
      }
    };
    return tick();
  };

  return RetryingMessage;

})(_Message);

_Messenger = (function(_super) {

  __extends(_Messenger, _super);

  function _Messenger() {
    return _Messenger.__super__.constructor.apply(this, arguments);
  }

  _Messenger.prototype.tagName = 'ul';

  _Messenger.prototype.className = 'messenger';

  _Messenger.prototype.messageDefaults = {
    type: 'info'
  };

  _Messenger.prototype.initialize = function(options) {
    this.options = options != null ? options : {};
    this.history = [];
    return this.messageDefaults = $.extend({}, this.messageDefaults, this.options.messageDefaults);
  };

  _Messenger.prototype.render = function() {
    return this.updateMessageSlotClasses();
  };

  _Messenger.prototype.findById = function(id) {
    return _.filter(this.history, function(rec) {
      return rec.msg.options.id === id;
    });
  };

  _Messenger.prototype._reserveMessageSlot = function(msg) {
    var $slot, dmsg,
      _this = this;
    $slot = $('<li>');
    $slot.addClass('messenger-message-slot');
    this.$el.prepend($slot);
    this.history.push({
      msg: msg,
      $slot: $slot
    });
    this._enforceIdConstraint(msg);
    msg.on('update', function() {
      return _this._enforceIdConstraint(msg);
    });
    while (this.options.maxMessages && this.history.length > this.options.maxMessages) {
      dmsg = this.history.shift();
      dmsg.msg.remove();
      dmsg.$slot.remove();
    }
    return $slot;
  };

  _Messenger.prototype._enforceIdConstraint = function(msg) {
    var entry, _i, _len, _msg, _ref2;
    if (msg.options.id == null) {
      return;
    }
    _ref2 = this.history;
    for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
      entry = _ref2[_i];
      _msg = entry.msg;
      if ((_msg.options.id != null) && _msg.options.id === msg.options.id && msg !== _msg) {
        if (msg.options.singleton) {
          msg.hide();
          return;
        } else {
          _msg.hide();
        }
      }
    }
  };

  _Messenger.prototype.newMessage = function(opts) {
    var msg, _ref2, _ref3, _ref4,
      _this = this;
    if (opts == null) {
      opts = {};
    }
    opts.messenger = this;
    _Message = (_ref2 = (_ref3 = Messenger.themes[(_ref4 = opts.theme) != null ? _ref4 : this.options.theme]) != null ? _ref3.Message : void 0) != null ? _ref2 : RetryingMessage;
    msg = new _Message(opts);
    msg.on('show', function() {
      if (opts.scrollTo && _this.$el.css('position') !== 'fixed') {
        return msg.scrollTo();
      }
    });
    msg.on('hide show render', this.updateMessageSlotClasses, this);
    return msg;
  };

  _Messenger.prototype.updateMessageSlotClasses = function() {
    var anyShown, last, rec, willBeFirst, _i, _len, _ref2;
    willBeFirst = true;
    last = null;
    anyShown = false;
    _ref2 = this.history;
    for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
      rec = _ref2[_i];
      rec.$slot.removeClass('messenger-first messenger-last messenger-shown');
      if (rec.msg.shown && rec.msg.rendered) {
        rec.$slot.addClass('messenger-shown');
        anyShown = true;
        last = rec;
        if (willBeFirst) {
          willBeFirst = false;
          rec.$slot.addClass('messenger-first');
        }
      }
    }
    if (last != null) {
      last.$slot.addClass('messenger-last');
    }
    return this.$el["" + (anyShown ? 'remove' : 'add') + "Class"]('messenger-empty');
  };

  _Messenger.prototype.hideAll = function() {
    var rec, _i, _len, _ref2, _results;
    _ref2 = this.history;
    _results = [];
    for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
      rec = _ref2[_i];
      _results.push(rec.msg.hide());
    }
    return _results;
  };

  _Messenger.prototype.post = function(opts) {
    var msg;
    if (_.isString(opts)) {
      opts = {
        message: opts
      };
    }
    opts = $.extend(true, {}, this.messageDefaults, opts);
    msg = this.newMessage(opts);
    msg.update(opts);
    return msg;
  };

  return _Messenger;

})(BaseView);

ActionMessenger = (function(_super) {

  __extends(ActionMessenger, _super);

  function ActionMessenger() {
    return ActionMessenger.__super__.constructor.apply(this, arguments);
  }

  ActionMessenger.prototype.doDefaults = {
    progressMessage: null,
    successMessage: null,
    errorMessage: "Error connecting to the server.",
    showSuccessWithoutError: true,
    retry: {
      auto: true,
      allow: true
    },
    action: $.ajax
  };

  ActionMessenger.prototype.hookBackboneAjax = function(msgr_opts) {
    var _ajax,
      _this = this;
    if (msgr_opts == null) {
      msgr_opts = {};
    }
    if (!(window.Backbone != null)) {
      throw 'Expected Backbone to be defined';
    }
    msgr_opts = _.defaults(msgr_opts, {
      id: 'BACKBONE_ACTION',
      errorMessage: false,
      successMessage: "Request completed successfully.",
      showSuccessWithoutError: false
    });
    _ajax = function(options) {
      var sync_msgr_opts;
      sync_msgr_opts = _.extend({}, msgr_opts, options.messenger);
      return _this["do"](sync_msgr_opts, options);
    };
    if (Backbone.ajax != null) {
      if (Backbone.ajax._withoutMessenger) {
        Backbone.ajax = Backbone.ajax._withoutMessenger;
      }
      if (!(msgr_opts.action != null) || msgr_opts.action === this.doDefaults.action) {
        msgr_opts.action = Backbone.ajax;
      }
      _ajax._withoutMessenger = Backbone.ajax;
      return Backbone.ajax = _ajax;
    } else {
      return Backbone.sync = _.wrap(Backbone.sync, function() {
        var args, _old_ajax, _old_sync;
        _old_sync = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        _old_ajax = $.ajax;
        $.ajax = _ajax;
        _old_sync.call.apply(_old_sync, [this].concat(__slice.call(args)));
        return $.ajax = _old_ajax;
      });
    }
  };

  ActionMessenger.prototype._getHandlerResponse = function(returnVal) {
    if (returnVal === false) {
      return false;
    }
    if (returnVal === true || !(returnVal != null)) {
      return true;
    }
    return returnVal;
  };

  ActionMessenger.prototype._parseEvents = function(events) {
    var desc, firstSpace, func, label, out, type, _ref2;
    if (events == null) {
      events = {};
    }
    out = {};
    for (label in events) {
      func = events[label];
      firstSpace = label.indexOf(' ');
      type = label.substring(0, firstSpace);
      desc = label.substring(firstSpace + 1);
      if ((_ref2 = out[type]) == null) {
        out[type] = {};
      }
      out[type][desc] = func;
    }
    return out;
  };

  ActionMessenger.prototype._normalizeResponse = function() {
    var data, elem, resp, type, xhr, _i, _len;
    resp = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    type = null;
    xhr = null;
    data = null;
    for (_i = 0, _len = resp.length; _i < _len; _i++) {
      elem = resp[_i];
      if (elem === 'success' || elem === 'timeout' || elem === 'abort') {
        type = elem;
      } else if (((elem != null ? elem.readyState : void 0) != null) && ((elem != null ? elem.responseText : void 0) != null)) {
        xhr = elem;
      } else if (_.isObject(elem)) {
        data = elem;
      }
    }
    return [type, data, xhr];
  };

  ActionMessenger.prototype.run = function() {
    var args, events, getMessageText, handler, handlers, m_opts, msg, old, opts, type, _ref2,
      _this = this;
    m_opts = arguments[0], opts = arguments[1], args = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
    if (opts == null) {
      opts = {};
    }
    m_opts = $.extend(true, {}, this.messageDefaults, this.doDefaults, m_opts != null ? m_opts : {});
    events = this._parseEvents(m_opts.events);
    getMessageText = function(type, xhr) {
      var message;
      message = m_opts[type + 'Message'];
      if (_.isFunction(message)) {
        return message.call(_this, type, xhr);
      }
      return message;
    };
    msg = (_ref2 = m_opts.messageInstance) != null ? _ref2 : this.newMessage(m_opts);
    if (m_opts.id != null) {
      msg.options.id = m_opts.id;
    }
    if (m_opts.progressMessage != null) {
      msg.update($.extend({}, m_opts, {
        message: getMessageText('progress', null),
        type: 'info'
      }));
    }
    handlers = {};
    _.each(['error', 'success'], function(type) {
      var originalHandler;
      originalHandler = opts[type];
      return handlers[type] = function() {
        var data, defaultOpts, handlerResp, msgOpts, reason, resp, responseOpts, xhr, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9;
        resp = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        _ref3 = _this._normalizeResponse.apply(_this, resp), reason = _ref3[0], data = _ref3[1], xhr = _ref3[2];
        if (type === 'success' && !(msg.errorCount != null) && m_opts.showSuccessWithoutError === false) {
          m_opts['successMessage'] = null;
        }
        if (type === 'error') {
          if ((_ref4 = m_opts.errorCount) == null) {
            m_opts.errorCount = 0;
          }
          m_opts.errorCount += 1;
        }
        handlerResp = m_opts.returnsPromise ? resp[0] : typeof originalHandler === "function" ? originalHandler.apply(null, resp) : void 0;
        responseOpts = _this._getHandlerResponse(handlerResp);
        if (_.isString(responseOpts)) {
          responseOpts = {
            message: responseOpts
          };
        }
        if (type === 'error' && ((xhr != null ? xhr.status : void 0) === 0 || reason === 'abort')) {
          msg.hide();
          return;
        }
        if (type === 'error' && ((m_opts.ignoredErrorCodes != null) && (_ref5 = xhr != null ? xhr.status : void 0, __indexOf.call(m_opts.ignoredErrorCodes, _ref5) >= 0))) {
          msg.hide();
          return;
        }
        defaultOpts = {
          message: getMessageText(type, xhr),
          type: type,
          events: (_ref6 = events[type]) != null ? _ref6 : {},
          hideOnNavigate: type === 'success'
        };
        msgOpts = $.extend({}, m_opts, defaultOpts, responseOpts);
        if (typeof ((_ref7 = msgOpts.retry) != null ? _ref7.allow : void 0) === 'number') {
          msgOpts.retry.allow--;
        }
        if (type === 'error' && (xhr != null ? xhr.status : void 0) >= 500 && ((_ref8 = msgOpts.retry) != null ? _ref8.allow : void 0)) {
          if (msgOpts.retry.delay == null) {
            if (msgOpts.errorCount < 4) {
              msgOpts.retry.delay = 10;
            } else {
              msgOpts.retry.delay = 5 * 60;
            }
          }
          if (msgOpts.hideAfter) {
            if ((_ref9 = msgOpts._hideAfter) == null) {
              msgOpts._hideAfter = msgOpts.hideAfter;
            }
            msgOpts.hideAfter = msgOpts._hideAfter + msgOpts.retry.delay;
          }
          msgOpts._retryActions = true;
          msgOpts.actions = {
            retry: {
              label: 'retry now',
              phrase: 'Retrying TIME',
              auto: msgOpts.retry.auto,
              delay: msgOpts.retry.delay,
              action: function() {
                msgOpts.messageInstance = msg;
                return setTimeout(function() {
                  return _this["do"].apply(_this, [msgOpts, opts].concat(__slice.call(args)));
                }, 0);
              }
            },
            cancel: {
              action: function() {
                return msg.cancel();
              }
            }
          };
        } else if (msgOpts._retryActions) {
          delete msgOpts.actions.retry;
          delete msgOpts.actions.cancel;
          delete m_opts._retryActions;
        }
        msg.update(msgOpts);
        if (responseOpts && msgOpts.message) {
          Messenger(_.extend({}, _this.options, {
            instance: _this
          }));
          return msg.show();
        } else {
          return msg.hide();
        }
      };
    });
    if (!m_opts.returnsPromise) {
      for (type in handlers) {
        handler = handlers[type];
        old = opts[type];
        opts[type] = handler;
      }
    }
    msg._actionInstance = m_opts.action.apply(m_opts, [opts].concat(__slice.call(args)));
    if (m_opts.returnsPromise) {
      msg._actionInstance.then(handlers.success, handlers.error);
    }
    return msg;
  };

  ActionMessenger.prototype["do"] = ActionMessenger.prototype.run;

  ActionMessenger.prototype.ajax = function() {
    var args, m_opts;
    m_opts = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    m_opts.action = $.ajax;
    return this.run.apply(this, [m_opts].concat(__slice.call(args)));
  };

  ActionMessenger.prototype.expectPromise = function(action, m_opts) {
    m_opts = _.extend({}, m_opts, {
      action: action,
      returnsPromise: true
    });
    return this.run(m_opts);
  };

  ActionMessenger.prototype.error = function(m_opts) {
    if (m_opts == null) {
      m_opts = {};
    }
    if (typeof m_opts === 'string') {
      m_opts = {
        message: m_opts
      };
    }
    m_opts.type = 'error';
    return this.post(m_opts);
  };

  ActionMessenger.prototype.info = function(m_opts) {
    if (m_opts == null) {
      m_opts = {};
    }
    if (typeof m_opts === 'string') {
      m_opts = {
        message: m_opts
      };
    }
    m_opts.type = 'info';
    return this.post(m_opts);
  };

  ActionMessenger.prototype.success = function(m_opts) {
    if (m_opts == null) {
      m_opts = {};
    }
    if (typeof m_opts === 'string') {
      m_opts = {
        message: m_opts
      };
    }
    m_opts.type = 'success';
    return this.post(m_opts);
  };

  return ActionMessenger;

})(_Messenger);

$.fn.messenger = function() {
  var $el, args, func, instance, opts, _ref2, _ref3, _ref4;
  func = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
  if (func == null) {
    func = {};
  }
  $el = this;
  if (!(func != null) || !_.isString(func)) {
    opts = func;
    if (!($el.data('messenger') != null)) {
      _Messenger = (_ref2 = (_ref3 = Messenger.themes[opts.theme]) != null ? _ref3.Messenger : void 0) != null ? _ref2 : ActionMessenger;
      $el.data('messenger', instance = new _Messenger($.extend({
        el: $el
      }, opts)));
      instance.render();
    }
    return $el.data('messenger');
  } else {
    return (_ref4 = $el.data('messenger'))[func].apply(_ref4, args);
  }
};

window.Messenger._call = function(opts) {
  var $el, $parent, choosen_loc, chosen_loc, classes, defaultOpts, inst, loc, locations, _i, _len;
  defaultOpts = {
    extraClasses: 'messenger-fixed messenger-on-bottom messenger-on-right',
    theme: 'future',
    maxMessages: 9,
    parentLocations: ['body']
  };
  opts = $.extend(defaultOpts, $._messengerDefaults, Messenger.options, opts);
  if (opts.theme != null) {
    opts.extraClasses += " messenger-theme-" + opts.theme;
  }
  inst = opts.instance || Messenger.instance;
  if (opts.instance == null) {
    locations = opts.parentLocations;
    $parent = null;
    choosen_loc = null;
    for (_i = 0, _len = locations.length; _i < _len; _i++) {
      loc = locations[_i];
      $parent = $(loc);
      if ($parent.length) {
        chosen_loc = loc;
        break;
      }
    }
    if (!inst) {
      $el = $('<ul>');
      $parent.prepend($el);
      inst = $el.messenger(opts);
      inst._location = chosen_loc;
      Messenger.instance = inst;
    } else if (!$(inst._location).is($(chosen_loc))) {
      inst.$el.detach();
      $parent.prepend(inst.$el);
    }
  }
  if (inst._addedClasses != null) {
    inst.$el.removeClass(inst._addedClasses);
  }
  inst.$el.addClass(classes = "" + inst.className + " " + opts.extraClasses);
  inst._addedClasses = classes;
  return inst;
};

$.extend(Messenger, {
  Message: RetryingMessage,
  Messenger: ActionMessenger,
  themes: (_ref2 = Messenger.themes) != null ? _ref2 : {}
});

$.globalMessenger = window.Messenger = Messenger;

}).call(this);

(function() {
    var $, FlatMessage, spinner_template,
      __hasProp = {}.hasOwnProperty,
      __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

    $ = window.$;

    spinner_template = '<div class="messenger-spinner">\n    <span class="messenger-spinner-side messenger-spinner-side-left">\n        <span class="messenger-spinner-fill"></span>\n    </span>\n    <span class="messenger-spinner-side messenger-spinner-side-right">\n        <span class="messenger-spinner-fill"></span>\n    </span>\n</div>';

    FlatMessage = (function(_super) {

      __extends(FlatMessage, _super);

      function FlatMessage() {
        return FlatMessage.__super__.constructor.apply(this, arguments);
      }

      FlatMessage.prototype.template = function(opts) {
        var $message;
        $message = FlatMessage.__super__.template.apply(this, arguments);
        $message.append($(spinner_template));
        return $message;
      };

      return FlatMessage;

    })(window.Messenger.Message);

    window.Messenger.themes.flat = {
      Message: FlatMessage
    };

}).call(this);

Messenger.options = {
    extraClasses: 'messenger-fixed messenger-on-top messenger-on-right',
    theme: 'flat'
};

// 功能函数
(function(win) {
    function Pack(ele) {
        this.ele = ele;
        this.record = [];
        this.index = 0;
        this.dir = 1;
        this.status = false;
    }

    Pack.prototype = {
        _toggleClass: function(className, next) {
            var self = this;
            classArr = className.split(' ');

            classArr.forEach(function(cls) {
                self.ele.classList.toggle(cls);
            });

            next && setTimeout(next, 10);
        },

        _transfromClass: function(className, next) {
            var self = this;

            this.ele.addEventListener('transitionend', function fun(event) {
                if (self.ele === event.target) {
                    next();
                    self.ele.removeEventListener('transitionend', fun);
                }
            });

            this._toggleClass(className);
        },

        _animationClass: function(className, next) {
            var self = this;

            this.ele.addEventListener('animationend', function fun(event) {
                if (self.ele === event.target) {
                    next();
                    self.ele.removeEventListener('animationend', fun);
                }
            });

            this._toggleClass(className);
        },

        _toggle: function() {
            var opt = this.record[this.index];

            if (this.index === this.record.length || this.index === -1) {
                this.end && this.end();
                this.index = this.dir > 0 ? this.index - 1 : 0;
                this.dir *= -1;
                this.status = false;
                return;
            }

            switch(opt.type) {
                case 'class':
                    this._toggleClass(opt.className, this._toggle.bind(this));
                    break;
                case 'transfrom':
                    this._transfromClass(opt.className, this._toggle.bind(this));
                    break;
                case 'animation':
                    this._animationClass(opt.className, this._toggle.bind(this));
                    break;
            }

            this.index += this.dir;
        },

        base: function(className) {
            this.record.push({
                className: className || 'js-open',
                type: 'class'
            });

            return this;
        },

        transfrom: function(className) {
            this.record.push({
                className: className,
                type: 'transfrom'
            });

            return this;
        },

        animation: function(className) {
            this.record.push({
                className: className,
                type: 'animation'
            });

            return this;
        },

        toggle: function() {
            if (this.status) return;

            if (this.index === 0 || this.index === this.record.length - 1) {
                this.status = true;
            }

            this._toggle();
        },

        lastStart: function() {
            var self = this;

            this.status = false;
            this.index = this.record.length - 1;
            this.dir = -1;

            this.record.forEach(function(record) {
                self.ele.classList.add(record.className);
            });

            return this;
        },

        end: function(fun) {
            this.end = fun;
            return this;
        }
    }

    win.Pack = Pack;
})(window);
window.addEventListener('DOMContentLoaded', function() {
    function addListener(callback) {
        var timer = null,
            requestAnimationFrame = window.requestAnimationFrame
                || window.mozRequestAnimationFrame
                || window.webkitRequestAnimationFrame
                || window.msRequestAnimationFrame,
            cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

        function listentener() {
            cancelAnimationFrame(timer);

            timer = requestAnimationFrame(callback.bind(null, function() {
                document.removeEventListener('scroll', listentener);
            }));
        }

        document.addEventListener('scroll', listentener);

        listentener();
    }

    window._skappPostAnimation = function() {
        var posts = document.querySelectorAll('article.page__mini-article');

        posts.forEach(function(post) {
            if (post.parentElement.parentElement.classList.contains('js-hidden')) return;

            var position = getPosition(post);

            var pack = new Pack(post);

            pack
                .base('js-ease-out-leave-active')
                .base('js-ease-out-leave')
                .transfrom('js-ease-out-enter-active')
                .end(function() {
                    var arr = ['js-ease-out-enter', 'js-ease-out-enter-active', 'js-ease-out-leave', 'js-ease-out-leave-active'];

                    post.classList.add('transformed');

                    arr.forEach(function(item) {
                        post.classList.remove(item);
                    });
                })

            addListener(function(remove) {
                var diff = position.y - window.scrollY - document.documentElement.clientHeight;

                if (diff < 50) {

                    remove();

                    pack.toggle();
                }
            });
        });
    }

});

!function(){/*

 Copyright (C) 2006 Google Inc.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
"undefined"!==typeof window&&(window.PR_SHOULD_USE_CONTINUATION=!0);
(function(){function T(a){function d(e){var a=e.charCodeAt(0);if(92!==a)return a;var c=e.charAt(1);return(a=w[c])?a:"0"<=c&&"7">=c?parseInt(e.substring(1),8):"u"===c||"x"===c?parseInt(e.substring(2),16):e.charCodeAt(1)}function f(e){if(32>e)return(16>e?"\\x0":"\\x")+e.toString(16);e=String.fromCharCode(e);return"\\"===e||"-"===e||"]"===e||"^"===e?"\\"+e:e}function c(e){var c=e.substring(1,e.length-1).match(RegExp("\\\\u[0-9A-Fa-f]{4}|\\\\x[0-9A-Fa-f]{2}|\\\\[0-3][0-7]{0,2}|\\\\[0-7]{1,2}|\\\\[\\s\\S]|-|[^-\\\\]","g"));
e=[];var a="^"===c[0],b=["["];a&&b.push("^");for(var a=a?1:0,g=c.length;a<g;++a){var h=c[a];if(/\\[bdsw]/i.test(h))b.push(h);else{var h=d(h),k;a+2<g&&"-"===c[a+1]?(k=d(c[a+2]),a+=2):k=h;e.push([h,k]);65>k||122<h||(65>k||90<h||e.push([Math.max(65,h)|32,Math.min(k,90)|32]),97>k||122<h||e.push([Math.max(97,h)&-33,Math.min(k,122)&-33]))}}e.sort(function(e,a){return e[0]-a[0]||a[1]-e[1]});c=[];g=[];for(a=0;a<e.length;++a)h=e[a],h[0]<=g[1]+1?g[1]=Math.max(g[1],h[1]):c.push(g=h);for(a=0;a<c.length;++a)h=
c[a],b.push(f(h[0])),h[1]>h[0]&&(h[1]+1>h[0]&&b.push("-"),b.push(f(h[1])));b.push("]");return b.join("")}function m(e){for(var a=e.source.match(RegExp("(?:\\[(?:[^\\x5C\\x5D]|\\\\[\\s\\S])*\\]|\\\\u[A-Fa-f0-9]{4}|\\\\x[A-Fa-f0-9]{2}|\\\\[0-9]+|\\\\[^ux0-9]|\\(\\?[:!=]|[\\(\\)\\^]|[^\\x5B\\x5C\\(\\)\\^]+)","g")),b=a.length,d=[],g=0,h=0;g<b;++g){var k=a[g];"("===k?++h:"\\"===k.charAt(0)&&(k=+k.substring(1))&&(k<=h?d[k]=-1:a[g]=f(k))}for(g=1;g<d.length;++g)-1===d[g]&&(d[g]=++E);for(h=g=0;g<b;++g)k=a[g],
"("===k?(++h,d[h]||(a[g]="(?:")):"\\"===k.charAt(0)&&(k=+k.substring(1))&&k<=h&&(a[g]="\\"+d[k]);for(g=0;g<b;++g)"^"===a[g]&&"^"!==a[g+1]&&(a[g]="");if(e.ignoreCase&&q)for(g=0;g<b;++g)k=a[g],e=k.charAt(0),2<=k.length&&"["===e?a[g]=c(k):"\\"!==e&&(a[g]=k.replace(/[a-zA-Z]/g,function(a){a=a.charCodeAt(0);return"["+String.fromCharCode(a&-33,a|32)+"]"}));return a.join("")}for(var E=0,q=!1,l=!1,n=0,b=a.length;n<b;++n){var p=a[n];if(p.ignoreCase)l=!0;else if(/[a-z]/i.test(p.source.replace(/\\u[0-9a-f]{4}|\\x[0-9a-f]{2}|\\[^ux]/gi,
""))){q=!0;l=!1;break}}for(var w={b:8,t:9,n:10,v:11,f:12,r:13},r=[],n=0,b=a.length;n<b;++n){p=a[n];if(p.global||p.multiline)throw Error(""+p);r.push("(?:"+m(p)+")")}return new RegExp(r.join("|"),l?"gi":"g")}function U(a,d){function f(a){var b=a.nodeType;if(1==b){if(!c.test(a.className)){for(b=a.firstChild;b;b=b.nextSibling)f(b);b=a.nodeName.toLowerCase();if("br"===b||"li"===b)m[l]="\n",q[l<<1]=E++,q[l++<<1|1]=a}}else if(3==b||4==b)b=a.nodeValue,b.length&&(b=d?b.replace(/\r\n?/g,"\n"):b.replace(/[ \t\r\n]+/g,
" "),m[l]=b,q[l<<1]=E,E+=b.length,q[l++<<1|1]=a)}var c=/(?:^|\s)nocode(?:\s|$)/,m=[],E=0,q=[],l=0;f(a);return{a:m.join("").replace(/\n$/,""),c:q}}function J(a,d,f,c,m){f&&(a={h:a,l:1,j:null,m:null,a:f,c:null,i:d,g:null},c(a),m.push.apply(m,a.g))}function V(a){for(var d=void 0,f=a.firstChild;f;f=f.nextSibling)var c=f.nodeType,d=1===c?d?a:f:3===c?W.test(f.nodeValue)?a:d:d;return d===a?void 0:d}function G(a,d){function f(a){for(var l=a.i,n=a.h,b=[l,"pln"],p=0,q=a.a.match(m)||[],r={},e=0,t=q.length;e<
t;++e){var z=q[e],v=r[z],g=void 0,h;if("string"===typeof v)h=!1;else{var k=c[z.charAt(0)];if(k)g=z.match(k[1]),v=k[0];else{for(h=0;h<E;++h)if(k=d[h],g=z.match(k[1])){v=k[0];break}g||(v="pln")}!(h=5<=v.length&&"lang-"===v.substring(0,5))||g&&"string"===typeof g[1]||(h=!1,v="src");h||(r[z]=v)}k=p;p+=z.length;if(h){h=g[1];var A=z.indexOf(h),C=A+h.length;g[2]&&(C=z.length-g[2].length,A=C-h.length);v=v.substring(5);J(n,l+k,z.substring(0,A),f,b);J(n,l+k+A,h,K(v,h),b);J(n,l+k+C,z.substring(C),f,b)}else b.push(l+
k,v)}a.g=b}var c={},m;(function(){for(var f=a.concat(d),l=[],n={},b=0,p=f.length;b<p;++b){var w=f[b],r=w[3];if(r)for(var e=r.length;0<=--e;)c[r.charAt(e)]=w;w=w[1];r=""+w;n.hasOwnProperty(r)||(l.push(w),n[r]=null)}l.push(/[\0-\uffff]/);m=T(l)})();var E=d.length;return f}function x(a){var d=[],f=[];a.tripleQuotedStrings?d.push(["str",/^(?:\'\'\'(?:[^\'\\]|\\[\s\S]|\'{1,2}(?=[^\']))*(?:\'\'\'|$)|\"\"\"(?:[^\"\\]|\\[\s\S]|\"{1,2}(?=[^\"]))*(?:\"\"\"|$)|\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$))/,
null,"'\""]):a.multiLineStrings?d.push(["str",/^(?:\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$)|\`(?:[^\\\`]|\\[\s\S])*(?:\`|$))/,null,"'\"`"]):d.push(["str",/^(?:\'(?:[^\\\'\r\n]|\\.)*(?:\'|$)|\"(?:[^\\\"\r\n]|\\.)*(?:\"|$))/,null,"\"'"]);a.verbatimStrings&&f.push(["str",/^@\"(?:[^\"]|\"\")*(?:\"|$)/,null]);var c=a.hashComments;c&&(a.cStyleComments?(1<c?d.push(["com",/^#(?:##(?:[^#]|#(?!##))*(?:###|$)|.*)/,null,"#"]):d.push(["com",/^#(?:(?:define|e(?:l|nd)if|else|error|ifn?def|include|line|pragma|undef|warning)\b|[^\r\n]*)/,
null,"#"]),f.push(["str",/^<(?:(?:(?:\.\.\/)*|\/?)(?:[\w-]+(?:\/[\w-]+)+)?[\w-]+\.h(?:h|pp|\+\+)?|[a-z]\w*)>/,null])):d.push(["com",/^#[^\r\n]*/,null,"#"]));a.cStyleComments&&(f.push(["com",/^\/\/[^\r\n]*/,null]),f.push(["com",/^\/\*[\s\S]*?(?:\*\/|$)/,null]));if(c=a.regexLiterals){var m=(c=1<c?"":"\n\r")?".":"[\\S\\s]";f.push(["lang-regex",RegExp("^(?:^^\\.?|[+-]|[!=]=?=?|\\#|%=?|&&?=?|\\(|\\*=?|[+\\-]=|->|\\/=?|::?|<<?=?|>>?>?=?|,|;|\\?|@|\\[|~|{|\\^\\^?=?|\\|\\|?=?|break|case|continue|delete|do|else|finally|instanceof|return|throw|try|typeof)\\s*("+
("/(?=[^/*"+c+"])(?:[^/\\x5B\\x5C"+c+"]|\\x5C"+m+"|\\x5B(?:[^\\x5C\\x5D"+c+"]|\\x5C"+m+")*(?:\\x5D|$))+/")+")")])}(c=a.types)&&f.push(["typ",c]);c=(""+a.keywords).replace(/^ | $/g,"");c.length&&f.push(["kwd",new RegExp("^(?:"+c.replace(/[\s,]+/g,"|")+")\\b"),null]);d.push(["pln",/^\s+/,null," \r\n\t\u00a0"]);c="^.[^\\s\\w.$@'\"`/\\\\]*";a.regexLiterals&&(c+="(?!s*/)");f.push(["lit",/^@[a-z_$][a-z_$@0-9]*/i,null],["typ",/^(?:[@_]?[A-Z]+[a-z][A-Za-z_$@0-9]*|\w+_t\b)/,null],["pln",/^[a-z_$][a-z_$@0-9]*/i,
null],["lit",/^(?:0x[a-f0-9]+|(?:\d(?:_\d+)*\d*(?:\.\d*)?|\.\d\+)(?:e[+\-]?\d+)?)[a-z]*/i,null,"0123456789"],["pln",/^\\[\s\S]?/,null],["pun",new RegExp(c),null]);return G(d,f)}function L(a,d,f){function c(a){var b=a.nodeType;if(1==b&&!t.test(a.className))if("br"===a.nodeName.toLowerCase())m(a),a.parentNode&&a.parentNode.removeChild(a);else for(a=a.firstChild;a;a=a.nextSibling)c(a);else if((3==b||4==b)&&f){var e=a.nodeValue,d=e.match(q);d&&(b=e.substring(0,d.index),a.nodeValue=b,(e=e.substring(d.index+
d[0].length))&&a.parentNode.insertBefore(l.createTextNode(e),a.nextSibling),m(a),b||a.parentNode.removeChild(a))}}function m(a){function c(a,b){var e=b?a.cloneNode(!1):a,k=a.parentNode;if(k){var k=c(k,1),d=a.nextSibling;k.appendChild(e);for(var f=d;f;f=d)d=f.nextSibling,k.appendChild(f)}return e}for(;!a.nextSibling;)if(a=a.parentNode,!a)return;a=c(a.nextSibling,0);for(var e;(e=a.parentNode)&&1===e.nodeType;)a=e;b.push(a)}for(var t=/(?:^|\s)nocode(?:\s|$)/,q=/\r\n?|\n/,l=a.ownerDocument,n=l.createElement("li");a.firstChild;)n.appendChild(a.firstChild);
for(var b=[n],p=0;p<b.length;++p)c(b[p]);d===(d|0)&&b[0].setAttribute("value",d);var w=l.createElement("ol");w.className="linenums";d=Math.max(0,d-1|0)||0;for(var p=0,r=b.length;p<r;++p)n=b[p],n.className="L"+(p+d)%10,n.firstChild||n.appendChild(l.createTextNode("\u00a0")),w.appendChild(n);a.appendChild(w)}function t(a,d){for(var f=d.length;0<=--f;){var c=d[f];I.hasOwnProperty(c)?D.console&&console.warn("cannot override language handler %s",c):I[c]=a}}function K(a,d){a&&I.hasOwnProperty(a)||(a=/^\s*</.test(d)?
"default-markup":"default-code");return I[a]}function M(a){var d=a.j;try{var f=U(a.h,a.l),c=f.a;a.a=c;a.c=f.c;a.i=0;K(d,c)(a);var m=/\bMSIE\s(\d+)/.exec(navigator.userAgent),m=m&&8>=+m[1],d=/\n/g,t=a.a,q=t.length,f=0,l=a.c,n=l.length,c=0,b=a.g,p=b.length,w=0;b[p]=q;var r,e;for(e=r=0;e<p;)b[e]!==b[e+2]?(b[r++]=b[e++],b[r++]=b[e++]):e+=2;p=r;for(e=r=0;e<p;){for(var x=b[e],z=b[e+1],v=e+2;v+2<=p&&b[v+1]===z;)v+=2;b[r++]=x;b[r++]=z;e=v}b.length=r;var g=a.h;a="";g&&(a=g.style.display,g.style.display="none");
try{for(;c<n;){var h=l[c+2]||q,k=b[w+2]||q,v=Math.min(h,k),A=l[c+1],C;if(1!==A.nodeType&&(C=t.substring(f,v))){m&&(C=C.replace(d,"\r"));A.nodeValue=C;var N=A.ownerDocument,u=N.createElement("span");u.className=b[w+1];var B=A.parentNode;B.replaceChild(u,A);u.appendChild(A);f<h&&(l[c+1]=A=N.createTextNode(t.substring(v,h)),B.insertBefore(A,u.nextSibling))}f=v;f>=h&&(c+=2);f>=k&&(w+=2)}}finally{g&&(g.style.display=a)}}catch(y){D.console&&console.log(y&&y.stack||y)}}var D="undefined"!==typeof window?
window:{},B=["break,continue,do,else,for,if,return,while"],F=[[B,"auto,case,char,const,default,double,enum,extern,float,goto,inline,int,long,register,restrict,short,signed,sizeof,static,struct,switch,typedef,union,unsigned,void,volatile"],"catch,class,delete,false,import,new,operator,private,protected,public,this,throw,true,try,typeof"],H=[F,"alignas,alignof,align_union,asm,axiom,bool,concept,concept_map,const_cast,constexpr,decltype,delegate,dynamic_cast,explicit,export,friend,generic,late_check,mutable,namespace,noexcept,noreturn,nullptr,property,reinterpret_cast,static_assert,static_cast,template,typeid,typename,using,virtual,where"],
O=[F,"abstract,assert,boolean,byte,extends,finally,final,implements,import,instanceof,interface,null,native,package,strictfp,super,synchronized,throws,transient"],P=[F,"abstract,add,alias,as,ascending,async,await,base,bool,by,byte,checked,decimal,delegate,descending,dynamic,event,finally,fixed,foreach,from,get,global,group,implicit,in,interface,internal,into,is,join,let,lock,null,object,out,override,orderby,params,partial,readonly,ref,remove,sbyte,sealed,select,set,stackalloc,string,select,uint,ulong,unchecked,unsafe,ushort,value,var,virtual,where,yield"],
F=[F,"abstract,async,await,constructor,debugger,enum,eval,export,from,function,get,import,implements,instanceof,interface,let,null,of,set,undefined,var,with,yield,Infinity,NaN"],Q=[B,"and,as,assert,class,def,del,elif,except,exec,finally,from,global,import,in,is,lambda,nonlocal,not,or,pass,print,raise,try,with,yield,False,True,None"],R=[B,"alias,and,begin,case,class,def,defined,elsif,end,ensure,false,in,module,next,nil,not,or,redo,rescue,retry,self,super,then,true,undef,unless,until,when,yield,BEGIN,END"],
B=[B,"case,done,elif,esac,eval,fi,function,in,local,set,then,until"],S=/^(DIR|FILE|array|vector|(de|priority_)?queue|(forward_)?list|stack|(const_)?(reverse_)?iterator|(unordered_)?(multi)?(set|map)|bitset|u?(int|float)\d*)\b/,W=/\S/,X=x({keywords:[H,P,O,F,"caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END",Q,R,B],hashComments:!0,cStyleComments:!0,multiLineStrings:!0,regexLiterals:!0}),
I={};t(X,["default-code"]);t(G([],[["pln",/^[^<?]+/],["dec",/^<!\w[^>]*(?:>|$)/],["com",/^<\!--[\s\S]*?(?:-\->|$)/],["lang-",/^<\?([\s\S]+?)(?:\?>|$)/],["lang-",/^<%([\s\S]+?)(?:%>|$)/],["pun",/^(?:<[%?]|[%?]>)/],["lang-",/^<xmp\b[^>]*>([\s\S]+?)<\/xmp\b[^>]*>/i],["lang-js",/^<script\b[^>]*>([\s\S]*?)(<\/script\b[^>]*>)/i],["lang-css",/^<style\b[^>]*>([\s\S]*?)(<\/style\b[^>]*>)/i],["lang-in.tag",/^(<\/?[a-z][^<>]*>)/i]]),"default-markup htm html mxml xhtml xml xsl".split(" "));t(G([["pln",/^[\s]+/,
null," \t\r\n"],["atv",/^(?:\"[^\"]*\"?|\'[^\']*\'?)/,null,"\"'"]],[["tag",/^^<\/?[a-z](?:[\w.:-]*\w)?|\/?>$/i],["atn",/^(?!style[\s=]|on)[a-z](?:[\w:-]*\w)?/i],["lang-uq.val",/^=\s*([^>\'\"\s]*(?:[^>\'\"\s\/]|\/(?=\s)))/],["pun",/^[=<>\/]+/],["lang-js",/^on\w+\s*=\s*\"([^\"]+)\"/i],["lang-js",/^on\w+\s*=\s*\'([^\']+)\'/i],["lang-js",/^on\w+\s*=\s*([^\"\'>\s]+)/i],["lang-css",/^style\s*=\s*\"([^\"]+)\"/i],["lang-css",/^style\s*=\s*\'([^\']+)\'/i],["lang-css",/^style\s*=\s*([^\"\'>\s]+)/i]]),["in.tag"]);
t(G([],[["atv",/^[\s\S]+/]]),["uq.val"]);t(x({keywords:H,hashComments:!0,cStyleComments:!0,types:S}),"c cc cpp cxx cyc m".split(" "));t(x({keywords:"null,true,false"}),["json"]);t(x({keywords:P,hashComments:!0,cStyleComments:!0,verbatimStrings:!0,types:S}),["cs"]);t(x({keywords:O,cStyleComments:!0}),["java"]);t(x({keywords:B,hashComments:!0,multiLineStrings:!0}),["bash","bsh","csh","sh"]);t(x({keywords:Q,hashComments:!0,multiLineStrings:!0,tripleQuotedStrings:!0}),["cv","py","python"]);t(x({keywords:"caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END",
hashComments:!0,multiLineStrings:!0,regexLiterals:2}),["perl","pl","pm"]);t(x({keywords:R,hashComments:!0,multiLineStrings:!0,regexLiterals:!0}),["rb","ruby"]);t(x({keywords:F,cStyleComments:!0,regexLiterals:!0}),["javascript","js","ts","typescript"]);t(x({keywords:"all,and,by,catch,class,else,extends,false,finally,for,if,in,is,isnt,loop,new,no,not,null,of,off,on,or,return,super,then,throw,true,try,unless,until,when,while,yes",hashComments:3,cStyleComments:!0,multilineStrings:!0,tripleQuotedStrings:!0,
regexLiterals:!0}),["coffee"]);t(G([],[["str",/^[\s\S]+/]]),["regex"]);var Y=D.PR={createSimpleLexer:G,registerLangHandler:t,sourceDecorator:x,PR_ATTRIB_NAME:"atn",PR_ATTRIB_VALUE:"atv",PR_COMMENT:"com",PR_DECLARATION:"dec",PR_KEYWORD:"kwd",PR_LITERAL:"lit",PR_NOCODE:"nocode",PR_PLAIN:"pln",PR_PUNCTUATION:"pun",PR_SOURCE:"src",PR_STRING:"str",PR_TAG:"tag",PR_TYPE:"typ",prettyPrintOne:D.prettyPrintOne=function(a,d,f){f=f||!1;d=d||null;var c=document.createElement("div");c.innerHTML="<pre>"+a+"</pre>";
c=c.firstChild;f&&L(c,f,!0);M({j:d,m:f,h:c,l:1,a:null,i:null,c:null,g:null});return c.innerHTML},prettyPrint:D.prettyPrint=function(a,d){function f(){for(var c=D.PR_SHOULD_USE_CONTINUATION?b.now()+250:Infinity;p<x.length&&b.now()<c;p++){for(var d=x[p],l=g,n=d;n=n.previousSibling;){var m=n.nodeType,u=(7===m||8===m)&&n.nodeValue;if(u?!/^\??prettify\b/.test(u):3!==m||/\S/.test(n.nodeValue))break;if(u){l={};u.replace(/\b(\w+)=([\w:.%+-]+)/g,function(a,b,c){l[b]=c});break}}n=d.className;if((l!==g||r.test(n))&&
!e.test(n)){m=!1;for(u=d.parentNode;u;u=u.parentNode)if(v.test(u.tagName)&&u.className&&r.test(u.className)){m=!0;break}if(!m){d.className+=" prettyprinted";m=l.lang;if(!m){var m=n.match(w),q;!m&&(q=V(d))&&z.test(q.tagName)&&(m=q.className.match(w));m&&(m=m[1])}if(B.test(d.tagName))u=1;else var u=d.currentStyle,y=t.defaultView,u=(u=u?u.whiteSpace:y&&y.getComputedStyle?y.getComputedStyle(d,null).getPropertyValue("white-space"):0)&&"pre"===u.substring(0,3);y=l.linenums;(y="true"===y||+y)||(y=(y=n.match(/\blinenums\b(?::(\d+))?/))?
y[1]&&y[1].length?+y[1]:!0:!1);y&&L(d,y,u);M({j:m,h:d,m:y,l:u,a:null,i:null,c:null,g:null})}}}p<x.length?D.setTimeout(f,250):"function"===typeof a&&a()}for(var c=d||document.body,t=c.ownerDocument||document,c=[c.getElementsByTagName("pre"),c.getElementsByTagName("code"),c.getElementsByTagName("xmp")],x=[],q=0;q<c.length;++q)for(var l=0,n=c[q].length;l<n;++l)x.push(c[q][l]);var c=null,b=Date;b.now||(b={now:function(){return+new Date}});var p=0,w=/\blang(?:uage)?-([\w.]+)(?!\S)/,r=/\bprettyprint\b/,
e=/\bprettyprinted\b/,B=/pre|xmp/i,z=/^code$/i,v=/^(?:pre|code|xmp)$/i,g={};f()}},H=D.define;"function"===typeof H&&H.amd&&H("google-code-prettify",[],function(){return Y})})();}()

function getBaseType(target) {
    return Object.prototype.toString.apply(target).slice(8, -1);
}

function eachObj(obj, fn) {
    for(var key in obj) {
        fn(obj[key], key, obj);
    }
}

function getKeys(obj, sort) {
    var keys = [];

    eachObj(obj, function(value, key) {
        keys.push(key);
    });

    return keys.sort(sort);
}

function extend(obj, target) {
    eachObj(target, function(value, key) {
        obj[key] = value;
    });

    return obj;
}

function getPosition(element) {
    var x = 0;
    var y = 0;
    if (!element.tagName) {
        console.warn('element must be a HTML element object');
        return {
            x: null,
            y: null
        };
    }
    while (element !== document.body) {
        x += element.offsetLeft;
        y += element.offsetTop;
        element = element.offsetParent;
    }
    return {
        x: x,
        y: y
    };
}

function addClass(obj, cls) {
    if (hasClass(obj, cls)) {
        return;
    }
    var elClassName = obj.className; // 获取 class 内容.
    var blank = (elClassName !== '') ? ' ' : ''; // 判断获取到的 class 是否为空, 如果不为空在前面加个'空格'.
    var added = elClassName + blank + cls; // 组合原来的 class 和需要添加的 class.
    obj.className = added; // 替换原来的 class.
}

// 移除class
function removeClass(obj, cls) {
    var elClassName = ' ' + obj.className + ' '; // 获取 class 内容, 并在首尾各加个空格. ex) 'abc  bcd' -> ' abc  bcd '
    elClassName = elClassName.replace(/(\s+)/gi, ' ');// 将多余的空字符替换成空格. ex) ' abc  bcd ' -> ' abc bcd '
    var removed = elClassName.replace(' ' + cls + ' ', ' ');// 在原来的 class 替换掉首尾加了空格的 class. ex) ' abc bcd ' -> 'bcd '
    removed = removed.replace(/(^\s+)|(\s+$)/g, '');// 去掉首尾空格. ex) 'bcd ' -> 'bcd'
    obj.className = removed;// 替换原来的 class.
}

function hasClass(obj, cls) {
    var elClassName = obj.className; // 获取 class 内容.
    var elClassNameList = elClassName.split(/\s+/); // 通过split空字符将cls转换成数组.
    var i = 0;
    for (i in elClassNameList) {
        if (elClassNameList[i] === cls) { // 循环数组, 判断是否包含cls
            return true;
        }
    }
    return false;
}

// 查找最近的父级
function closest(el, selector) {
    if (!el) return;
    var matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    while (el) {
        if (matchesSelector.call(el, selector)) {
            break;
        }
        el = el.parentElement;
    }
    return el;
}

function getUrlParams(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    var r = win.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
}

function setCookie(name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + (Days * 24 * 60 * 60 * 1000));
    document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString();
}

function getCookie(name) {
    var arr;
    var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
    if (arr = document.cookie.match(reg)) {
        return unescape(arr[2]);
    }
    return null;
}

function apiPublish(data, callback) {
    $.ajax({
        type: 'POST',
        url: '/admin/article-publish',
        dataType: 'json',
        data: data,
        success: callback,
    });
}

function apiDelete(data, callback) {
    $.ajax({
        type: 'POST',
        url: '/admin/article-delete',
        dataType: 'json',
        data: data,
        success: callback,
    });
}

// 高亮代码块  可选语言: "bsh", "c", "cc", "cpp", "cs", "csh", "cyc", "cv", "htm", "html", "java", "js", "m", "mxml", "perl", "pl", "pm", "py", "rb", "sh", "xhtml", "xml", "xsl".
window.addEventListener('DOMContentLoaded', function() {
    var doc = document;
    var codes = doc.querySelectorAll('pre');
    var i = 0;
    for (var length = codes.length; i < length; i++) {
        addClass(codes[i], 'prettyprint linenums');
    }
    prettyPrint();

    var search = doc.getElementById('page-search-from');
    var searchBtn = doc.getElementById('page-search-btn');
    if(searchBtn) {
        searchBtn.onclick = function () {
            search.submit();
        }
    }
}, false);
