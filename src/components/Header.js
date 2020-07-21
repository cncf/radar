import Link from 'next/link'
import { colors } from '../styles.config'
import Search from './Search'
import NavLink from './NavLink'
import OutboundLink from './OutboundLink'

export default _ => {
  return <nav className="navbar" role="navigation" aria-label="main navigation">
    <style jsx>{`
      nav {
        background: ${colors.darkPurple};
        padding-top: 10px;
        padding-bottom: 10px;
        flex-direction: column;
      }
      
      nav img {
        max-height: initial;
      }
      
      .title {
        width: 100%;
        padding-left: 3px;
      }
    `}</style>

    <div className="container">
      <div className="navbar-brand">
        <OutboundLink href="https://cncf.io" className="navbar-item">
          <img src="/cncf-logo.svg" alt="CNCF End User Radar" width="190" />
        </OutboundLink>
      </div>

      <div className="navbar-menu">
        <div className="navbar-end">
          <Search/>
          <Link href="/overview" passHref><NavLink>Technologies Overview</NavLink></Link>
        </div>
      </div>
    </div>

    <div className="container">
      <div className="navbar-brand">
        <Link href="/">
          <h1 className="title"><NavLink>CNCF Technology Radars</NavLink></h1>
        </Link>
      </div>
    </div>
  </nav>
}
