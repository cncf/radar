import { useState } from 'react'
import Link from 'next/link'
import { colors } from '../styles.config'
import Search from './Search'
import NavLink from './NavLink'
import { sizes } from '../styles.config'

export default function Header() {
  const [showMenu, setShowMenu] = useState(false)

  return <nav className="navbar" role="navigation" aria-label="main navigation">
    <style jsx>{`
      nav {
        background: ${colors.black};
        padding-top: 10px;
        padding-bottom: 10px;
      }
      
      .navbar-menu {
        background: ${colors.black};
      }
      
      @media only screen and (max-width: ${sizes.tablet}px) {
        .navbar-menu {
          text-align: center;
          margin: 10px 25px 0;
          border-top: 1px solid white;
        }
      }
      
      .logo a {
        display: flex;
      }
      
      .logo img {
        width: 230px;
        max-height: initial;
      }

      @media only screen and (max-width: ${sizes.tablet}px) {
        .logo img {
          width: 200px;
        }
      }

      .burger-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
      }
      
      .burger-wrapper .fas {
        font-size: 24px;
      }
    `}</style>

    <div className="container is-max-widescreen">
      <div className="navbar-brand">
        <div className="navbar-item logo">
          <Link href="/">
            <a className="logo-link">
              <img src="/radar-logo.svg" alt="CNCF End User Radar" />
            </a>
          </Link>
        </div>

        <NavLink role="button" onClick={_ => setShowMenu(!showMenu)} className={`navbar-burger ${showMenu && 'is-active'}`} aria-label="menu" aria-expanded="false">
          <div className="burger-wrapper">
            <i className={`fas ${showMenu ? 'fa-times' : 'fa-bars'}`}></i>
          </div>
        </NavLink>
      </div>

      <div className={`navbar-menu ${showMenu && 'is-active'}`}>
        <div className="navbar-end">
          <Search />
          <Link href="/how-it-works" target='_blank' passHref><NavLink>About</NavLink></Link>
          <Link href="/overview" target='_blank' passHref><NavLink>All Results</NavLink></Link>
        </div>
      </div>
    </div>
  </nav>
}
