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

var AudioLoader = function (_Loader) {
  (0, _inherits3.default)(AudioLoader, _Loader);

  function AudioLoader() {
    (0, _classCallCheck3.default)(this, AudioLoader);
    return (0, _possibleConstructorReturn3.default)(this, (AudioLoader.__proto__ || (0, _getPrototypeOf2.default)(AudioLoader)).call(this));
  }

  (0, _createClass3.default)(AudioLoader, [{
    key: 'createRemoteAudio',
    value: function createRemoteAudio(src, cb) {
      var tag = document.createElement('audio');
      tag.autoplay = false;

      tag.src = src;
      this.subscribeMedia(tag, cb);
    }
  }, {
    key: 'load',
    value: function load(src, cb) {
      this.createRemoteAudio(src, cb);
    }
  }]);
  return AudioLoader;
}(Loader);

module.exports = new AudioLoader();