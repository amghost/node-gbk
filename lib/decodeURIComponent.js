"use strict"
const iconv = require('iconv-lite')

var decodeURIComponent = str => {
  if (str === null || str === undefined) {
    str = ''
  }
  if (typeof str !== 'string') {
    str += ''
  }
  
  if (!str.includes('%')) {
    return str
  }
  
  let strArr = str.split('%')
  if (strArr.length > 0 && strArr[0] === '') {
    strArr = strArr.slice(1)
  }
  const bytes = strArr.map(ch => Number.parseInt(ch, 16))
  
  const buf = new Buffer(bytes)
  return iconv.decode(buf, 'gbk')
}

module.exports = decodeURIComponent