import { Converter } from 'showdown'
import sanitizeHtml from 'sanitize-html'

export default ({ value, ...props }) => {
  const html = (new Converter({simpleLineBreaks: false})).makeHtml(value);
  const sanitizedHtml = sanitizeHtml(html)

  return <div {...props} dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
}
