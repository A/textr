'use strict';


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
   *        .parse(text)
   *
   *      // save transformer to reuse
   *      tf = textr()
   *        // register plugins
   *        .use(quotes, elipses, capitalize)
   *      ;
   *      return ['Hello', 'world'].map(tf);
   *
   * @constructor
   * @alias parse
   * @return {object:{parse:fn,use:fn}}
   * @return {fn:parse}
   * @api public
   */
  function api() {
    return parse.apply(null, arguments);
  }

  /**
   * Expose `parse`, `use` and `mws` as properties
   * of the `api`
   */
  api.parse = parse;
  api.use = use;
  api.mws = mws;

  return api;

  /**
   * Parse given text by the middlewares
   * @param {string} text
   * @return {string} text
   * @api public
   */
  function parse(text) {
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
