import { Fragment } from "react";
import Head from "next/head";

export default (Component, titleFn) => {
  return props => <Fragment>
    <Head>
      <title>{titleFn(props)} | CNCF Radars</title>
    </Head>
    <Component {...props}/>
  </Fragment>
}
