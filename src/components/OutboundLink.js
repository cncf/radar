import stripUrl from '../helpers/stripUrl'

export default ({ href, title }) => {
  return <a href={href} target="_blank" rel="noopener noreferrer">{title || stripUrl(href)}</a>
}
