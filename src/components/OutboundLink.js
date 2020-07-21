import stripUrl from '../helpers/stripUrl'

export default ({ href, title, children, ...rest }) => {
  return <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>{children ? children : title || stripUrl(href)}</a>
}
