/**
 * Created by ericwtzheng on 2016/4/4.
 */

const gbk = require('../index');
const should = require('should');
const querystring = require('querystring');
describe('gbk', function () {
    describe('encodeURIComponent', function () {

        it('gbk should be a object which utilities are merged into', function(){
            gbk.should.be.an.Object();
            gbk.should.have.property('encodeURIComponent');
        });

        it('gbk.encodeURIComponent should be a Function', function(){
            gbk.encodeURIComponent.should.be.a.Function();
        });
        
        it('when pass unvalid value should return ""', function(){
            gbk.encodeURIComponent(null).should.equal('');
            gbk.encodeURIComponent(undefined).should.equal('');
        });

        it("normal ASCII characters like 'name' should remain itself", function () {
            gbk.encodeURIComponent('name').should.equal('name');
        })
        it('我 should be %CE%D2', function () {
            gbk.encodeURIComponent('我').should.equal('%CE%D2');
        })
        it('special characters should return itself', function () {
            gbk.encodeURIComponent('!').should.equal('!')
            gbk.encodeURIComponent('-').should.equal('-')
            gbk.encodeURIComponent('.').should.equal('.')
            gbk.encodeURIComponent('_').should.equal('_')
            gbk.encodeURIComponent('~').should.equal('~')
            gbk.encodeURIComponent('\'').should.equal('\'')
            gbk.encodeURIComponent('(').should.equal('(')
            gbk.encodeURIComponent(')').should.equal(')')
            gbk.encodeURIComponent('*').should.equal('*')
            gbk.encodeURIComponent(1).should.equal('1')
            gbk.encodeURIComponent('a').should.equal('a')
            gbk.encodeURIComponent('A').should.equal('A')
        })

        it("querystring.stringify({name:'我'}, null, null, {encodeURIComponent: gbk.encodeURIComponent})' should be 'name=%CE%D2'", function () {
            querystring.stringify({name:'我'}, null, null, {encodeURIComponent: gbk.encodeURIComponent}).should.equal('name=%CE%D2');
        })
        
    })
    
    describe('decodeURIComponent', function() {
        it('gbk.decodeURIComponent should be a Function', function(){
            gbk.decodeURIComponent.should.be.a.Function();
        });
        
        it.only('when pass unvalid value should return ""', function(){
            gbk.decodeURIComponent(null).should.equal('');
            gbk.decodeURIComponent(undefined).should.equal('');
        });
        
        it('name should be "name"', function(){
            gbk.decodeURIComponent('name').should.equal('name');
        });
        
        it('%CE%D2 should be "我"', function(){
            gbk.decodeURIComponent('%CE%D2').should.equal('我');
        });
        
        it('special characters should return itself', function () {
            gbk.decodeURIComponent('!').should.equal('!')
            gbk.decodeURIComponent('-').should.equal('-')
            gbk.decodeURIComponent('.').should.equal('.')
            gbk.decodeURIComponent('_').should.equal('_')
            gbk.decodeURIComponent('~').should.equal('~')
            gbk.decodeURIComponent('\'').should.equal('\'')
            gbk.decodeURIComponent('(').should.equal('(')
            gbk.decodeURIComponent(')').should.equal(')')
            gbk.decodeURIComponent('*').should.equal('*')
            gbk.decodeURIComponent(1).should.equal('1')
            gbk.decodeURIComponent('a').should.equal('a')
            gbk.decodeURIComponent('A').should.equal('A')
        })
        
        it('w=%D6%D0%CE%C4&foo=bar should be { w: "中文", foo: "bar" }', function(){
            var res = querystring.parse('w=%D6%D0%CE%C4&foo=bar', null, null, { decodeURIComponent: gbk.decodeURIComponent })
            res.should.have.properties({ w: "中文", foo: "bar" })
        });
    })
    
});
