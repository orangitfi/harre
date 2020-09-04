/*
As many of the functions are dependant to the current date and
kind of data we have, we're just checking that there aren't any errors.
Make mocks.
 */

const dateService = require('../utils/date')

const assert = require('assert')

describe('Date', function() {
  describe('validMonth', function() {
    it('month 01 should return true', function() {
      assert.equal(dateService.validMonth('01'), true)
    })

    it('month 13 should return false', function() {
      assert.equal(dateService.validMonth('13'), true)
    })
  })

  describe('getMonthDateObject', function() {
    const getMonthFromString = (date) => {
      const month = date.slice(4, 6)
      return month
    }

    it('month 08 should return valid date object', function() {
      const month = '08'
      const monthDate = dateService.getMonthDateObject(month)
      assert.equal(getMonthFromString(monthDate.dateFrom), month)
      assert.equal(getMonthFromString(monthDate.dateTo), month)
    })
  })
})

