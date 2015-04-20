# textr

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coveralls Status][coveralls-image]][coveralls-url]
[![Dependency Status][depstat-image]][depstat-url]
[![DevDependency Status][depstat-dev-image]][depstat-dev-url]

> Textr is simple framework to compose text transformation functions

Textr is good instrument to create modular tools to [make your typography better][bad-habits].
It can compose any functions that get text, transform it and return result of
processing. For example, check out few: [typographic-quotes][typographic-quotes],
[typographic-math-symbols][typographic-math-symbols],
[typographic-em-dashes][typographic-em-dashes] and [typographic-ellipses][typographic-ellipses].

Plugins are available on npm, labelled with [textr][textr-npm]
keyword. Also you can easily create new one. Don’t be scared.

## Idea behind textr

Typography for everybody! At the same time it’s impossible to create one ideal
typographic engine. It doesn’t work this way. What we can do with it? We can
easily create and maintain small, simple, full-tested and single responsible
modules. After this we can compose bunch of these well done modules for every
specific situation we need, and everybody will be happy with it’s
own ideal text transformer.

## Install

```
npm install --save textr
```


## Usage

```js
var textr    = require('textr');
var ellipses = require('typographic-ellipses');
var spaces   = require('typographic-single-spaces');
var quotes  = require('typographic-quotes');

// Create new text transformer by compose yours
tf = textr({ locale: 'ru'})
  .use(ellipses)
  .use(spaces)
  .use(quotes)
  .use(String.prototype.trim)
;

// then just send some text to the transformer
tf('Hello  "world"...\n'); // Hello «world»…
```

## API

### textr(defaults)

Create new textr transform function (`tf`). You can pass default options when
create new transform stack.


### tf.use(...fn)

Register transform function as `tf` middleware.

### tf.exec(text, options)

Process given text by the middlewares.

### tf(text)

Identical to `tf.exec(text)`. This alias makes `tf` just regular transform
function, that you can register as middleware for `textr` as well.

```js
var typorgapher = textr().use(typography, tools, here)
var autocorrector = textr().use(autocorrection, things)
var smiles = textr().use(text, to, smiles, goodies)

var tf = textr()
  .use(typographer)
  .use(autocorrector)
  .use(smiles)
;

tf(text); // oh, that's awesome!11

```


## Plugins API

Each plugin will be called with 2 arguments: `text` and `options`
setted on `textr()`.

```
function plugin(text, options) {
  console.log(options); // { locale: 'ru' }
  return text;
}
```

To support `String.prototype` methods as transformation functions, `this` value
is equal to the `text`.


## License

[textr-npm]: https://www.npmjs.com/browse/keyword/textr

MIT © [Shuvalov Anton](http://shuvalov.info), [Vladimir Starkov](http://github.com/matmuchrapna)

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
[typographic-math-symbols]: https://github.com/matmuchrapna/typographic-math-symbols
[typographic-em-dashes]: https://github.com/matmuchrapna/typographic-em-dashes
[typographic-ellipses]: https://github.com/matmuchrapna/typographic-ellipses
