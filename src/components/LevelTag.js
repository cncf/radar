import { colors } from '../styles.config'

const levelMap = {
  adopt: 'Adopt',
  assess: 'Assess',
  trial: 'Trial'
}

export default function LevelTag({ level, style, text, className }) {
  return <span className={`tag ${className}`} style={{ background: colors[level], color: 'white', ...style }}>
    <style jsx>{`
      min-width: ${className === 'is-medium' ? '90px' : '70px'} 
    `}</style>
    {levelMap[level] || text}
  </span>
}
