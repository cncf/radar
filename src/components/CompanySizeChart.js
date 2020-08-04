import { createRef, useEffect } from 'react'
import Chart from 'chart.js'
import { colors } from '../styles.config'

const range = (lower, upper) => {
  const lowerInt = parseInt(lower) - 1
  const lowerStr = lowerInt >= 1000 ? `${lowerInt.toString().replace(/000$/, 'K')}` : lowerInt

  if (upper === 'max') {
    return `${lowerStr}+`
  }

  const upperInt = parseInt(upper)
  const upperStr = upperInt >= 1000 ? `${upperInt.toString().replace(/000$/, 'K')}` : upperInt

  return `${lowerStr}-${upperStr}`
}

export default function CompanySizeChart({ companies }) {
  const counts = companies.reduce((acc, company) => {
    const key = company.employeesCount
    const count = (acc[key] || 0) + 1
    return { ...acc, [key]: count }
  }, {})

  const sizes = Object.keys(counts).sort()
  const labels = sizes.map(size => {
    const sizeParts = size.split('_')
    const [_, lower, upper] = sizeParts

    if (sizeParts.length === 1) {
      return size
    }

    return range(lower, upper)
  })
  const ref = createRef()

  useEffect(_ => {
    new Chart(ref.current, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            data: sizes.map(size => counts[size]),
            backgroundColor: colors.darkBlue
          }
        ]
      },
      options: {
        scales: {
          xAxes: [{
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
