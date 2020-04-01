#!/usr/bin/env node
const clear = require('clear')
const files = require('./lib/files')
const inquirer = require('./lib/inquirer')
const harvest = require('./lib/harvest')

const run = async () => {
    const action = await inquirer.askForAction()
    switch (action.index) {
        case 1:
            harvest.get()
            break
        case 2:
            console.log("hellperi")
            break
        default:
            console.log("defaultti")
            break
    }
    //await harvest.get()
    //const dates = await inquirer.askForDates()
}

clear()
run()
