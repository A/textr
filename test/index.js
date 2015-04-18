/* global describe, it, before, navigator */

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

    it('should process text', function() {
      var tf = textr();
      tf.should.be.a.Function;
      tf.should.have.property('exec');
      tf.exec.should.be.a.Function;
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

    it('should use itself as transform', function() {
      var one = textr()
        .use(capitalize)
      ;
      var two = textr()
        .use(headline(1))
      ;
      var tf = textr()
        .use(one, two)
        .exec('hello world')
        .should.be.equal('<h1>Hello World</h1>')
      ;
    });

    it('should support string.prototype methods', function() {
      var tf = textr()
        .use(String.prototype.trim)
      ;
      tf('text\t\n').should.be.equal('text');
    });

  });

  describe('exec', function() {

    it('should apply transformers to given text', function() {
      textr()
        .use(capitalize)
        .exec('hello world')
        .should.be.equal('Hello World')
      ;
    });

    it('should apply transformers with order of registration', function() {
      textr()
        .use(capitalize)
        .use(headline(1))
        .exec('hello world')
        .should.be.equal('<h1>Hello World</h1>')
      ;
    });

    it('should not miss text if on of the middlewares return falsy', function() {
      textr()
        .use(function (text, ctx) {
          // define mw that not transforming text;
          if ('undefined' === typeof navigator) { return; }
          ctx.locale = navigator.locale;
        })
        .exec('some text')
        .should.be.equal('some text')
      ;
    });

    it('should support options to correct recursive usage', function() {
      var pluginWithDefaultOptions = textr({ locale: 'ru', ownprop: true })
        .use(function(text, options) {
          options.locale.should.be.equal('en-us');
          options.direction.should.be.equal('ltr');
          options.ownprop.should.be.equal(true);
          options.other.should.be.equal('redefine');
        })
      ;
      var tf = textr({ locale: 'en-us', direction: 'ltr', other: 'param' })
        .use(pluginWithDefaultOptions)
        .exec('text', { other: 'redefine' })
      ;
    });
  });

  describe('options', function() {
    it('should pass options through each middleware', function() {
      textr({ locale: 'ru' })
        .use(function(text, opts) {
          return text + opts.locale;
        })
        .exec('locale: ')
        .should.be.equal('locale: ru')
      ;
    });
  });


});
