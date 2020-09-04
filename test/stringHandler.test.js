const assert = require('assert')
const expect = require('chai').expect

const stringHandler = require('../utils/stringHandler')

describe('StringHandler', function() {
  describe('combineArguments', function() {
    it('Should divide "hello world 123 123" to two arrays correctly"', function() {
      const input = ['hello', 'world', 123, 123]
      const result = stringHandler.groupArguments(input)
      assert.equal(result.name, 'hello world')
      expect(result.numbers).deep.to.equal([123, 123])
    })
  })
})
