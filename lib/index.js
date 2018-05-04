'use strict';

var injectBuilder = reuqire('./injector');

var injectInstance = null;

if (!injectInstance) {
  injectInstance = new injectBuilder();
}

module.exports = injectInstance;