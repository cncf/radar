import { useState } from 'react'
import Link from 'next/link'
import { colors } from '../styles.config'
import Search from './Search'
import NavLink from './NavLink'
import OutboundLink from './OutboundLink'
import { sizes } from '../styles.config'

export default function Header() {
  const [showMenu, setShowMenu] = useState(false)

  return <nav className="navbar" role="navigation" aria-label="main navigation">
    <style jsx>{`
      .container {
        align-items: flex-start;
      }
    
      nav {
        background: ${colors.darkPurple};
        padding-top: 10px;
        padding-bottom: 10px;
        flex-direction: column;
      }
      
      .navbar-menu {
        background: ${colors.darkPurple};
      }
      
      .navbar-end {
        align-items: flex-start;
      }
      
      @media only screen and (max-width: ${sizes.tablet}px) {
        .navbar-menu {
          text-align: center;
          margin: 10px 25px 0;
          border-top: 1px solid white;
        }
      }
      
      .logo {
        flex-direction: column;
        align-items: flex-start;
        flex-shrink: 1;
      }
      
      h1 {
        margin: 0;
      }
      
      @media only screen and (max-width: ${sizes.mobile}px) {
        h1 {
          font-size: 1.5rem;
        }
      }
      
      nav img {
        max-height: initial;
        padding: 0 -3px;
      }
    `}</style>

    <div className="container">
      <div className="navbar-brand">
        <div className="navbar-item logo">
          <OutboundLink href="https://cncf.io">
            <img src="/cncf-logo.svg" alt="CNCF End User Radar" width="190" />
          </OutboundLink>

          <Link href="/">
            <h1><NavLink className="no-margin">CNCF Technology Radars</NavLink></h1>
          </Link>
        </div>

        <NavLink role="button" onClick={_ => setShowMenu(!showMenu)} className={`navbar-burger ${showMenu && 'is-active'}`} aria-label="menu" aria-expanded="false">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </NavLink>
      </div>

      <div className={`navbar-menu ${showMenu && 'is-active'}`}>
        <div className="navbar-end">
          <Search />
          <Link href="/overview" passHref><NavLink>Technologies Overview</NavLink></Link>
        </div>
      </div>
    </div>
  </nav>
}
