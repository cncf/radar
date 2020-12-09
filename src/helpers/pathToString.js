export default path => {
  return path.map(part => Number.isInteger(part) ? `[${part + 1}]` : part)
    .join('.')
    .replace('.[', '[')
}
