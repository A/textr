/* global describe, it, before */

'use strict';

var processor = require('..')();
var assert    = require('assert');
var quotes    = require('typographic-quotes');
var ellipses  = require('typographic-ellipses');
var spaces    = require('typographic-single-spaces');

describe('typo', function() {
  before(function() {
    processor
      .use(function (text) { return quotes(text, 'ru'); })
      .use(ellipses)
      .use(spaces)
    ;
  });
  it('should correct the quotes', function() {
    var input  = 'hello "world"';
    var output = 'hello «world»';
    assert(processor(input) === output);
  });
  it('should correct ellipses', function() {
    var input  = 'omg...';
    var output = 'omg…';
    assert(processor(input) === output);
  });
  it('should remove extra spaces', function() {
    var input  = 'extra       spaces';
    var output = 'extra spaces';
    assert(processor(input) === output);
  });
});
