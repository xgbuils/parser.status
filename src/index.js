function parserStatus (initStatus) {
    var obj = {}
    var pos = 0
    var stack = [{
        array: [],
        status: initStatus,
        attributes: {}
    }]
    var toPushAttributes = {}
    var set = function (key, value) {
        setAttributes(stack[pos].attributes, key, value)
    }
    var get = function (key) {
        return getAttributes(stack[pos].attributes, key)
    }
    set.to = {
        push: function (key, value) {
            setAttributes(toPushAttributes, key, value)
        }
    }
    get.to = {
        push: function (key) {
            return getAttributes(toPushAttributes, key)
        }
    }
    obj.set = set
    obj.get = get
    obj.addValue = function (value) {
        stack[pos].array.push(value)
    }
    obj.getStatus = function () {
        return stack[pos].status
    }
    obj.getArray = function () {
        return stack[pos].array
    }
    obj.setStatus = function (newStatus) {
        stack[pos].status = newStatus
    }
    obj.push = function (status) {
        stack[pos].status = status
        stack.push({
            array: [],
            attributes: toPushAttributes
        })
        toPushAttributes = {}
        ++pos
    }
    obj.pop = function () {
        if (stack.length <= 1) {
            throw new Error('Cannot pop parser status')
        }
        var current = stack.pop()
        --pos
        toPushAttributes = {}
        return current.array
    }
    return obj
}

function setAttributes (attributes, key, value) {
    var obj = {}
    if (typeof key === 'string') {
        obj[key] = value
    } else {
        obj = key
    }
    extend(attributes, obj)
}

function getAttributes (attributes, key) {
    if (typeof key === 'string') {
        return attributes[key]
    }
}

function extend (source, obj) {
    source = source || {}
    for (var key in obj) {
        if (obj[key]) {
            source[key] = obj[key]
        }
    }
    return source
}

module.exports = parserStatus
