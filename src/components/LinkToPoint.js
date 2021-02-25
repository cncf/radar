import { useContext } from 'react'
import SelectedPointContext from '../contexts/SelectedPointContext'
import OutboundLink from './OutboundLink'

export default function LinkToPoint({ point }) {
  const { setSelectedPoint } = useContext(SelectedPointContext)

  if (point.landscapeId) {
    return <a onClick={_ => setSelectedPoint(point.landscapeId)}>{point.name}</a>
  }

  const href = point.homepage || `https://github.com/${point.repo}`
  return <OutboundLink href={href}>{point.name}</OutboundLink>
}
