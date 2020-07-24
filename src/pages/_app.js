import { Fragment, useState } from 'react'
import Head from 'next/head';
import SearchContext from '../contexts/SearchContext'
import Header from '../components/Header'
import Footer from '../components/Footer'
import '../styles/style.scss'

export default ({ Component, pageProps }) => {
  const [searchQuery, setSearchQuery] = useState('')

  return <Fragment>
    <Head>
      <title>CNCF Radars</title>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <link rel="icon" href="/favicon.png"/>
    </Head>

    <SearchContext.Provider value={{searchQuery, setSearchQuery}}>
      <Header />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
    </SearchContext.Provider>
  </Fragment>
}
