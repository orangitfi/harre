#!/usr/bin/env node
const {
  combineArguments,
  isId,
  groupArguments,
} = require('./utils/stringHandler')
const {
  checkCredentials,
  getPersonalAuthentication,
} = require('./lib/authentication')

const harvest = require('./lib/harvest')
const pkg = require('./package')
const NAME = pkg.name
const dateService = require('./utils/date')
const csvService = require('./utils/csv')

const printHelp = () => {
  console.log(`
    ${NAME}, CLI tool that fetches reports from Harvest.
    Commands: \n
    <project id> <from date> <to date>: Finds all time entries from a project, between the given time frame. Dates are optional.
    <project id> -l: Returns last weeks entries
    -g: Returns all projects
    -f <Project name>: Finds a project where the name contains search word
    -h <Project name>: Returns all recorded hours for the given project
    -j: Returns output as Json
    --min: Returns minimal CSV with the following columns: Date, Notes, Hours and Employee number
    --init: Allows to re-enter users credentials
    --help: Prints out help
    `)
}

const handleDate = (dateFrom, dateTo, lastWeek) => {
  if (lastWeek) {
    return dateService.getLastWeekDates()
  } else if (dateService.validMonth(dateFrom)) {
    return dateService.getMonthDateObject(dateFrom)
  } else {
    return dateService.getDatesObject(dateFrom, dateTo)
  }
}

const getProjectEntries = async args => {
  const groupedArguments = groupArguments(args._)
  if (groupedArguments.name) {
    const [dateFrom, dateTo] = groupedArguments.numbers
    const date = handleDate(dateFrom, dateTo)
    return await harvest.getEntriesForProjectWithName(
      groupedArguments.name,
      date,
    )
  }
  const [id, dateFrom, dateTo] = args._
  const date = handleDate(dateFrom, dateTo, args.l)
  return await harvest.getEntriesForProject(id, date)
}

const findProjects = async (args)=> {
  combineArguments(args, 'f')
  const result = await harvest.findProject(combineArguments(argv, 'f'))
  console.log(result)
}

const getProjectHours = async (args) => {
  const date = dateService.getLastMonthsDate()
 return await harvest.getHours(combineArguments(args, 'h'), date)
}

const run = async () => {
  const argv = require('minimist')(process.argv.slice(2), {default: {}})

  if (!checkCredentials()) {
    console.log(`Missing credentials, please use '${NAME} --init'`)
  }
  console.log(argv)
  let date, result
  switch (true) {
    case argv.f && argv.f.length > 0:
      await findProjects(argv)
      return
    case argv.h && argv.h.length > 0:
      result = await getProjectHours(argv)
      break
    case argv._.length >= 1:
      result = await getProjectEntries(argv)
      break
    case argv.g:
      result = await harvest.getProjects()
      break
    case argv.help:
      printHelp()
      break
    case argv.init:
      await getPersonalAuthentication()
      break
    default:
      console.log(`${NAME}: try '${NAME} --help' for more information`)
      break
  }
  if (result) {
    if (argv.min) {
      csvService.toMinimalCSV(Object.values(result)[0])
    } else if (argv.g) {
      csvService.projectDataToCsv(Object.values(result)[0])
    } else if (!argv.j) {
      csvService.toFullCSV(Object.values(result)[0])
    } else {
      console.log(result)
    }
  }
}

run()
