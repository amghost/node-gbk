const iconv = require('iconv-lite')

var decodeURIComponent = str => {
  console.log(typeof str !== 'string')
  if (typeof str !== 'string') {
    return ''
  }
  const strArr = str.split('%')
  // const bytes = strArr.map(ch => {
  //   if (ch === '%') {
  //     Number.parseInt("6E", 16)
  //     return
  //   }
  //   return ch
  // })
}

module.exports = decodeURIComponent