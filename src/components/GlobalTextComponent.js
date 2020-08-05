import { useContext } from 'react'
import MarkdownComponent from './MarkdownComponent'
import GlobalsContext from '../contexts/GlobalsContext';

const GlobalTextComponent = ({ name, ...props }) => {
  const { texts } = useContext(GlobalsContext)
  const text = texts[name]
  return text && <MarkdownComponent value={text} {...props} />
}

export default GlobalTextComponent
