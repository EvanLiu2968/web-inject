'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var isClient = typeof window != 'undefined';

var Loader = function () {
  function Loader() {
    _classCallCheck(this, Loader);

    this.JSLoader = require('./JSLoader');
    this.CSSLoader = require('./CSSLoader');
    this.ImageLoader = require('./ImageLoader');
    this.AudioLoader = require('./AudioLoader');
    this.VideoLoader = require('./VideoLoader');
    this.LoadQueue = {
      js: []
    };
  }

  _createClass(Loader, [{
    key: 'removeQueue',
    value: function removeQueue() {
      this.LoadQueue = {};
    }
  }, {
    key: 'js',
    value: function js(src, cb) {
      var _this = this;

      if (!isClient) return;

      if (typeof src == 'string') {
        this.JSLoader.load(src, cb);
      }

      if (src && Array.isArray(src)) {
        if (src.length) {
          if (src.length == 1) {
            this.JSLoader.load(src[0], cb);
          } else {
            this.JSLoader.load(src[0], function () {
              src.shift();
              _this.js(src, cb);
            });
          }
        }
      }
      return this;
    }
  }, {
    key: 'css',
    value: function css(src, cb) {
      var _this2 = this;

      if (!isClient) return;

      if (typeof src == 'string') {
        this.CSSLoader.load(src, cb);
      }

      if (src && Array.isArray(src)) {
        if (src.length) {
          if (src.length == 1) {
            this.CSSLoader.load(src[0], cb);
          } else {
            this.CSSLoader.load(src[0], function () {
              src.shift();
              _this2.css(src, cb);
            });
          }
        }
      }
      return this;
    }
  }, {
    key: 'preload',
    value: function preload(options) {
      if (!isClient) return;

      options = _extends({
        urlMap: function urlMap(url, type) {
          return url;
        },
        onLoading: function onLoading(progress) {},
        onComplete: function onComplete() {}
      }, options);
    }
  }]);

  return Loader;
}();

module.exports = new Loader();