const IndustriesTable = ({ companies }) => {
  const industriesDict = companies.reduce((acc, { industry }) => {
    const count = acc[industry] || 0
    return { ...acc, [industry]: count + 1 }
  }, {})

  const industries = Object.entries(industriesDict).sort((a, b) => b[1] - a[1])

  return <div className="industries">
    <style jsx>{`
      h2 {
        margin-bottom: 1rem;
        text-align: center;
      }
      
      table {
        width: 100%;
      }
      
      td:first-child {
        text-align: left;
        font-weight: bold;
      }
      
      td:last-child {
        text-align: right;
      }
    `}</style>

    <h2>Industries</h2>

    <table className="table is-bordered is-striped">
      <tbody>
        {industries.map(([name, count]) => {
          return <tr key={name}>
            <td>{name}</td>
            <td>{count}</td>
          </tr>
        })}
      </tbody>
    </table>
  </div>
}

export default IndustriesTable
