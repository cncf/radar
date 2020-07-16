import { colors } from '../styles.config'

export default _ => {
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
        
        p {
          color: white;
          font-size: 0.8rem;
          padding: 10px;
        } 
    `}</style>
    <div className="container">
      <div className="navbar-brand">
        <a href="https://www.cncf.io" class="navbar-item"><img src="/cncf-logo.svg" alt="CNCF" width="186" height="34"/></a>
      </div>

      <p>
        CNCF is a leading global provider of services for digital transformation and digital business models.
        CNCF relies exclusively on established Enterprise Open Source technologies. This leads to innovative
        solutions, digital products and portals in agile software projects, and helps build long-lasting, strategic
        partnerships with our customers.
      </p>
    </div>
  </nav>
}
