import 'bulma/css/bulma.css'
import '@fortawesome/fontawesome-free/css/all.css'
import { Fragment, useState } from 'react'
import Head from 'next/head';
import SearchContext from '../contexts/SearchContext'
import Nav from '../components/Nav'

export default ({ Component, pageProps }) => {
  const [searchQuery, setSearchQuery] = useState('')

  return <Fragment>
    <Head>
      <title>CNCF Radars</title>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <link rel="icon" href="/favicon.png"/>
    </Head>

    <SearchContext.Provider value={{searchQuery, setSearchQuery}}>
      <Nav />
      <Component {...pageProps} />
    </SearchContext.Provider>
  </Fragment>
}
