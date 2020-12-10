export default path => {
  return path.replace('[', '.')
    .replace(']', '')
    .split('.')
    .map(part => isNaN(part) ? part : parseInt(part))
}
