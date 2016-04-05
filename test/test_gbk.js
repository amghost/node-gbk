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

        it("normal ASCII characters like 'name' should remain itself", function () {
            gbk.encodeURIComponent('name').should.equal('name');
        })
        it('我 should be %CE%D2', function () {
            gbk.encodeURIComponent('我').should.equal('%CE%D2');
        })

        it("querystring.stringify({name:'我'}, null, null, {encodeURIComponent: gbk.encodeURIComponent})' should be 'name=%CE%D2'", function () {
            querystring.stringify({name:'我'}, null, null, {encodeURIComponent: gbk.encodeURIComponent}).should.equal('name=%CE%D2');
        })
    })
    
    describe('decodeURIComponent', function() {
        it('gbk.decodeURIComponent should be a Function', function(){
            gbk.decodeURIComponent.should.be.a.Function();
        });
        
        it('when pass unvalid value should return ""', function(){
            gbk.decodeURIComponent(null).should.equal('');
            gbk.decodeURIComponent(undefined).should.equal('');
            gbk.decodeURIComponent(0).should.equal('');
            gbk.decodeURIComponent(-1).should.equal('');
            gbk.decodeURIComponent(1).should.equal('');
        });
        
        it('%6E%61%6D%65 should be "name"', function(){
            gbk.decodeURIComponent('%6E%61%6D%65').should.equal('name');
        });
    })
    
});
