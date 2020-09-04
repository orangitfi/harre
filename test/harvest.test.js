const assert = require('assert')
const expect = require('chai').expect

const harvest = require('../lib/harvest')

describe('harvest', function() {

  const date = {
    dateFrom: 20200910,
    dateTo: 20200901,
  }
  const projectName = 'internal work'

  describe('getHours', function() {
    it('should not crash', async function() {
      expect(() => harvest.getHours(projectName, date)).to.not.throw()

    })
  })

  describe('getEntriesForProjectWithName', function() {
    it('should not crash', async function() {
      const date = {
        dateFrom: 20200910,
        dateTo: 20200901,
      }
      const projectName = 'internal work'
      expect(() => harvest.getEntriesForProjectWithName(projectName, date)).to.not.throw()

    })
  })
})
