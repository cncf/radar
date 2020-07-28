import { Fragment, useState } from 'react'
import Head from 'next/head';
import SearchContext from '../contexts/SearchContext'
import SelectedPointContext from '../contexts/SelectedPointContext'
import Header from '../components/Header'
import Footer from '../components/Footer'
import '../styles/style.scss'
import LandscapeItemIframe from '../components/LandscapeItemIframe'

export default ({ Component, pageProps }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPoint, setSelectedPoint] = useState('')

  return <Fragment>
    <Head>
      <title>CNCF Radars</title>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <link rel="icon" href="/favicon.png"/>
    </Head>

    <SearchContext.Provider value={{searchQuery, setSearchQuery}}>
      <SelectedPointContext.Provider value={{selectedPoint, setSelectedPoint}}>
        <LandscapeItemIframe />
        <Header />
        <main>
          <Component {...pageProps} />
        </main>
        <Footer />
      </SelectedPointContext.Provider>
    </SearchContext.Provider>
  </Fragment>
}
