
const validDateRegex = /(20\d{2}[0-1]\d[0-3]\d)/

const alreadyFormattedDate = (date) => {
    return validDateRegex.test(date)
}


const formatDate = (date) => {
    if (alreadyFormattedDate(date)) return date
    const year = date.getFullYear()
    const month = ("0" + (date.getMonth() + 1)).slice(-2)
    const day = ("0" + date.getDate()).slice(-2)
    return "" + year + month + day
}

const currentDate = new Date()



const getOneWeekEarlierDate = () => {
    const newDate =  new Date(currentDate.setDate(currentDate.getDate() - 7))
    return newDate
}

const getLastWeekDates = () => {
    return createLastWeekDate(currentDate)
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

const getLastMonthsDate = () => {
    return createLastMonthsDate(currentDate)

}

const createLastMonthsDate = (date) => {
    const lastMonthsDate = new Date(date.setMonth(date.getMonth() - 1))
    return createDatesObject(lastMonthsDate)

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
    getLastMonthsDate
}