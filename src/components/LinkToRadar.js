import Link from 'next/link'

export default ({ radar }) => {
  return <Link href="/[radar]" as={`/${radar.key}`}>
    <a>{ radar.name }</a>
  </Link>
}
