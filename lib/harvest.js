const {getCredentials} = require("./authentication")

const axios = require('axios')


const URL = "https://api.harvestapp.com/v2/reports/time/projects?from=20200101&to=20200301"
const PROJECTS_URL = "https://api.harvestapp.com/v2/projects"
const TIME_REPORTS_URL = "https://api.harvestapp.com/v2/reports/time/projects?"
const TIME_ENTRIES_URL = "https://api.harvestapp.com/v2/time_entries/?"


const createTimeEntriesProjectUrl = (url, id, dates) => {
    const newUrl = `${url}project_id=${id}&from=${dates.dateFrom}&to=${dates.dateTo}`
    return newUrl
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
        .find(p => p.name.toUpperCase().includes(name.toUpperCase()))

    const result = foundProject ? foundProject : "Project not found with that name"
    return result
}


module.exports = {
    get,
    getEntriesForProject,
    findProject
}