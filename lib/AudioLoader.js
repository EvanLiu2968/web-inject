'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Loader = require('./BaseLoader');

var AudioLoader = function (_Loader) {
  _inherits(AudioLoader, _Loader);

  function AudioLoader() {
    _classCallCheck(this, AudioLoader);

    return _possibleConstructorReturn(this, (AudioLoader.__proto__ || Object.getPrototypeOf(AudioLoader)).call(this));
  }

  _createClass(AudioLoader, [{
    key: 'createRemoteAudio',
    value: function createRemoteAudio(src, cb) {
      var tag = document.createElement('audio');
      tag.autoplay = false;

      tag.preload = "none";
      tag.src = src;
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