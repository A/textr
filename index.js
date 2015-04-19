'use strict';

/**
 * Create new transform function
 *
 * @constructor
 * @return {object:{exec:fn,use:fn}}
 * @return {fn:exec}
 * @api public
 */
module.exports = function textr(defaults) {

  /**
   * list of registred middlewares
   * @api public
   */
  var mws = [];

  /**
   * Default options will be passed to either of the middlewares as second param.
   * You can redefine props by passing your options to `tf.exec()` as second arg.
   * @api private
   */
  defaults = defaults || {};

  /**
   * expose public interface of the textr
   *
   * @example
   *
   *      // functional style
   *      text = textr()
   *        // register plugins
   *        .use(quotes)
   *        .use(capitalize)
   *        .exec(text)
   *
   *      // save transformer to reuse
   *      tf = textr()
   *        // register plugins
   *        .use(quotes, elipses, capitalize)
   *      ;
   *      return ['Hello', 'world'].map(tf);
   *
   * @constructor
   * @alias exec
   */
  function api() {
    return exec.apply(null, arguments);
  }

  /**
   * Expose `exec`, `use` and `mws` as properties
   * of the `api`
   *
   * @alias exec
   * @alias use
   * @alias mws
   */
  api.exec = exec;
  api.use = use;
  api.mws = mws;

  return api;

  /**
   * process given text by the middlewares
   * @param {string} text
   * @param {Object} options Options to merge with defaults
   * @return {string} text
   * @api public
   */
  function exec(text, options) {
    options = clone(defaults, options);
    var l = mws.length;
    for (var i = 0; i < l; i++) {
      text = mws[i].apply(text, [text, options]) || text;
    }
    return text;
  }

  /**
   * Register either middleware and array of middlewares
   * @param {...fn} ...middlewares
   * @return {api}
   * @api public
   */
  function use() {
    [].push.apply(mws, arguments);
    return api;
  }

};

/**
 * merge given objects to new one. Returns clone
 * @param {Object} ...objects Objects to clone into the one new
 * @return {Object}
 */
function clone() {
  var res = {};
  var length = arguments.length;
  for (var i = 0; i < length; i++) {
    var obj = arguments[i];
    for (var k in obj) { res[k] = obj[k]; }
  }
  return res;
}
