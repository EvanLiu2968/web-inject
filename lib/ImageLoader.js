'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Loader = require('./BaseLoader');

var ImageLoader = function (_Loader) {
  _inherits(ImageLoader, _Loader);

  function ImageLoader() {
    _classCallCheck(this, ImageLoader);

    return _possibleConstructorReturn(this, (ImageLoader.__proto__ || Object.getPrototypeOf(ImageLoader)).call(this));
  }

  _createClass(ImageLoader, [{
    key: 'createRemoteImage',
    value: function createRemoteImage(src, cb) {
      var tag = document.createElement('img');
      tag.src = src;
      if (tag.complete) {
        cb(tag);
      } else {
        tag.onload = function () {
          cb(tag);
        };

        tag.onerror = function (e) {
          cb(tag);
        };
      }
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