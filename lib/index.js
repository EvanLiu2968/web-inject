'use strict';

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isClient = typeof window != 'undefined';

var finishedTask = {};

var Loader = function () {
  function Loader(options) {
    (0, _classCallCheck3.default)(this, Loader);

    this.options = (0, _assign2.default)({
      serial: false,
      urlFormat: function urlFormat(url, type) {
        return url;
      },
      onComplete: function onComplete() {},
      maxConnection: 4
    }, options);
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
    key: 'getFinishedTask',
    value: function getFinishedTask() {
      return finishedTask;
    }
  }, {
    key: 'isFinishedTask',
    value: function isFinishedTask(url) {
      return !!finishedTask[url];
    }
  }, {
    key: 'addFinishedTask',
    value: function addFinishedTask(url) {
      if (!this.isFinishedTask(url)) {
        finishedTask[url] = {
          state: 'finished'
        };
      }
    }
  }, {
    key: 'startQueue',
    value: function startQueue(queue, options) {
      var _this = this;

      if (options.serial) {
        options.currentTask = options.currentTask || 0;
        if (options.currentTask < queue.length) {
          var task = queue[options.currentTask];
          var callback = function callback() {
            options.currentTask++;
            if (task.callback) {
              task.callback();
              queue = [];
              return;
            }
            _this.startQueue(queue, options);
          };
          if (this.isFinishedTask(task.url)) {
            callback();
          } else {
            var loader = this.Loader[task.type];
            loader.load(task.url, function () {
              _this.addFinishedTask(task.url);
              callback();
            });
          }
        }
        return;
      }

      var _loop = function _loop(i) {
        if (_this.taskCount < options.maxConnection) {
          if (!queue[i].state) {
            var _task = queue[i];
            var _callback = function _callback() {
              _this.taskCount--;
              queue[i].state = 'finished';
              if (_task.callback) {
                _task.callback();
                queue = [];
                return;
              }
              _this.startQueue(queue, options);
            };
            _this.taskCount++;
            queue[i].state = 'loading';
            if (_this.isFinishedTask(_task.url)) {
              _callback();
            } else {
              var _loader = _this.Loader[_task.type];
              _loader.load(_task.url, function () {
                _this.addFinishedTask(_task.url);
                _callback();
              });
            }
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

      options = (0, _assign2.default)({}, this.options, options);

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
      this.startQueue(queue, options);
      return this;
    }
  }, {
    key: 'load',
    value: function load(type, src, cb) {
      var options = {
        onComplete: cb
      };
      if (type === 'js') {
        options.serial = true;
      }
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

module.exports = new Loader();