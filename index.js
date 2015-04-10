'use strict';

module.exports = function processor() {
  var mws = [];
  function parse(text) {
    return mws.reduce(function(text, mw) {
      return mw(text);
    }, text)
  }
  parse.use = function(mw) {
    mws.push(mw);
    return parse;
  }
  return parse;
}
