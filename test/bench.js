#!/usr/bin/env node

'use strict';

// dependencies
var textr   = require('../');
var program = require('commander');
var pkg     = require('../package');

/**
 * Simple benchmark which can be used as CLI in the future.
 *
 * @example
 *
 *      $ echo 'hello     "world"' > test
 *      $ cat test | bench.js -t typographic-single-spaces,typographic-quotes
 *
 *      hello "world"
 *      1654434 cycles per second%
 *
 *
 *
 */
program
  .version(pkg.version)
  .option('-c, --cycles', 'create new tf on every cycle')
  .option('-t, --transforms [modules]', 'add transform functions to the bench')
;

program.parse(process.argv);

var tfs = [];
if (program.transforms) {
  tfs = program.transforms
    .split(',')
    .map(function(tf) {
      return require(tf);
    });
}

var buf = '';

process.stdin.setEncoding('utf8');
process.stdin.on('data', function(chunk) {
  buf += chunk;
});
process.stdin.on('end', bench);


function bench() {
  var res;
  var startedAt = +new Date();
  var endedAt = startedAt + 1000;
  var i = 0;
  var tf;
  if (!program.cycles) { tf = textr().use.apply(null, tfs); }
  do {
    if (program.cycles) { tf = textr().use.apply(null, tfs); }
    res = tf(buf);
    i++;
  } while (+new Date() < endedAt);
  process.stdout.write(res);
  process.stdout.write('\r\n');
  process.stdout.write(i + ' cycles per second');
}
