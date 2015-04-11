'use strict';

/**
 * Convert text to capitalized string
 * @param {String} text
 * @return {String}
 */
exports.capitalize = function(text) {
  return text.replace(/\b(.{1})/g, function (l) {
    return l.toUpperCase();
  });
};

/**
 * Wrap text by html headline with given level
 * @param {Number} level
 * @return {Function}
 */
exports.headline = function(level) {
  return function(text) {
    return '<h' + level + '>' + text + '</h' + level + '>';
  };
};

/**
 * noop function
 */
exports.noop = function() {};
