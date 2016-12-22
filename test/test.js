var chai = require('chai')
var expect = chai.expect
var ParserStatus = require('../src/')

describe('parserStatus', function () {
    var key
    var value
    var initStatus = 'INIT_STATUS'
    var anotherStatus = 'STATUS'
    beforeEach(function () {
        key = 'foo'
        value = 'bar'
    })
    it('set, then get', function () {
        var parserStatus = ParserStatus(initStatus)
        parserStatus.set(key, value)
        expect(parserStatus.get(key)).to.be.equal(value)
    })

    it('set, push, then get', function () {
        var parserStatus = ParserStatus(initStatus)
        var obj = {}
        obj[key] = value
        parserStatus.set(obj)
        parserStatus.push(anotherStatus)
        expect(parserStatus.get(key)).to.be.equal(undefined)
    })

    it('push, set, then get', function () {
        var parserStatus = ParserStatus(initStatus)
        var key = 'foo'
        var value = 'bar'
        parserStatus.push(anotherStatus)
        parserStatus.set(key, value)
        expect(parserStatus.get(key)).to.be.equal(value)
    })

    it('set, push, pop, then get', function () {
        var parserStatus = ParserStatus(initStatus)
        var obj = {}
        obj[key] = value
        parserStatus.push(anotherStatus)
        parserStatus.pop()
        parserStatus.set(obj)
        expect(parserStatus.get(key)).to.be.equal(value)
    })

    it('set, push, pop, push, pop, then get', function () {
        var parserStatus = ParserStatus(initStatus)
        var obj = {}
        obj[key] = value
        parserStatus.set(obj)
        parserStatus.push(anotherStatus)
        parserStatus.pop()
        parserStatus.push(anotherStatus)
        parserStatus.pop()
        expect(parserStatus.get(key)).to.be.equal(value)
    })

    it('set.to.push, then get', function () {
        var parserStatus = ParserStatus(initStatus)
        parserStatus.set.to.push(key, value)
        expect(parserStatus.get(key)).to.be.equal(undefined)
    })

    it('set.to.push, then get.to.push', function () {
        var parserStatus = ParserStatus(initStatus)
        var obj = {}
        obj[key] = value
        parserStatus.set.to.push(key, value)
        expect(parserStatus.get.to.push(key)).to.be.equal(value)
    })

    it('set.to.push, push, then get', function () {
        var parserStatus = ParserStatus(initStatus)
        parserStatus.set.to.push(key, value)
        parserStatus.push(anotherStatus)
        expect(parserStatus.get(key)).to.be.equal(value)
    })

    it('set.to.push, push, then get.to.push', function () {
        var parserStatus = ParserStatus(initStatus)
        var obj = {}
        obj[key] = value
        parserStatus.set.to.push(key, value)
        parserStatus.push(anotherStatus)
        expect(parserStatus.get.to.push(key)).to.be.equal(undefined)
    })

    it('set.to.push, push, pop, then get', function () {
        var parserStatus = ParserStatus(initStatus)
        parserStatus.set.to.push(key, value)
        parserStatus.push(anotherStatus)
        parserStatus.pop()
        expect(parserStatus.get(key)).to.be.equal(undefined)
    })

    it('set.to.push, push, pop, then get.to.push', function () {
        var parserStatus = ParserStatus(initStatus)
        var obj = {}
        obj[key] = value
        parserStatus.set.to.push(key, value)
        parserStatus.push(anotherStatus)
        parserStatus.pop()
        expect(parserStatus.get.to.push(key)).to.be.equal(undefined)
    })

    it('set.to.push, push, pop, push, then get', function () {
        var parserStatus = ParserStatus(initStatus)
        var obj = {}
        obj[key] = value
        parserStatus.set.to.push(key, value)
        parserStatus.push(anotherStatus)
        parserStatus.pop()
        parserStatus.push(anotherStatus)
        expect(parserStatus.get(key)).to.be.equal(undefined)
    })

    it('getStatus', function () {
        var parserStatus = ParserStatus(initStatus)
        expect(parserStatus.getStatus()).to.be.equal(initStatus)
    })

    it('pushStatus, then getStatus', function () {
        var parserStatus = ParserStatus(initStatus)
        parserStatus.push(anotherStatus)
        expect(parserStatus.getStatus()).to.be.equal(undefined)
    })

    it('pushStatus, setStatus, then getStatus', function () {
        var parserStatus = ParserStatus(initStatus)
        var sampleStatus = 'SAMPLE_STATUS'
        parserStatus.push(anotherStatus)
        parserStatus.setStatus(sampleStatus)
        expect(parserStatus.getStatus()).to.be.equal(sampleStatus)
    })

    it('pushStatus, pop, then getStatus', function () {
        var parserStatus = ParserStatus(initStatus)
        parserStatus.push(anotherStatus)
        parserStatus.pop()
        expect(parserStatus.getStatus()).to.be.equal(anotherStatus)
    })

    it('first pop', function () {
        var parserStatus = ParserStatus(initStatus)
        function test () {
            parserStatus.pop()
        }
        expect(test).to.throw('Cannot pop parser status')
    })

    it('getArray', function () {
        var parserStatus = ParserStatus(initStatus)
        expect(parserStatus.getArray()).to.be.deep.equal([])
    })

    it('addValue, then getArray', function () {
        var parserStatus = ParserStatus(initStatus)
        var value = 3
        parserStatus.addValue(value)
        expect(parserStatus.getArray()).to.be.deep.equal([value])
    })

    it('push, then getArray', function () {
        var parserStatus = ParserStatus(initStatus)
        parserStatus.push(anotherStatus)
        expect(parserStatus.getArray()).to.be.deep.equal([])
    })

    it('addValue, push, addValue, then getArray', function () {
        var parserStatus = ParserStatus(initStatus)
        var value = 3
        parserStatus.addValue(5)
        parserStatus.push(anotherStatus)
        parserStatus.addValue(value)
        expect(parserStatus.getArray()).to.be.deep.equal([value])
    })

    it('addValue, push, pop, addValue, then getArray', function () {
        var parserStatus = ParserStatus(initStatus)
        var value = 3
        var anotherValue = 5
        parserStatus.addValue(value)
        parserStatus.push(anotherStatus)
        parserStatus.pop()
        parserStatus.addValue(anotherValue)
        expect(parserStatus.getArray()).to.be.deep.equal([value, anotherValue])
    })

    it('addValue, push, addValue, pop, addValue, then getArray', function () {
        var parserStatus = ParserStatus(initStatus)
        var value = 3
        var anotherValue = 5
        parserStatus.addValue(value)
        parserStatus.push(anotherStatus)
        parserStatus.addValue(1)
        parserStatus.pop()
        parserStatus.addValue(anotherValue)
        expect(parserStatus.getArray()).to.be.deep.equal([value, anotherValue])
    })
})
