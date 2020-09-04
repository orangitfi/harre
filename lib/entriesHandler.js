const countTimeEntryHours = (entries) => {
    const result = entries.reduce((sum, entry) => sum + entry.hours, 0)
    return result
}

module.exports = {
    countTimeEntryHours
}