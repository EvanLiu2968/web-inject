'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
  function Loader() {
    _classCallCheck(this, Loader);

    this.appendToHead.bind(this);
    this.appendToBody.bind(this);
  }

  _createClass(Loader, [{
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