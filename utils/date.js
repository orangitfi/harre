//Add better date validation
const isValidDate = (date) => {
    //return date.toString() instanceof Date && (isNaN(date))
    return date.toString().length === 8
}
const formatDate = (date) => {
    const year = date.getFullYear()
    const month = ("0" + (date.getMonth() + 1)).slice(-2)
    const day = ("0" + date.getDate()).slice(-2)
    return "" + year + month + day
}

const getCurrentDate = () => {
    const currentDate = new Date()
    return currentDate
}

const getLastWeekDates = () => {
    return createLastWeekDate(new Date())
}

const getOneWeekEarlierDate = () => {
    const currentDate = new Date()
    currentDate.setDate(currentDate.getDate() - 7)
    return currentDate
}

const createLastWeekDate = (date) => {
    const lastWeeksDate = new Date(date.setDate(date.getDate() - 8))

    const fromDate = new Date(lastWeeksDate.setDate(
        lastWeeksDate.getDate() - lastWeeksDate.getDay() + 1
    ))

    const toDate = new Date(fromDate)
    toDate.setDate(toDate.getDate() + 6)

    return getDatesObject(fromDate, toDate)
}


const getDatesObject = (dateFrom = getOneWeekEarlierDate(),
                        dateTo = getCurrentDate()) => {
    const datesObject = {
        dateFrom: formatDate(dateFrom),
        dateTo: formatDate(dateTo)
    }
    return datesObject
}

module.exports = {
    isValidDate,
    getDatesObject,
    getLastWeekDates
}