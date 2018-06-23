'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var extend = require('./extend');
var isClient = typeof window != 'undefined';

var Loader = function () {
  function Loader(options) {
    (0, _classCallCheck3.default)(this, Loader);

    this.options = options;
    this.Loader = {
      'js': require('./JSLoader'),
      'css': require('./CSSLoader'),
      'image': require('./ImageLoader'),
      'audio': require('./AudioLoader'),
      'video': require('./VideoLoader')
    };
    this.taskCount = 0;
  }

  (0, _createClass3.default)(Loader, [{
    key: 'startQueue',
    value: function startQueue(queue) {
      var _this = this;

      var _loop = function _loop(i) {
        if (_this.taskCount < _this.options.maxConnection) {
          if (!queue[i].state) {
            _this.taskCount++;
            queue[i].state = 'loading';
            var loader = _this.Loader[queue[i].type];
            loader.load(queue[i].url, function () {
              _this.taskCount--;
              queue[i].state = 'finished';
              if (queue[i].callback) {
                queue[i].callback();
                queue = [];
              }
              _this.startQueue(queue);
            });
          }
        }
      };

      for (var i = 0; i < queue.length; i++) {
        _loop(i);
      }
    }
  }, {
    key: 'create',
    value: function create(options) {
      return new Loader(options);
    }
  }, {
    key: 'preload',
    value: function preload(options) {
      if (!isClient) return;

      options = extend({
        urlFormat: this.options.urlFormat,
        onComplete: this.options.onComplete
      }, options);

      var loadType = ['js', 'css', 'image', 'audio', 'video'];
      var queue = [];
      loadType.forEach(function (item, i) {

        if (!options[item]) return;

        if (Array.isArray(options[item])) {
          options[item].map(function (u) {
            queue.push({
              url: options.urlFormat(u, item),
              type: item
            });
          });
        } else {
          queue.push({
            url: options.urlFormat(options[item], item),
            type: item
          });
        }
      });
      queue[queue.length - 1].callback = options.onComplete;
      this.startQueue(queue);
      return this;
    }
  }, {
    key: 'load',
    value: function load(type, src, cb) {
      var options = {
        onComplete: cb
      };
      options[type] = src;
      return this.preload(options);
    }
  }, {
    key: 'js',
    value: function js(src, cb) {
      return this.load('js', src, cb);
    }
  }, {
    key: 'css',
    value: function css(src, cb) {
      return this.load('css', src, cb);
    }
  }, {
    key: 'image',
    value: function image(src, cb) {
      return this.load('image', src, cb);
    }
  }, {
    key: 'audio',
    value: function audio(src, cb) {
      return this.load('audio', src, cb);
    }
  }, {
    key: 'video',
    value: function video(src, cb) {
      return this.load('video', src, cb);
    }
  }]);
  return Loader;
}();

module.exports = new Loader({
  urlFormat: function urlFormat(url, type) {
    return url;
  },
  onComplete: function onComplete() {},
  maxConnection: 4
});