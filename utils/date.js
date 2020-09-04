const alreadyFormattedDate = (date) => {
    const validDateRegex = /(20\d{2}[0-1]\d[0-3]\d)/
    return validDateRegex.test(date)
}

const validMonth = (month) => {
    const validMonthRegex = /(1[0-2]|\d)/
    return validMonthRegex.test(month)
}


const formatDate = (date) => {
    if (alreadyFormattedDate(date)) return date
    const year = date.getFullYear()
    const month = ("0" + (date.getMonth() + 1)).slice(-2)
    const day = ("0" + date.getDate()).slice(-2)
    return "" + year + month + day
}

const createMonthsFirstDate = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const newDate = new Date(year, month, 1)
    return newDate
}

const createMonthsLastDate = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const newDate = new Date(year, month + 1, 0)
    return newDate
}


const createMonthDateObject = (month) => {
    const currentDate = new Date()
    const date = new Date(currentDate.getFullYear(), month -1, 1)
    const firstDayMonth = createMonthsFirstDate(date)
    const lastDayMonth = createMonthsLastDate(date)
    return createDatesObject(firstDayMonth, lastDayMonth)
}

const getMonthDateObject = (month) => {
    return createMonthDateObject(month)
}

const getLastMonthsDate = () => {
    return createLastMonthsDate(new Date())

}

const createLastMonthsDate = (date) => {
    const lastMonthsDate = new Date(date.setMonth(date.getMonth() - 1))
    return createDatesObject(lastMonthsDate)
}

const getOneWeekEarlierDate = () => {
    const newDate = new Date(new Date().setDate(new Date().getDate() - 7))
    return newDate
}

const getLastWeekDates = () => {
    return createLastWeekDate(new Date())
}

const createLastWeekDate = (date) => {
    const lastWeeksDate = new Date(date.setDate(date.getDate() - 8))

    const fromDate = new Date(lastWeeksDate.setDate(
        lastWeeksDate.getDate() - lastWeeksDate.getDay() + 1
    ))

    const toDate = new Date(fromDate)
    toDate.setDate(toDate.getDate() + 6)

    return createDatesObject(fromDate, toDate)
}


const createDatesObject = (dateFrom = getOneWeekEarlierDate(),
                           dateTo = new Date()) => {

    const datesObject = {
        dateFrom: formatDate(dateFrom),
        dateTo: formatDate(dateTo)
    }
    return datesObject
}

module.exports = {
    getDatesObject: createDatesObject,
    getLastWeekDates,
    getLastMonthsDate,
    getMonthDateObject,
    validMonth
}