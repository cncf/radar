import 'bulma/css/bulma.css'
import '@fortawesome/fontawesome-free/css/all.css'
import { Fragment, useState } from 'react'
import Head from 'next/head';
import { global } from 'styled-jsx/css'
import SearchContext from '../contexts/SearchContext'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { colors } from '../styles.config'

const globalStyle = global`
  h2 {
    font-size: 2.75rem;
    margin: 0 0 10px;
  }
  
  h3 {
    font-size: 1.7rem;
  }
  
  h2, h3 {
    color: ${colors.darkBlue};
  }
  
  section:nth-child(even) {
    background-color: #f0f5f7;
  }
  
  body {
    font-size: 1.125rem;
    color: #202020;
  }
  
  a {
    color: ${colors.link};
  }
  
  a:hover {
    color: ${colors.pink};
  }
  
  // Sticky footer
  #__next {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }
  
  // Sticky footer
  main {
    flex: 1;
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
