/**
 * Created by ericwtzheng on 2016/4/4.
 */
const iconv = require('iconv-lite');

var hexTable = [];
for (var i = 0; i < 256; ++i)
    hexTable[i] = '%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase();

var encodeURIComponent = function (str) {
    "use strict";
    if (typeof str !== 'string')
        str += '';
    var lastPos = 0, curPos = 0;
    var out = '';
    var hitGBK = false;
    var buf = iconv.encode(str, 'gbk');
    for (var pair of buf.entries()) {
        var i = pair[0];
        var c = pair[1];
        //First check if last octet hit GBK encoding
        if (hitGBK) {
            out += hexTable[buf[i-1]] + hexTable[c];
            hitGBK = false;
            lastPos = ++curPos;
            continue;
        }

        // These characters do not need escaping (in order):
        // ! - . _ ~
        // ' ( ) *
        // digits
        // alpha (uppercase)
        // alpha (lowercase)
        // BTW, count as one character, so increment curPos
        if (c === 0x21 || c === 0x2D || c === 0x2E || c === 0x5F || c === 0x7E ||
            (c >= 0x27 && c <= 0x2A) ||
            (c >= 0x30 && c <= 0x39) ||
            (c >= 0x41 && c <= 0x5A) ||
            (c >= 0x61 && c <= 0x7A)) {
            curPos++;
            continue;
        }

        //need to collect character we've got
        if (curPos > lastPos) {
            out += str.slice(lastPos, curPos);
        }

        //other ASCII characters
        if (c <= 0x80) {
            lastPos = curPos + 1;
            curPos++;
            out += hexTable[c];
            continue;
        }

        //WATCH OUT! Here we come into the first octet of GBK encoding character
        hitGBK = true;
    }
    if (lastPos === 0)
        return str;
    if (lastPos < str.length)
        return out + str.slice(lastPos);
    return out;
};

module.exports = encodeURIComponent;
