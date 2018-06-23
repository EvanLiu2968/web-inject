'use strict';

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var md5 = require('blueimp-md5');
var Loader = require('./BaseLoader');

var CSSLoader = function (_Loader) {
  (0, _inherits3.default)(CSSLoader, _Loader);

  function CSSLoader() {
    (0, _classCallCheck3.default)(this, CSSLoader);
    return (0, _possibleConstructorReturn3.default)(this, (CSSLoader.__proto__ || (0, _getPrototypeOf2.default)(CSSLoader)).call(this));
  }

  (0, _createClass3.default)(CSSLoader, [{
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