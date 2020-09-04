const Configstore = require('configstore')
const inquirer = require('./inquirer')
const pkg = require('../package')
const conf = new Configstore(pkg.name)

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
    return (typeof credentials != undefined)
}

const getCredentials = () => {
    const credentials = getStoredAuthentication()
    if (!credentials) {
        return getPersonalAuthentication
    }
    return credentials
}

module.exports = {
    getCredentials,
    checkCredentials,
    getPersonalAuthentication
}
