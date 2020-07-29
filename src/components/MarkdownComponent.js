import ReactDOMServer from 'react-dom/server';
import { Converter } from 'showdown'
import sanitizeHtml from 'sanitize-html'
import LevelTag from './LevelTag'

const renderLevelTag = level => ReactDOMServer.renderToString(<dt><LevelTag level={level} className="is-medium" /></dt>)

export default ({ value, ...props }) => {
  const html = new Converter({simpleLineBreaks: false}).makeHtml(value);
  const allowedTags = sanitizeHtml.defaults.allowedTags.concat(['dl', 'dt', 'dd'])
  const sanitizedHtml = sanitizeHtml(html, { allowedTags })
    .replace('<dt>Adopt</dt>', renderLevelTag('adopt'))
    .replace('<dt>Trial</dt>', renderLevelTag('trial'))
    .replace('<dt>Assess</dt>', renderLevelTag('assess'))

  return <div {...props} dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
}
