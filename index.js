'use strict';


/**
 * Create new transform function
 *
 * @constructor
 * @return {object:{exec:fn,use:fn}}
 * @return {fn:exec}
 * @api public
 */
module.exports = function textr(options) {

  /**
   * list of registred middlewares
   * @api public
   */
  var mws = [];

  /**
   * Options will be passed to either of the middlewares as second param.
   * @api private
   */
  options = options || {};

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
   * @return {string} text
   * @api public
   */
  function exec(text) {
    return mws.reduce(function(text, mw) {
      return mw(text, options);
    }, text);
  }

  /**
   * Register either middleware and array of middlewares
   * @param {...fn} ...middlewares
   * @return {api}
   * @api public
   */
  function use() {
    Array.prototype.push.apply(mws, arguments);
    return api;
  }

};
