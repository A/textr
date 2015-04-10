# Textr

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coveralls Status][coveralls-image]][coveralls-url]
[![Dependency Status][depstat-image]][depstat-url]
[![DevDependency Status][depstat-dev-image]][depstat-dev-url]

> Tiny and extendable text transforming framework

Superslim text transforming framework. With `textr` you can easy
to create modular typographers with your very own text transformation logic
to use it on many cases like just fix quotes or even convert your text
rom markdown to html.

## Install

```
npm install --save textr
```

## Usage

```js
var textr      = require('textr');
var quotes     = require('typographic-quotes');
var ellipses   = require('typographic-ellipses');
var spaces     = require('typographic-single-spaces');

// Create new text transformer
tf = textr()
  // and register your plugins
  .use(ellipses)
  .use(spaces)
  // you can wrap function to partial apply their options
  .use(function (text) { return quotes(text, 'ru' ); })
;


// then just send some text to the transformer
tf('Hello "world"...'); // Hello “world”…
```

## Transformation plugins

You can easily to create the new one' cause each plugin is just a function
that get text, transform it and return new. For example this is the source
of the `ellipses` func:

```js
module.exports = function(input) {
  return input.replace(/\.{3}/gim, '…');
}
```

## List of the transforms to use

- [matmuchrapna/typographic-quotes](https://github.com/matmuchrapna/typographic-quotes)
- [matmuchrapna/typographic-registered-trademark](https://github.com/matmuchrapna/typographic-registered-trademark)
- [matmuchrapna/typographic-trademark](https://github.com/matmuchrapna/typographic-trademark)
- [matmuchrapna/typographic-copyright](https://github.com/matmuchrapna/typographic-copyright)
- [matmuchrapna/typographic-em-dashes](https://github.com/matmuchrapna/typographic-em-dashes)
- [matmuchrapna/typographic-en-dashes](https://github.com/matmuchrapna/typographic-en-dashes)
- [matmuchrapna/typographic-single-spaces](https://github.com/matmuchrapna/typographic-single-spaces)
- [matmuchrapna/typographic-ellipses](https://github.com/matmuchrapna/typographic-ellipses)
- [matmuchrapna/typographic-apostrophes-for-possessive-plurals](https://github.com/matmuchrapna/typographic-apostrophes-for-possessive-plurals)
- [matmuchrapna/typographic-apostrophes](https://github.com/matmuchrapna/typographic-apostrophes)

## License

MIT © [Shuvalov Anton](http://shuvalov.info)


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
