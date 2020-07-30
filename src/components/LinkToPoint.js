import { useContext } from 'react'
import SelectedPointContext from '../contexts/SelectedPointContext'

export default function LinkToPoint({ point }) {
  const { setSelectedPoint } = useContext(SelectedPointContext)
  return <a onClick={_ => setSelectedPoint(point.landscapeId)}>{point.name}</a>
}
