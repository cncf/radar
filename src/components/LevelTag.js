import { colors } from '../styles.config'

const levelMap = {
  adopt: 'Adopt',
  assess: 'Assess',
  trial: 'Trial'
}

export default function LevelTag({ level, style, text, className }) {
  return <span className={`tag ${className} ${level}-background`} style={{ ...style }}>
    <style jsx>{`
      .tag {
        min-width: ${className === 'is-medium' ? '90px' : '70px'};
        color: #202020 !important;
      }
    `}</style>
    {levelMap[level] || text}
  </span>
}
