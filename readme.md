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

## CLI

Also, there is a [CLI package][cli] for running Textr under your terminal. You can install it typing:

```
npm install --global textr-cli
```

After installation, you can process files using `textr`-command, like this:

```sh
# load from file, transformers required through few -t flags
$ textr foo.md -t typographic-quotes -t typographic-quotes

# load from file, transformers required through one -t
$ textr foo.md -t typographic-single-spaces,typographic-quotes

# load through stdin, iso-locale equals ru, transformers using --transforms
$ cat foo.md | textr -l ru --transforms=typographic-single-spaces

# load through stdin, write result into file
$ cat foo.md | textr -o bar.md
```

Take a look for more [usage examples][examples] and [CLI options][options].

[cli]: https://github.com/denysdovhan/textr-cli
[examples]: https://github.com/denysdovhan/textr-cli#usage
[options]: https://github.com/denysdovhan/textr-cli#options

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

There are plugins for [PostHTML](https://www.npmjs.com/package/posthtml-textr)

## Few words for plugin creators

:+1::tada: First off, you are awesome and thanks for taking the time
to contribute! :tada::+1:

### Testability

As far as we want to go beyond monolythic typographic engines, then
we (as ecosystem) need to have small atomic 100% covered with tests plugins.
That’s why please have `index.js` and `test.js` in the repository
and `.travis.yml` to validate pull-requests. Badges about npm version,
passing tests and tests coverage are optionable, but preferred.

Give a chance to [npm scripts][npmscripts] as cross-platform tool
for automatization.

### README

Everyone will read README, and only ones—sources. Please include in your readme
file following sections: package name, description, installation instructions,
usage section with spec from tests and license note. License note is important
for enterprise users. We want to create ecosystem, so it’s reasonable to have
a link to textr in README’s plugins, good place for it is in the top,
maybe in the short description.

[npmscripts]: https://docs.npmjs.com/misc/scripts

### 'locale' option consistence

tl;dr: Use [ISO 639][ISO] and rely on locale codes like these: `en-uk`,
`en-us`, `zh-Hans`, `ru`, `da`, `sv`—regular values for `lang` attribute.

Typography is locale dependent by it’s nature, that’s why `locale` option
is most usable option and this is a good reason to be consistent about. We looked
around and found that [ISO 639 standard][ISO] is very well fits us, the fact that
it was chosen by w3c for defining lang attribute assure us to use this
unification.

[ISO]: http://www.wikiwand.com/en/List_of_ISO_639-1_codes

## License

[textr-npm]: https://www.npmjs.com/browse/keyword/textr

MIT © [Shuvalov Anton](http://shuvalov.info), [Vladimir Starkov](https://iamstarkov.com)

[bad-habits]: http://practicaltypography.com/typewriter-habits.html

[npm-url]: https://npmjs.org/package/textr
[npm-image]: https://img.shields.io/npm/v/textr.svg

[travis-url]: https://travis-ci.org/shuvalov-anton/textr
[travis-image]: https://img.shields.io/travis/shuvalov-anton/textr.svg

[coveralls-url]: https://coveralls.io/r/shuvalov-anton/textr
[coveralls-image]: https://img.shields.io/coveralls/shuvalov-anton/textr.svg

[depstat-url]: https://david-dm.org/shuvalov-anton/textr
[depstat-image]: https://david-dm.org/shuvalov-anton/textr.svg

[depstat-dev-url]: https://david-dm.org/shuvalov-anton/textr
[depstat-dev-image]: https://david-dm.org/shuvalov-anton/textr/dev-status.svg

[typographic-quotes]: https://github.com/matmuchrapna/typographic-quotes
[typographic-math-symbols]: https://github.com/matmuchrapna/typographic-math-symbols
[typographic-em-dashes]: https://github.com/matmuchrapna/typographic-em-dashes
[typographic-ellipses]: https://github.com/matmuchrapna/typographic-ellipses
