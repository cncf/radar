import { createRef, useEffect } from 'react'
import Chart from 'chart.js'
import { colors } from '../styles.config'

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
    if (upper === 'max') {
      return `>${parseInt(lower - 1)}`
    }

    return `>${parseInt(lower - 1)} & ≤${parseInt(upper)}`
  })
  const ref = createRef()

  useEffect(_ => {
    new Chart(ref.current, {
      type: 'horizontalBar',
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
      .chart {
        width: 50%;
        margin-top: 2rem;
        text-align: center;
      }
      
      @media only screen and (max-width: 1024px) {
        .chart {
          width: 100%;
        }
      }
      
      h2 {
        margin-bottom: 1rem;
      }
    `}
    </style>
    <h2>Companies by size</h2>
    <canvas ref={ref} />
  </div>
}
