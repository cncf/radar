import { Fragment } from 'react'
import Link from 'next/link'
import { colors } from '../styles.config'
import Search from './Search'
import NavLink from './NavLink'

export default _ => {
  return <Fragment>
    <style jsx>{`
        nav {
          background: ${colors.darkPurple};
          padding-top: 10px;
          padding-bottom: 10px;
        }
        
        nav img {
          max-height: initial;
        }
    `}</style>
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="container">
        <div className="navbar-brand">
          <Link href="/">
            <NavLink><img src="/cncf-logo.svg" alt="CNCF" width="186" height="34"/></NavLink>
          </Link>
        </div>

        <div className="navbar-menu">
          <div className="navbar-end">
            <Search />
            <Link href="/overview" passHref><NavLink>Technologies Overview</NavLink></Link>
          </div>
        </div>
      </div>
    </nav>
  </Fragment>
}
