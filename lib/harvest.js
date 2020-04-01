const CLI = require('clui')
const Configstore = require('configstore')
const Spinner = CLI.Spinner
const axios = require('axios')

const inquirer = require('./inquirer')
const pkg = require('../package')

const conf = new Configstore(pkg.name)

const URL = "https://api.harvestapp.com/v2/reports/time/clients?from=20200101&to=20200301"
const PROJECTS_URL = "https://api.harvestapp.com/v2/projects"
const TIME_REPORTS_URL = "https://api.harvestapp.com/v2/reports/time/projects?"


const createHarvestApiUrl = (url, dates) => {
    const newUrl = `${url}from=${dates.date1}&to=${dates.date2}`
    return newUrl
}

const getStoredAuthentication = () => {
    return (conf.get('harvest'))
}

const getPersonalAuthentication = async () => {
    const credentials = await inquirer.askForCredentials()
    console.log(credentials)
    conf.set('harvest.accessToken', credentials.accessToken)
    conf.set('harvest.accountId', credentials.accountId)
    conf.set('harvest.userAgent', credentials.userAgent)
    return credentials
}

const getAuthentication = () => {
    const credentials = getStoredAuthentication()
    if (!credentials) {
        return getPersonalAuthentication
    }
    return credentials
}

const get = (url = PROJECTS_URL) => {
    getRequest(url,initHeaders())
}

const initHeaders = () => {
    const credentials = getAuthentication()
    const config = {
        headers: {
            "User-Agent": credentials.userAgent,
            "Authorization": "Bearer " + credentials.accessToken,
            "Harvest-Account-Id": credentials.accountId
        }
    }
    return (config)
}

const getRequest = async (url,config) => {
    const status = new Spinner('Fetching projects, please wait...');

    status.start()
    const resp = await axios.get(url,config)
    status.stop()
    console.log(resp.data)
}

const getTimeReports = async (datesObject) => {
    const credentials = getAuthentication()
    const status = new Spinner('Fetching projects, please wait...');
    const config = {
        headers: {
            "User-Agent": credentials.userAgent,
            "Authorization": "Bearer " + credentials.accessToken,
            "Harvest-Account-Id": credentials.accountId
        }
    }
    status.start()
    const url = createHarvestApiUrl(TIME_REPORTS_URL, datesObject)
    const resp = await axios.get(url, config)
    status.stop()
    console.log(resp.data)
}


module.exports = {
    getStoredAuthentication,
    getPersonalAuthentication,
    get
}