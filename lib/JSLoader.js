'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var md5 = require('blueimp-md5');
var Loader = require('./BaseLoader');

var JSLoader = function (_Loader) {
  _inherits(JSLoader, _Loader);

  function JSLoader() {
    _classCallCheck(this, JSLoader);

    return _possibleConstructorReturn(this, (JSLoader.__proto__ || Object.getPrototypeOf(JSLoader)).call(this));
  }

  _createClass(JSLoader, [{
    key: 'createRemoteJS',
    value: function createRemoteJS(id, src, cb) {
      if (document.getElementById(id)) return;

      var self = this;
      var tag = document.createElement('script');
      tag.setAttribute("type", 'text/javascript');
      tag.setAttribute("id", id);
      tag.setAttribute("src", src);

      tag.onload = tag.onreadystatechange = function () {
        if (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete') {
          self.asyncCallback(cb);
        }
      };

      this.appendToHead(tag);
    }
  }, {
    key: 'createInnerJS',
    value: function createInnerJS(id, jsCode, cb) {
      if (document.getElementById(id)) return;

      var tag = document.createElement('script');
      tag.setAttribute("type", 'text/javascript');
      tag.setAttribute("id", id);

      tag.appendChild(document.createTextNode(jsCode));

      this.appendToHead(tag);

      this.asyncCallback(cb);
    }
  }, {
    key: 'load',
    value: function load(src, cb) {
      if (src) {
        var $id = md5(src).slice(22);
        var $el = document.getElementById($id);
        if ($el) {
          this.asyncCallback(cb);
        } else {
          if (src.indexOf('http') == 0 || src.indexOf('/') == 0) {
            this.createRemoteJS($id, src, cb);
          } else {
            this.reateInnerJS($id, src, cb);
          }
        }
      } else {
        this.asyncCallback(cb);
      }
    }
  }]);

  return JSLoader;
}(Loader);

module.exports = new JSLoader();