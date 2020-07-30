import Head from "next/head";

export default (Component, titleFn) => {
  return props => <>
    <Head>
      <title>{titleFn(props)} | CNCF Radars</title>
    </Head>
    <Component {...props}/>
  </>
}
