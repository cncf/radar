import css from 'styled-jsx/css'
import { colors } from '../styles.config'
import GlobalTextComponent from './GlobalTextComponent'

export default function Footer() {
  const { className, styles } = css.resolve`
    * :global(p) {
      color: white;
      font-size: 0.8rem;
      padding: 10px;
      margin: 0;
    } 
  `

  return <nav className="navbar footer">
    <style jsx>{`
        nav {
          background: ${colors.darkPurple};
          padding-top: 10px;
          padding-bottom: 10px;
        }
        
        img {
          max-height: initial;
        }
    `}</style>
    {styles}
    <div className="container">
      <div className="navbar-brand">
        <a href="https://www.cncf.io" className="navbar-item"><img src="/cncf-logo.svg" alt="CNCF" width="186" height="34"/></a>
      </div>

      <GlobalTextComponent name="footer" className={className} />
    </div>
  </nav>
}
