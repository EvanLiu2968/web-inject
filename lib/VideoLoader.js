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

var VideoLoader = function (_Loader) {
  (0, _inherits3.default)(VideoLoader, _Loader);

  function VideoLoader() {
    (0, _classCallCheck3.default)(this, VideoLoader);
    return (0, _possibleConstructorReturn3.default)(this, (VideoLoader.__proto__ || (0, _getPrototypeOf2.default)(VideoLoader)).call(this));
  }

  (0, _createClass3.default)(VideoLoader, [{
    key: 'createRemoteVideo',
    value: function createRemoteVideo(src, cb) {
      var tag = document.createElement('video');
      tag.autoplay = false;

      tag.src = src;
      this.subscribeMedia(tag, cb);
    }
  }, {
    key: 'load',
    value: function load(src, cb) {
      this.createRemoteVideo(src, cb);
    }
  }]);
  return VideoLoader;
}(Loader);

module.exports = new VideoLoader();