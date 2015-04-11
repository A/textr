/* global describe, it, before */

'use strict';

var textr      = require('..');
var should     = require('should');
var noop       = require('./support').noop;
var capitalize = require('./support').capitalize;
var headline   = require('./support').headline;

describe('textr', function() {

  describe('api', function() {

    it('should register transformers', function() {
      var tf = textr();
      tf.should.have.property('use');
      tf.use.should.be.a.Function;
    });

    it('should parse text', function() {
      var tf = textr();
      tf.should.be.a.Function;
      tf.should.have.property('parse');
      tf.parse.should.be.a.Function;
      tf('hello').should.be.equal('hello');
    });

  });

  describe('use', function() {

    it('should return transformer', function() {
      var tf = textr().use(noop);
      tf.should.be.a.Function;
      tf.use.should.be.a.Function;
    });

    it('should use plugins', function() {
      textr()
        .use(noop, noop)
        .use(noop)
        .mws.should.has.length(3)
      ;
    });

  });

  describe('parse', function() {

    it('should apply transformers to given text', function() {
      textr()
        .use(capitalize)
        .parse('hello world')
        .should.be.equal('Hello World')
      ;
    });

    it('should apply transformers with order of registration', function() {
      textr()
        .use(capitalize)
        .use(headline(1))
        .parse('hello world')
        .should.be.equal('<h1>Hello World</h1>')
      ;
    });

  });

});
