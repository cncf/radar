import { footer } from '../settings'
import { colors, sizes } from '../styles.config'
import OutboundLink from './OutboundLink'

export default function Footer() {
  return <div className="footer">
    <style jsx>{`
        .footer {
          background: ${colors.black};
          padding: 15px;
        }
        
        .container {
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        
        @media only screen and (max-width: ${sizes.mobile}px) {
          .container {
            flex-direction: column;
            align-items: flex-start;
          }
        }
        
        .logo {
          width: 190px;
          height: 35px;
          margin-right: 15px;
        }
        
        .footer :global(.cncf-link) {
          flex-shrink: 0;
        }
        
        p {
          color: white;
          font-size: 0.8rem;
          padding: 0;
          margin: 0;
        }
    `}</style>
    <div className="container is-max-widescreen">
      <OutboundLink href="https://www.cncf.io" className="cncf-link">
        <img src="/cncf-logo.svg" alt="CNCF" className="logo"/>
      </OutboundLink>

      <p>
        {footer.text}
      </p>
    </div>
  </div>
}
