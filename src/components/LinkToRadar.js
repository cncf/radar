import Link from 'next/link'

export default function LinkToRadar({ radar }) {
  return <Link href={`/${radar.key}`}>
    <a>{ radar.longName }</a>
  </Link>
}
