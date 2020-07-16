import { colors } from '../styles.config'

const levelMap = {
  adopt: 'Adopt',
  assess: 'Assess',
  trial: 'Trial'
}

export default ({ level, style }) => {
  return <span className="tag" style={{ ...style, background: colors[level], color: 'white' }}>
    {levelMap[level]}
  </span>
}
