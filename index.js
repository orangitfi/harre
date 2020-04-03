#!/usr/bin/env node
const clear = require('clear')
const inquirer = require('./lib/inquirer')
const harvest = require('./lib/harvest')
const pkg = require('./package')
const NAME = pkg.name
const dateService = require('./utils/date')
const csvService = require('./utils/csv')


const printHelp = () => {
    console.log(`
    ${NAME}, CLI tool that fetches reports from Harvest.
    Commands: \n
    < project id > < from date > < to date >: Finds all time entries from a project, between the given time frame. Dates are optional. You may only use the from date.
    -g: Returns all projects
    -f <Project name>: Finds a project where the name contains search word
    -j: Returns output as Json
    -l: Returns last weeks entries
    --init: Allows to re-enter users credentials
    --help: Prints out help
    -j: Return as Json object
    `)
}


const run = async () => {
    const argv = require('minimist')(process.argv.slice(2),
        {default: {}})


    if (!harvest.checkCredentials()) {
        console.log(`Missing credentials, please use '${NAME} --init'`)
    }


    let date, result
    switch (true) {
        case argv.f && argv.f.length > 0:
            const name = argv.f
            result = await harvest.findProject(name)
            break
        case argv._.length >= 1:
            const [id, dateFrom, dateTo] = argv._
            if (argv.l) {
                date = dateService.getLastWeekDates()
            } else {
                date = dateService.getDatesObject(dateFrom, dateTo)
            }
            result = await harvest.getEntriesForProject(id, date)
            break
        case argv.g:
            result = await harvest.get()
            break
        case argv.i:
            await interactive()
            break
        case argv.help:
            printHelp()
            break
        case argv.init:
            harvest.getPersonalAuthentication()
            break
        default:
            console.log(`${NAME}: try '${NAME} --help' for more information`)
            break
    }
    if (!argv.j && result) {
        result = csvService.toCSV(Object.values(result)[0])
    }
    if (result) console.log(result)
}

//clear()
run()