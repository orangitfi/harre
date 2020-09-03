const {askForProject} = require('./inquirer')
const axios = require('axios')
const entriesHandler = require('./entriesHandler')
const {getCredentials} = require('./authentication')


const URL = "https://api.harvestapp.com/v2/reports/time/projects?from=20200101&to=20200301"
const PROJECTS_URL = "https://api.harvestapp.com/v2/projects"
const TIME_REPORTS_URL = "https://api.harvestapp.com/v2/reports/time/projects?"
const TIME_ENTRIES_URL = "https://api.harvestapp.com/v2/time_entries/?"


const createTimeEntriesProjectUrl = (url, id, dates) => {
    const newUrl = `${url}project_id=${id}&from=${dates.dateFrom}&to=${dates.dateTo}`
    return newUrl
}

const getProjects = (url = PROJECTS_URL) => {
    return get(url)
}

const get = (url) => {
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
    try {
        const resp = await axios.get(url, config)
        return resp.data
    } catch (e) {
        console.log(`Error: ${e.response.status} ${e.response.statusText}`)
    }
}

const getEntriesForProject = async (id, datesObject) => {
    const url = createTimeEntriesProjectUrl(TIME_ENTRIES_URL, id, datesObject)
    const listOfFoundEntries = await get(url)
    return listOfFoundEntries
}

const findProject = async (name = '') => {
    const listOfFoundProjects = await get(PROJECTS_URL)
    const foundProject = listOfFoundProjects
        .projects
        .find(p => p.name.toUpperCase().includes(name.trim().toUpperCase()))
    const result = foundProject ? foundProject : `Project not found with ${name}`
    return result
}

const findAllProjects = async(name='') => {
    const listOfFoundProjects = await get(PROJECTS_URL)
    const foundProjects = listOfFoundProjects
        .projects
        .filter(p => p.name.toUpperCase().includes(name.trim().toUpperCase()))
    //const result = foundProject ? foundProject : `No projects found with ${name}`
    return foundProjects
}

const getHours = async (name, date) => {
    const projects = await findAllProjects(name)
    if (projects.length === 0) {
        console.log(`No projects found with the name: ${name}`)
        return
    } else if (projects.length > 1){
        console.log('Too many projects found')
        const chosenProject = await askForProject(projects)
        const project = projects.find(p => p.name === chosenProject.name)
        const result =  await getEntriesForProject(project.id, date)
        const hours = entriesHandler.countTimeEntryHours(result.time_entries)
        console.log(`${project.name} hours from ${date.dateFrom} to ${date.dateTo}: `)
        console.log(hours)
    }
    else {
        const project = projects[0]
        const result =  await getEntriesForProject(project.id, date)
        const hours = entriesHandler.countTimeEntryHours(result.time_entries)
        console.log(`${project.name} hours from ${date.dateFrom} to ${date.dateTo}: `)
        console.log(hours)
    }
}

module.exports = {
    get,
    getEntriesForProject,
    findProject,
    getProjects,
    getHours
}