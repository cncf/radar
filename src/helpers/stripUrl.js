export default url => {
  if (!url) {
    return null
  }
  return url.replace(/https?:\/\/(www\.)?/, '')
    .replace(/\/$/, '')
}
