'use strict';

var Plugins = require('node-middlewares');

exports = module.exports = typograph;

var plugins = new Plugins();

function typograph(text, cb) {
  if ('string' === typeof text) {
    return typograph.parse(text, cb);
  } else if ('function' === typeof text) {
    return typograph.use(text);
  }
}

/**
 * @param {Fn} plugin `fn(ctx.text, next)`
 * @return {Obj} this - chainable
 */
typograph.use = function(plugin) {
  plugins.use(plugin);
  return typograph;
};

typograph.parse = function(text, cb) {
  plugins.dispatch({ text: text }, function(err, ctx) {
    console.log(ctx);
    return cb(ctx.text);
  });
};
