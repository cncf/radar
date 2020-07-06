import "bulma/css/bulma.css"
import "../styles/index.css"

export default ({ Component, pageProps }) => <section className="section">
  <div className="container is-fluid">
    <Component {...pageProps} />
  </div>
</section>
