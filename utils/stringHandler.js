const combineArguments = (args, key) => {
  const firstPart = args[key]
  const lastPart = args._
  const result = firstPart + ' ' + lastPart.join(' ')
  return result
}

const isId = id => {
  const onlyNumbersRegex = /^[0-9]+$/
  return onlyNumbersRegex.test(id)
}

const collectStrings = args => {
  const validProjectNamesRegex = /^(\D)+$/
  const validStrings = args.filter(arg => validProjectNamesRegex.test(arg))
  return validStrings
}

const removeElementsFromArray = (toRemove, values) => {
  const result = values.filter(value => !toRemove.includes(value))
  return result
}

const groupArguments = args => {
  const validStrings = collectStrings(args)
  const combinedStrings = validStrings.join(' ')
  const numbers = removeElementsFromArray(validStrings, args)
  return {name: combinedStrings, numbers: numbers}
}

module.exports = {
  combineArguments,
  isId,
  collectStrings,
  groupArguments,
}
