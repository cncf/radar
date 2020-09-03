import { useState } from 'react'

const IndustriesTable = ({ companies }) => {
  const [collapsed, setCollapsed] = useState(true)
  const toggleCollapsed = _ => setCollapsed(!collapsed)

  const industriesDict = companies.reduce((acc, { industry }) => {
    const count = acc[industry] || 0
    return { ...acc, [industry]: count + 1 }
  }, {})

  const industries = Object.entries(industriesDict).sort((a, b) => b[1] - a[1])
    .filter((_, idx) => collapsed ? idx < 5 : true)

  return <div className="industries">
    <style jsx>{`
      .industries {
        text-align: center;
      }
      
      .industries table {
        width: 100%;
        font-size: 0.95rem;
        margin-bottom: 0.5rem;
      }
      
      td:first-child {
        text-align: left;
        font-weight: bold;
      }
      
      td:last-child {
        text-align: right;
      }
    `}</style>

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
    <a onClick={toggleCollapsed}>Show { collapsed ? 'More' : 'Less' }</a>
  </div>
}

export default IndustriesTable
