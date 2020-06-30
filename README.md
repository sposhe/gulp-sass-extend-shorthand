# gulp-sass-extend-shorthand

A [gulp-replace](https://github.com/lazd/gulp-replace) wrapper to add a syntactic sugar shorthand syntax for writing [@extend](https://sass-lang.com/documentation/at-rules/extend) at-rules in [Sass](https://sass-lang.com/). (Note, this currently only works with the SCSS syntax).

## Syntax

```scss
%placeholderMixin { background: red; } // %placeholderMixin { background: red; }  
.mixinA { color: #112358; }            // .mixinA { color: #112358; }             
.mixinB { display: inline; }           // .mixinB { display: inline; }            
.mixinC { font-weight: 700; }          // .mixinC { font-weight: 700; }           
                                       //
%foo,                                  // %foo,                          
.bar,                                  // .bar,                          
figure {                               // figure {                       
  %placeholderMixin !optional;         //   @extend %placeholderMixin !optional;
  margin: 0;                           //   margin: 0;                   
  .mixinA, .mixinB, .mixinC;           //   @extend .mixinA;  
}                                      //   @extend .mixinB;
                                       //   @extend .mixinC;
                                       // }
                                       //                         
dl {                                   // dl {                         
  .mixinA,                             //   @extend .mixinA !optional;
  .mixinC !optional;                   //   @extend .mixinB !optional;
  dt {                                 //   dd {                        
    %placeholderMixin;                 //     @extend %placeholderMixin;        
  }                                    //   }                            
}                                      // }                              
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
