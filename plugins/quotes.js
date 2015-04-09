'use strict';

var quotes = require('typographic-quotes');

module.exports = function(options) {
  options = options || {};
  var locale = options.locale;
  return function(ctx, next) {
    console.log(ctx.text);
    ctx.text = quotes(ctx.text, locale);
    console.log(ctx.text);
    next();
  };
};
