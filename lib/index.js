'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var isClient = typeof window != 'undefined';

var Loader = function () {
  function Loader(options) {
    _classCallCheck(this, Loader);

    this.options = options;
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
    key: 'create',
    value: function create(options) {
      return new Loader(options);
    }
  }, {
    key: 'load',
    value: function load(loader, src, cb) {
      if (!isClient) return;

      if (typeof src == 'string') {
        loader.load(src, cb);
      }

      if (src && Array.isArray(src)) {
        if (src.length) {
          if (src.length == 1) {
            loader.load(src[0], cb);
          } else {
            loader.load(src[0], function () {
              src.shift();
              loader.load(src, cb);
            });
          }
        }
      }
      return this;
    }
  }, {
    key: 'js',
    value: function js(src, cb) {
      return this.load(this.JSLoader, src, cb);
    }
  }, {
    key: 'css',
    value: function css(src, cb) {
      return this.load(this.CSSLoader, src, cb);
    }
  }, {
    key: 'image',
    value: function image(src, cb) {
      return this.load(this.ImageLoader, src, cb);
    }
  }, {
    key: 'audio',
    value: function audio(src, cb) {
      return this.load(this.AudioLoader, src, cb);
    }
  }, {
    key: 'video',
    value: function video(src, cb) {
      return this.load(this.VideoLoader, src, cb);
    }
  }, {
    key: 'preload',
    value: function preload(options) {
      var _this = this;

      if (!isClient) return;

      options = Object.assign({
        urlMap: function urlMap(url, type) {
          return url;
        },
        onLoading: function onLoading(progress) {},
        onComplete: function onComplete() {}
      }, options);

      var loadType = ['js', 'css', 'image', 'audio', 'video'];
      loadType.forEach(function (item, i) {

        if (!options[item]) return;

        var url = options[item];
        if (Array.isArray(url)) {
          url = options[item].map(function (u) {
            return options.urlMap(u, item);
          });
        } else {
          url = options.urlMap(url, item);
        }

        _this[item](url, options.onComplete);
      });
    }
  }]);

  return Loader;
}();

module.exports = new Loader({
  urlMap: function urlMap(url, type) {
    return url;
  },
  maxConnection: 4
});