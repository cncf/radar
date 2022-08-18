import ReactDOMServer from 'react-dom/server'
import { Converter } from 'showdown'
import sanitizeHtml from 'sanitize-html'
import LevelTag from '../components/LevelTag'
import { level_names } from '../settings'

const renderLevelTag = level => ReactDOMServer.renderToString(<dt><LevelTag level={level} className="is-medium" /></dt>)

const allowedTags = [...sanitizeHtml.defaults.allowedTags, 'dl', 'dt', 'dd']

const allowedAttributes = {
  ...sanitizeHtml.defaults.allowedAttributes,
  a: [...sanitizeHtml.defaults.allowedAttributes.a, 'rel']
}

const transformTags = {
  a: (tagName, attribs) => {
    const target = attribs.href.indexOf('/') === 0 ? null : '_blank'
    const rel = attribs.href.indexOf('/') === 0 ? null : 'noopener noreferrer'
    return {
      tagName,
      attribs: { ...attribs, target, rel }
    }
  }
}

export default text => {
  if (typeof text !== 'string') {
    return text
  }
  const html = new Converter({ simpleLineBreaks: false }).makeHtml(text)
  var sanitizedHtml = sanitizeHtml(html, { allowedTags, allowedAttributes, transformTags })
  for (var label in level_names) {
    const repl = `<dt>${level_names[label]}</dt>`
    sanitizedHtml = sanitizedHtml.replace(repl, renderLevelTag(label))
  }
  return sanitizedHtml
}
