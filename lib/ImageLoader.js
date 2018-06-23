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

var ImageLoader = function (_Loader) {
  (0, _inherits3.default)(ImageLoader, _Loader);

  function ImageLoader() {
    (0, _classCallCheck3.default)(this, ImageLoader);
    return (0, _possibleConstructorReturn3.default)(this, (ImageLoader.__proto__ || (0, _getPrototypeOf2.default)(ImageLoader)).call(this));
  }

  (0, _createClass3.default)(ImageLoader, [{
    key: 'createRemoteImage',
    value: function createRemoteImage(src, cb) {
      var tag = document.createElement('img');
      tag.src = src;
      this.subscribeMedia(tag, cb);
    }
  }, {
    key: 'load',
    value: function load(src, cb) {
      this.createRemoteImage(src, cb);
    }
  }]);
  return ImageLoader;
}(Loader);

module.exports = new ImageLoader();