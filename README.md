# gulp-sass-extend-shorthand

A [gulp-replace](https://github.com/lazd/gulp-replace) wrapper to add a syntactic sugar shorthand syntax for writing [@extend](https://sass-lang.com/documentation/at-rules/extend) at-rules in [Sass](https://sass-lang.com/). (Note, this currently only works with the SCSS syntax).

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
