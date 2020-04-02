//Add better date validation
const isValidDate = (date) => {
    //return date.toString() instanceof Date && (isNaN(date))
    return date.toString().length === 8
}
const formatDate = (date) => {
    const year = date.getFullYear()
    const month = ("0" + date.getMonth()).slice(-2)
    const day = ("0" + date.getDay()).slice(-2)
    return "" + year + month + day
}

const getCurrentDate = () => {
    const currentDate = new Date()
    const correctFormatDate = formatDate(currentDate)
    return correctFormatDate
}

const getOneWeekEarlierDate = () => {
    const currentDate = new Date()
    currentDate.setDate(currentDate.getDate()-7)
    const correctFormatDate = formatDate(currentDate)
    return correctFormatDate
}

const getDatesObject = (dateFrom = getOneWeekEarlierDate(),
                        dateTo = getCurrentDate()) => {
    const datesObject = {
        dateFrom: dateFrom,
        dateTo: dateTo
    }
    return datesObject
}

module.exports = {
    isValidDate,
    getDatesObject
}