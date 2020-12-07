const whiteText = '\x1b[37m'
const redText = '\x1b[31m'
const yellowText = '\x1b[33m'
const reset = '\x1b[0m'

const log = (color, level, ...text) => {
  text.map(str => console.log(`${color}[${level}] ${str}${reset}`))
}

const Logger = {
  log: (...text) => log(whiteText, 'LOG', ...text),
  warn: (...text) => log(yellowText, 'WARN',  ...text),
  error: (...text) => log(redText, 'ERROR', ...text)
}

module.exports = Logger
