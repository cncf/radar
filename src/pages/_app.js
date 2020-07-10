import "bulma/css/bulma.css"
import { Fragment } from "react";
import Head from "next/head";

export default ({ Component, pageProps }) => {
  return <Fragment>
    <Head>
      <title>CNCF Radars</title>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <link rel="icon" href="/favicon.ico"/>
    </Head>
    <Component {...pageProps} />
  </Fragment>
}
