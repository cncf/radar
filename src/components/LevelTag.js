const levelMap = {
  adopt: 'Adopt',
  assess: 'Assess',
  trial: 'Trial'
}

const colorMap = {
  adopt: '#041087',
  trial: '#235C6F',
  assess: '#6CBFAF'
}

export default ({ level, style }) => {
  return <span className="tag" style={{ ...style, background: colorMap[level], color: 'white' }}>
    {levelMap[level]}
  </span>
}
