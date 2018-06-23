'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function () {
  function Loader() {
    (0, _classCallCheck3.default)(this, Loader);

    this.appendToHead.bind(this);
    this.appendToBody.bind(this);
  }

  (0, _createClass3.default)(Loader, [{
    key: 'asyncCallback',
    value: function asyncCallback(cb) {
      setTimeout(function () {
        typeof cb == 'function' ? cb() : '';
      }, 100);
    }
  }, {
    key: 'appendToHead',
    value: function appendToHead(el) {
      this.getHead().appendChild(el);
    }
  }, {
    key: 'appendToBody',
    value: function appendToBody(el) {
      if (this.container == null) {
        this.container = document.createElement("div");
        this.container.id = "preload-container";
        var style = this.container.style;
        style.visibility = "hidden";
        style.position = "absolute";
        style.width = this.container.style.height = "10px";
        style.overflow = "hidden";
        style.transform = style.msTransform = style.webkitTransform = style.oTransform = "translate(-10px, -10px)";
        this.getBody().appendChild(this.container);
      }
      this.container.appendChild(el);
    }
  }, {
    key: 'getHead',
    value: function getHead() {
      return document.head || document.getElementsByTagName("head")[0];
    }
  }, {
    key: 'getBody',
    value: function getBody() {
      return document.body || document.getElementsByTagName("body")[0];
    }
  }, {
    key: 'removeChild',
    value: function removeChild(el) {
      if (el.parent) {
        el.parent.removeChild(el);
      }
    }
  }, {
    key: 'subscribeMedia',
    value: function subscribeMedia(el, cb) {
      if (el.complete) {
        cb();
      } else {
        el.onload = function () {
          cb();
        };

        el.onerror = function (e) {
          cb();
        };
      }
    }
  }, {
    key: 'isImageTag',
    value: function isImageTag(item) {
      return item instanceof HTMLImageElement;
    }
  }, {
    key: 'isAudioTag',
    value: function isAudioTag(item) {
      if (window.HTMLAudioElement) {
        return item instanceof HTMLAudioElement;
      } else {
        return false;
      }
    }
  }, {
    key: 'isVideoTag',
    value: function isVideoTag(item) {
      if (window.HTMLVideoElement) {
        return item instanceof HTMLVideoElement;
      } else {
        return false;
      }
    }
  }]);
  return Loader;
}();