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

var Loader = require('./BaseLoader');

var JSLoader = function (_Loader) {
  (0, _inherits3.default)(JSLoader, _Loader);

  function JSLoader() {
    (0, _classCallCheck3.default)(this, JSLoader);
    return (0, _possibleConstructorReturn3.default)(this, (JSLoader.__proto__ || (0, _getPrototypeOf2.default)(JSLoader)).call(this));
  }

  (0, _createClass3.default)(JSLoader, [{
    key: 'createRemoteJS',
    value: function createRemoteJS(src, cb) {
      var self = this;
      var tag = document.createElement('script');
      tag.setAttribute("type", 'text/javascript');
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
    value: function createInnerJS(jsCode, cb) {
      var tag = document.createElement('script');
      tag.setAttribute("type", 'text/javascript');

      tag.appendChild(document.createTextNode(jsCode));

      this.appendToHead(tag);

      this.asyncCallback(cb);
    }
  }, {
    key: 'load',
    value: function load(src, cb) {
      if (!src) return;
      if (src.indexOf('http') == 0 || src.indexOf('/') == 0) {
        this.createRemoteJS(src, cb);
      } else {
        this.createInnerJS(src, cb);
      }
    }
  }]);
  return JSLoader;
}(Loader);

module.exports = new JSLoader();