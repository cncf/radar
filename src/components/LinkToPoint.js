import Link from 'next/link'

export default ({ point }) => {
  return <Link href="/[...point]" as={`/${point.fullKey}`}>
    <a>{ point.name }</a>
  </Link>
}
