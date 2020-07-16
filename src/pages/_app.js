import 'bulma/css/bulma.css'
import '@fortawesome/fontawesome-free/css/all.css'
import { Fragment, useState } from 'react'
import Head from 'next/head';
import { global } from 'styled-jsx/css'
import SearchContext from '../contexts/SearchContext'
import Nav from '../components/Nav'
import { colors } from '../styles.config'

const globalStyle = global`
  h2 {
    font-size: 2.75rem;
    margin: 0 0 30px;
  }
  
  h3 {
    font-size: 1.7rem;
  }
  
  h2, h3 {
    color: ${colors.darkBlue};
  }
  
  section:nth-child(odd) {
    background-color: #f0f5f7;
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
      <Nav />
      <Component {...pageProps} />
    </SearchContext.Provider>
  </Fragment>
}
