"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function () {
  var mws = [];
  var parse = function parse(text) {
    return mws.reduce(function (text, mw) {
      return mw(text);
    }, text);
  };
  parse.use = function (mw) {
    mws.push(mw);
    return parse;
  };
  return parse;
};

module.exports = exports["default"];

