const replace = require('gulp-replace')

const findSugar = new RegExp(/([{;])\s*\n(\s*)([%\.])([^{;!]+)\s*(!optional)?;/, 'g')

function meltSugar(match, p1, p2, p3, p4, p5) {
  let sugar = (p3 + p4)
    .replace(/\s+/g,'')
    .split(',')
    .map(val => p2 + '@extend ' + val  + (p5 ? ' ' + p5 : ''))
    .join(';\n')
  return p1 + '\n' + sugar + ';'
}

module.exports = () => replace(findSugar, meltSugar)
