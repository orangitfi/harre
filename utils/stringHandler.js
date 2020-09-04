const combineArguments = (args, key) => {
    const firstPart = args[key]
    const lastPart = args._
    const result = firstPart + " " + lastPart.join(' ')
    return result
}

module.exports = {
    combineArguments
}
