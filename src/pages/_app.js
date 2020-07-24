import { Fragment, useState } from 'react'
import Head from 'next/head';
import { global } from 'styled-jsx/css'
import SearchContext from '../contexts/SearchContext'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { colors } from '../styles.config'
import '../styles/style.scss'

const globalStyle = global`
  h2, h3 {
    color: ${colors.darkBlue};
  }
  
  a {
    color: ${colors.link};
  }
  
  a:hover {
    color: ${colors.pink};
  }
`

export default ({ Component, pageProps }) => {
  const [searchQuery, setSearchQuery] = useState('')

  return <Fragment>
    <Head>
      <title>CNCF Radars</title>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <link rel="icon" href="/favicon.png"/>
    </Head>

    <SearchContext.Provider value={{searchQuery, setSearchQuery}}>
      <style jsx global>{globalStyle}</style>
      <Header />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
    </SearchContext.Provider>
  </Fragment>
}
