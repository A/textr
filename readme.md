# textr

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coveralls Status][coveralls-image]][coveralls-url]
[![Dependency Status][depstat-image]][depstat-url]
[![DevDependency Status][depstat-dev-image]][depstat-dev-url]

> Textr is simple framework to compose text transformation functions.

Textr is good instrument to create modular tools to [make your typography better][bad-habits].

Textr can compose any functions that get text, transform it and return result of
processing just like unix pipes. For example, check out few: [`typographic-quotes`][typographic-quotes],
[typographic-math-symbols][https://github.com/matmuchrapna/typographic-math-symbols],
[typographic-em-dashes][typographic-em-dashes] and [typographic-ellipses][typographic-ellipses].

All `textr` plugins are available on npm, labelled with [textr][textr-npm]
keyword.

Also you can easily create new one. Don’t be scared.


## Install

```
npm install --save textr
```


## Usage

```js
var textr    = require('textr');
var ellipses = require('typographic-ellipses');
var spaces   = require('typographic-single-spaces');
var _quotes  = require('typographic-quotes');

// Create new text transformer by compose yours
tf = textr()
  .use(ellipses)
  .use(spaces)
  .use(quotes({ locale: 'ru' }))
;

// then just send some text to the transformer
tf('Hello "world"...'); // Hello “world”…


// If some function is expected for other options besides the text
// then you can write simple wrapper to set them:
function quotes(opts) {
  return function(input) {
    return _quotes(input, opts && opts.locale);
  }
}
```


## License

[textr-npm]: https://www.npmjs.com/browse/keyword/textr

MIT © [Shuvalov Anton](http://shuvalov.info)

[bad-habits]: http://practicaltypography.com/typewriter-habits.html

[npm-url]: https://npmjs.org/package/textr
[npm-image]: http://img.shields.io/npm/v/textr.svg

[travis-url]: https://travis-ci.org/shuvalov-anton/textr
[travis-image]: http://img.shields.io/travis/shuvalov-anton/textr.svg

[coveralls-url]: https://coveralls.io/r/shuvalov-anton/textr
[coveralls-image]: http://img.shields.io/coveralls/shuvalov-anton/textr.svg

[depstat-url]: https://david-dm.org/shuvalov-anton/textr
[depstat-image]: https://david-dm.org/shuvalov-anton/textr.svg

[depstat-dev-url]: https://david-dm.org/shuvalov-anton/textr
[depstat-dev-image]: https://david-dm.org/shuvalov-anton/textr/dev-status.svg

[typographic-quotes]: https://github.com/matmuchrapna/typographic-quotes
[typographic-em-dashes]: https://github.com/matmuchrapna/typographic-em-dashes
[typographic-ellipses]: https://github.com/matmuchrapna/typographic-ellipses
