import { createRef, useEffect } from 'react'
import Chart from 'chart.js'
import { colors } from '../styles.config'

const range = (lower, upper) => {
  if (!lower && !upper) {
    return
  }

  const lowerStr = lower >= 1000 ? `${lower.toString().replace(/000$/, 'K')}` : lower

  if (upper >= 1000000) {
    return `${lower}+`
  }

  const upperStr = upper >= 1000 ? `${upper.toString().replace(/000$/, 'K')}` : upper

  return `${lowerStr}-${upperStr}`
}

export default function CompanySizeChart({ companies }) {
  const counts = companies.reduce((acc, company) => {
    const key = range(...company.employeesRange)
    const count = (acc[key] || 0) + 1
    return { ...acc, [key]: count }
  }, {})

  const labels = companies.map(company => company.employeesRange)
    .sort((a, b) => a[0] - b[0])
    .reduce((acc, sizes) => {
      const label = range(...sizes)
      return label && acc.indexOf(label) === -1 ? [...acc, label] : acc;
    }, [])

  const ref = createRef()

  useEffect(_ => {
    new Chart(ref.current, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            data: labels.map(label => counts[label]),
            backgroundColor: colors.darkBlue
          }
        ]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        }
      }
    });
  }, [])

  return <div className="chart">
    <style jsx>{`
      h2 {
        margin-bottom: 1rem;
        text-align: center;
      }
    `}
    </style>
    <h2>Companies by size</h2>
    <canvas ref={ref} />
  </div>
}
