import Head from "next/head";
import { short_ident } from '../settings'

export default function withTitle(Component, titleFn) {
  return props => <>
    <Head>
      <title>{titleFn(props)} | {short_ident} Radars</title>
    </Head>
    <Component {...props}/>
  </>
}
