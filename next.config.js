const path = require('path')
const styles = require(path.join(process.cwd(), 'src', 'styles.config'))

const prependData = Object.entries(styles).map(([category, values]) => {
  const valuesStr = Object.entries(values)
    .map(([key, value]) => [key, Array.isArray(value) ? `(${value})` : value])
    .map(([key, value]) => `"${key}": ${value}`)
    .join(', ')

  return `$${category}: (${valuesStr});`
}).join(' ')

module.exports = {
  sassOptions: { prependData }
}
