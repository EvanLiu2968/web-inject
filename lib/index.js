'use strict';

var injectBuilder = require('./injector');

var injectInstance = null;

if (!injectInstance) {
  injectInstance = new injectBuilder();
}

module.exports = injectInstance;