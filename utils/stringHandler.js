const combineArguments = (args, key) => {
    const firstPart = args[key]
    const lastPart = args._
    const result = firstPart + " " + lastPart.join(' ')
    return result
}

const isId = (id) => {
    const onlyNumbersRegex = /^[0-9]+$/
    return onlyNumbersRegex.test(id)
}

module.exports = {
    combineArguments,
    isId
}
