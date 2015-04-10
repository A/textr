# Typographr

Superslim text transforming framework. With `typographr` you can easy
to create modular typographers with your very own text transformation logic
to use it on many cases like just fix quotes or even convert your text
rom markdown to html.

## Install

```
npm install typographr
```

## Examples

```js
var typographr = require('typographr');
var quotes     = require('typographic-quotes');
var ellipses   = require('typographic-ellipses');
var spaces     = require('typographic-single-spaces');

// Create new transformer
tf = typographr()
  // and register your plugins
  .use(ellipses)
  .use(spaces)
  .use(quotes)
;


// then just send some text to the transformer
tf('Hello "world"...'); // Hello “world”…
```

## Transformation plugins

You can easily to create the new one' cause each plugin is just a function
that get text, transform it and return new. For example this is the source
of the `ellipses` func:

```js
function(input) {
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

MIT. [Shuvalov Anton](http://shuvalov.info) © 2015
