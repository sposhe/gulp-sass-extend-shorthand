# gulp-sass-extend-shorthand

A [gulp-replace](https://github.com/lazd/gulp-replace) wrapper to add a syntactic sugar shorthand syntax for writing [@extend](https://sass-lang.com/documentation/at-rules/extend) at-rules in [Sass](https://sass-lang.com/). (Note, this currently only works with the SCSS syntax).

## Using with Utility Class Frameworks

Using semantic class names like `article-list` provide much more human-readable landmarks when examining HTML than adding a string utility classes like `px-px pt-5 pb-4 absolute top-0 left-0` directly to elements in the DOM.

Instead, developers can use semantic class names in markup and then use SCSS `@extend` at-rules to apply utility classes to those semantic classes. If the utility class framework is converted from using true class class selected (e.g. `.absolute {...}`) to using [placeholder selectors](https://sass-lang.com/documentation/style-rules/placeholder-selectors) (e.g. `%absolute {...}`), Sass will automatically ignore any unused utility classes when compiling.

This plugin creates a shorthand so that developers don't have to write `@extend` every time they reference a utility class within a semantic selector, potentially reducing the amount of code that needs to be written by over half.

## Syntax

#### Basic Syntax

```scss
// shorthand
.myClass {
  .myMixin;
}
```
```scss
// is expanded to
.myClass {
  @extend .myMixin;
}
```

#### Placeholder Mixins

```scss
// shorthand
.myClass {
  %myPlaceholderMixin;
}
```
```scss
// is expanded to
.myClass {
  @extend %myPlaceholderMixin;
}
```

#### Inline List Syntax

```scss
// shorthand
.myClass {
  .mixinA, .mixinB, .mixinC;
}
```
```scss
// is expanded to
.myClass {
  @extend .mixinA;
  @extend .mixinB;
  @extend .mixinC;
}
```

#### Stacked List Syntax

```scss
// shorthand
.myClass {
  .mixinA,
  .mixinB,
  .mixinC;
}
```
```scss
// is expanded to
.myClass {
  @extend .mixinA;
  @extend .mixinB;
  @extend .mixinC;
}
```

#### Using `!optional`

```scss
// shorthand
.myClass {
  .mixinA, .mixinB !optional;
  .mixinC;
}
```
```scss
// is expanded to
.myClass {
  @extend .mixinA !optional;
  @extend .mixinB !optional;
  @extend .mixinC;
}
```


## Usage

Pipe SCSS files through `gulp-sass-extend-shorthand` before piping to a compiler:

```js
const { src, dest } = require('gulp')
const sass = require('gulp-sass')
const sassExtendShorthand = require('gulp-sass-extend-shorthand')

function sassCompile() {
  return src([
    'src/scss/**/*.+(scss|css)',
    '!**/_*.*'
  ]).pipe( sassExtendShorthand() )
    .pipe( sass() )
    .pipe( dest('dist/css') )
}
```
