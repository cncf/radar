import { Converter } from 'showdown'
import sanitizeHtml from 'sanitize-html'

export default ({ value }) => {
  const html = (new Converter({simpleLineBreaks: true})).makeHtml(value);
  const sanitizedHtml = sanitizeHtml(html)

  return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
}
