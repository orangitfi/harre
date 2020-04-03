const CLI = require('clui')
const Configstore = require('configstore')
const Spinner = CLI.Spinner
const axios = require('axios')
const inquirer = require('./inquirer')
const pkg = require('../package')

const conf = new Configstore(pkg.name)

const URL = "https://api.harvestapp.com/v2/reports/time/projects?from=20200101&to=20200301"
const PROJECTS_URL = "https://api.harvestapp.com/v2/projects"
const TIME_REPORTS_URL = "https://api.harvestapp.com/v2/reports/time/projects?"
const TEST = "https://api.harvestapp.com/v2/time_entries/?"


const createHarvestApiUrl = (url, dates) => {
    const newUrl = `${url}from=${dates.dateFrom}&to=${dates.dateTo}`
    return newUrl
}
const createTimeEntriesProjectUrl = (url, id, dates) => {
    const newUrl = `${url}project_id=${id}&from=${dates.dateFrom}&to=${dates.dateTo}`
    return newUrl
}

const getStoredAuthentication = () => {
    return (conf.get('harvest'))
}

const getPersonalAuthentication = async () => {
    const credentials = await inquirer.askForCredentials()
    conf.set('harvest.accessToken', credentials.accessToken)
    conf.set('harvest.accountId', credentials.accountId)
    conf.set('harvest.userAgent', credentials.userAgent)
    return credentials
}
const checkCredentials = () => {
    const credentials = getStoredAuthentication()
    return (credentials)
}

const getCredentials = () => {
    const credentials = getStoredAuthentication()
    if (!credentials) {
        return getPersonalAuthentication
    }
    return credentials
}

const get = (url = PROJECTS_URL) => {
    return getRequest(url, initHeaders())
}


const initHeaders = () => {
    const credentials = getCredentials()
    const config = {
        headers: {
            "User-Agent": credentials.userAgent,
            "Authorization": "Bearer " + credentials.accessToken,
            "Harvest-Account-Id": credentials.accountId
        }
    }
    return (config)
}

const getRequest = async (url, config) => {
    const status = new Spinner('Fetching data, please wait...');
    try {
        status.start()
        const resp = await axios.get(url, config)
        return resp.data
    } catch (e) {
        console.log(`Error: ${e.response.status} ${e.response.statusText}`)
    } finally {
        status.stop()
    }
}

const getEntriesForProject = async (id, datesObject) => {
    const url = createTimeEntriesProjectUrl(TEST, id, datesObject)
    const listOfFoundEntries = await get(url)
    return listOfFoundEntries
}

const findProject = async (name = '') => {
    const listOfFoundProjects = await get(PROJECTS_URL)

    const foundProject = listOfFoundProjects
        .projects
        .find(p => p.name.toUpperCase().includes(name.toUpperCase()))

    const result = foundProject ? foundProject : "Project not found with that name"
    return result
}


module.exports = {
    checkCredentials,
    get,
    getPersonalAuthentication,
    getEntriesForProject,
    findProject
}