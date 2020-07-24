export default ({ title, children }) => {
  return <section className="section">
    <style jsx>{`
      h2 {
        text-align: center;
        margin-bottom: 1.5rem;
      }
    `}</style>
    <div className="container">
      {title && <h2>{title}</h2>}
      {children}
    </div>
  </section>
}
