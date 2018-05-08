'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var md5 = require('blueimp-md5');
var Loader = require('./BaseLoader');

var CSSLoader = function (_Loader) {
  _inherits(CSSLoader, _Loader);

  function CSSLoader() {
    _classCallCheck(this, CSSLoader);

    return _possibleConstructorReturn(this, (CSSLoader.__proto__ || Object.getPrototypeOf(CSSLoader)).call(this));
  }

  _createClass(CSSLoader, [{
    key: 'createRemoteCSS',
    value: function createRemoteCSS(id, src, cb) {
      if (document.getElementById(id)) return;

      var self = this;
      var tag = document.createElement('link');
      tag.onload = tag.onreadystatechange = function () {
        if (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete') {
          self.asyncCallback(cb);
        }
      };

      if (src.lastIndexOf('.css') == -1) src += '.css';
      tag.setAttribute("rel", 'stylesheet');
      tag.setAttribute("href", src);
      tag.setAttribute("id", id);

      this.appendToHead(tag);
    }
  }, {
    key: 'createInnerCSS',
    value: function createInnerCSS(id, cssCode, cb) {
      if (document.getElementById(id)) return;

      var tag = document.createElement('style');
      tag.setAttribute("rel", "stylesheet");
      tag.setAttribute("type", "text/css");
      tag.setAttribute("id", id);

      this.appendToHead(tag);

      var media = tag.getAttribute("media");
      if (media != null && !/screen/.test(media.toLowerCase())) {
        tag.setAttribute("media", "screen");
      }
      if (tag.styleSheet) {
        tag.styleSheet.cssText += cssCode;
      } else if (document.getBoxObjectFor) {
        tag.innerHTML += cssCode;
      } else {
        tag.appendChild(document.createTextNode(cssCode));
      }
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
            this.createRemoteCSS($id, src, cb);
          } else {
            this.createInnerCSS($id, src, cb);
          }
        }
      } else {
        this.asyncCallback(cb);
      }
    }
  }]);

  return CSSLoader;
}(Loader);

module.exports = new CSSLoader();