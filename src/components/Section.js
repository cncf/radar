import { sizes } from '../styles.config'

export default function Section({ title, children, background }) {
  const backgroundClass = background ? `${background}-background` : null
  return <section className={`section ${backgroundClass}`} >
    <style jsx>{`
      h2 {
        text-align: center;
        margin-bottom: 1.5rem;
      }
      
      @media only screen and (max-width: ${sizes.mobile}px) {
        h2 {
          margin-bottom: 1rem;
        }

        .section {
          padding: 1.5rem 1rem;
        }
      }
    `}</style>
    <div className="container">
      {title && <h2>{title}</h2>}
      {children}
    </div>
  </section>
}
