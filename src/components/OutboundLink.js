const cleanUpUrl = url => {
  return url.replace(/https?:\/\//, '')
    .replace(/\/$/, '')
}

export default ({ href, title }) => {
  return <a href={href} target="_blank" rel="noopener noreferrer">{title || cleanUpUrl(href)}</a>
}
