const groupedPoints = points => {
  return {
    adopt: points.filter(point => point.level === 'adopt'),
    trial: points.filter(point => point.level === 'trial'),
    assess: points.filter(point => point.level === 'assess')
  }
}

export default groupedPoints
