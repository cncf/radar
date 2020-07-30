import Link from 'next/link'

export default function LinkToRadar({ radar }) {
  return <Link href="/[radar]" as={`/${radar.key}`}>
    <a>{ radar.name }</a>
  </Link>
}
