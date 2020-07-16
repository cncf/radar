import Link from "next/link";
import Search from "./Search";
import { Fragment } from "react";

export default _ => {
  return <Fragment>
    <style jsx>{`
        nav {
          background: #0F1433;
          padding-top: 10px;
          padding-bottom: 10px;
        }
        
        a, a:hover, a:focus, a:visited {
          color: white;
          background: #0F1433;
        }
        
        a:hover {
          color: #e00a6b;
        }
        
        nav a img {
          max-height: initial;
        }
    `}</style>
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="container">
        <div className="navbar-brand">
          <Link href="/">
            <a className="navbar-item">
              <img src="/cncf-logo.svg" alt="CNCF" width="186" height="34"/>
            </a>
          </Link>
        </div>

        <div className="navbar-menu">
          <div className="navbar-end">
            <Search />
            <Link href="/overview"><a className="navbar-item">Technologies Overview</a></Link>
          </div>
        </div>
      </div>
    </nav>
  </Fragment>

}
