const replace = require('gulp-replace')

const findSugar = new RegExp(/(?<=[{;])\s*\n(\s*)([%\.])([^{;!]+)\s*(!optional)?;/, 'g')

function meltSugar(match, p1, p2, p3, p4) {

  let sugar = (p2 + p3)
    .replace(/\s+/g,'')
    .split(',')
    .map(val => p1 + '@extend ' + val  + (p4 ? ' ' + p4 : ''))
    .join(';\n')
  return '\n' + sugar + ';'
}

module.exports = () => replace(findSugar, meltSugar)
