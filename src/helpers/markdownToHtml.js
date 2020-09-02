import ReactDOMServer from 'react-dom/server'
import { Converter } from 'showdown'
import sanitizeHtml from 'sanitize-html'
import LevelTag from '../components/LevelTag'

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
  const html = new Converter({ simpleLineBreaks: false }).makeHtml(text)
  const sanitizedHtml = sanitizeHtml(html, { allowedTags, allowedAttributes, transformTags })
    .replace('<dt>Adopt</dt>', renderLevelTag('adopt'))
    .replace('<dt>Trial</dt>', renderLevelTag('trial'))
    .replace('<dt>Assess</dt>', renderLevelTag('assess'))

  return sanitizedHtml
}
