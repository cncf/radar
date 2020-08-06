import { createRef, useEffect } from 'react'
import Chartist from 'chartist'
import { colors, sizes } from '../styles.config'

const chartOptions = {
  chartPadding: {
    top: 10,
    left: 5,
    right: 5,
    bottom: 10
  },
  axisX: {
    offset: 30,
  },
  axisY: {
    offset: 20,
    onlyInteger: true,
    labelOffset: {
      x: 0,
      y: 5
    }
  }
}

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

  const series = [labels.map(label => counts[label])]

  const ref = createRef()

  useEffect(_ => {
    new Chartist.Bar(ref.current, { labels, series }, chartOptions)
  }, [])

  return <div className="chart">
    <style jsx>{`
      h2 {
        margin-bottom: 1rem;
        text-align: center;
      }
      
      .industries-chart :global(.ct-series-a .ct-bar) {
        stroke: ${colors.darkBlue};
        stroke-width: 30px;
      }
      
      .industries-chart :global(.ct-label) {
        color: #202020;
        fill: #202020;
      }
      
      .industries-chart :global(.ct-grid) {
        stroke-dasharray: 0;
        stroke-width: 1;
        stroke: #d0d0d0;
      }
      
      @media only screen and (max-width: ${sizes.mobile}px) {
        .industries-chart :global(.ct-chart-bar .ct-label.ct-horizontal.ct-end) {
          transform: rotate(-30deg);
          transform-origin: 50% 50%;
          align-items: center;
          white-space: nowrap;
          padding-right: 5px;
        }
      }
    `}
    </style>
    <h2>Companies by size</h2>
    <div className="industries-chart ct-chart ct-octave" ref={ref} />
  </div>
}
