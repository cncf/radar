import { useState } from 'react'
import Head from 'next/head'
import SearchContext from '../contexts/SearchContext'
import SelectedPointContext from '../contexts/SelectedPointContext'
import Header from '../components/Header'
import Footer from '../components/Footer'
import '../styles/style.scss'
import LandscapeItemIframe from '../components/LandscapeItemIframe'
import OutboundLink from '../components/OutboundLink'
import { colors } from '../styles.config'

const Banner = _ => {
  return <div className="banner">
    <style jsx>{`
      .banner {
        background-color: ${colors.brightBlue};
        padding: 10px;
        text-align: center;
      }
      
      .banner :global(a) {
        color: white;
        text-decoration: underline;
      }
    `}</style>
    <OutboundLink href="https://www.cncf.io/people/end-user-community/">
      Join the CNCF End User Community to vote on the next Tech Radar
    </OutboundLink>
  </div>
}

export default function App({ Component, pageProps }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPoint, setSelectedPoint] = useState('')

  return <>
    <Head>
      <title>CNCF Radars</title>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <link rel="icon" href="/favicon.png"/>
    </Head>

    <SearchContext.Provider value={{searchQuery, setSearchQuery}}>
      <SelectedPointContext.Provider value={{selectedPoint, setSelectedPoint}}>
        <LandscapeItemIframe />
        <Banner />
        <Header />
        <main>
          <Component {...pageProps} />
        </main>
        <Footer />
      </SelectedPointContext.Provider>
    </SearchContext.Provider>
  </>
}
