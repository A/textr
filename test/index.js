/* global describe, it, before */

'use strict';

var typo   = require('..');
var assert = require('assert');
var quotes = require('../plugins/quotes');

describe('typo', function() {
  before(function() {
    typo.use(quotes({ locale: 'ru' }));
  });
  it('should correct the quotes', function() {
    typo('hello "world"', function(text) {
      assert(text === 'hello «world»');
    });
  });
});
