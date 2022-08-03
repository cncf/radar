import { useContext } from 'react'
import SelectedPointContext from '../contexts/SelectedPointContext'
import OutboundLink from './OutboundLink'
import { points } from '../settings'

export default function LinkToPoint({ point }) {
  const { setSelectedPoint } = useContext(SelectedPointContext)

  if (!point.repo && !point.homepage) {
    return point.name
  }

  if (point.landscapeId) {
    return <a onClick={_ => setSelectedPoint(point.landscapeId)}>{point.name}</a>
  }

  const href = point.homepage || `${points.link_prefix}${point.repo}`
  return <OutboundLink href={href}>{point.name}</OutboundLink>
}
