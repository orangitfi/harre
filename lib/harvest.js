const {askForProject} = require('./inquirer')
const axios = require('axios')
const entriesHandler = require('./entriesHandler')
const {getCredentials} = require('./authentication')

const URL =
  'https://api.harvestapp.com/v2/reports/time/projects?from=20200101&to=20200301'
const PROJECTS_URL = 'https://api.harvestapp.com/v2/projects'
const TIME_REPORTS_URL = 'https://api.harvestapp.com/v2/reports/time/projects?'
const TIME_ENTRIES_URL = 'https://api.harvestapp.com/v2/time_entries/?'

const createTimeEntriesProjectUrl = (url, id, dates) => {
  const newUrl = `${url}project_id=${id}&from=${dates.dateFrom}&to=${dates.dateTo}`
  return newUrl
}

const initHeaders = () => {
  const credentials = getCredentials()
  const config = {
    headers: {
      'User-Agent': credentials.userAgent,
      Authorization: 'Bearer ' + credentials.accessToken,
      'Harvest-Account-Id': credentials.accountId,
    },
  }
  return config
}

const get = url => {
  return getRequest(url, initHeaders())
}

const getProjects = (url = PROJECTS_URL) => {
  return get(url)
}

const getRequest = async (url, config) => {
  try {
    const resp = await axios.get(url, config)
    return resp.data
  } catch (e) {
    console.log(`Error: ${e.response.status} ${e.response.statusText}`)
  }
}

const getEntriesForProjectWithName = async (name, datesObject) => {
  const project = await findProject(name)
  if (!project) return
  return getEntriesForProjectWithId(project.id, datesObject)
}

const getEntriesForProjectWithId = async (id, datesObject) => {
  const url = createTimeEntriesProjectUrl(TIME_ENTRIES_URL, id, datesObject)
  const listOfFoundEntries = await get(url)
  return listOfFoundEntries
}

const findAllProjects = async (name = '') => {
  const listOfFoundProjects = await get(PROJECTS_URL)
  const foundProjects = listOfFoundProjects.projects.filter(p => {
      const projectName = p.name.toUpperCase().replace(/\W/g, '')
      const searchWord = name.replace(/\W/g, '').toUpperCase()
      return projectName.includes(searchWord)
    },
  )
  return foundProjects
}

const selectSingleProject = async projects => {
  if (projects.length > 1) {
    console.log('Found similar projects')
    const chosenProject = await askForProject(projects)
    return projects.find(p => p.name === chosenProject.name)
  } else {
    return projects[0]
  }
}

const findProject = async (name = '') => {
  const foundProjects = await findAllProjects(name)
  if (foundProjects.length === 0) {
    console.log(`No projects found with the name: ${name}`)
    return
  }
  const result = selectSingleProject(foundProjects)
  return result
}

const getHours = async (name, date) => {
  const project = await findProject(name)
  if (!project) return

  const result = await getEntriesForProjectWithId(project.id, date)
  const hours = entriesHandler.countTimeEntryHours(result.time_entries)
  console.log(`${project.name} hours from ${date.dateFrom} to ${date.dateTo}: `)
  console.log(hours)
}

module.exports = {
  getEntriesForProject: getEntriesForProjectWithId,
  getEntriesForProjectWithName,
  findProject,
  getProjects,
  getHours,
}
