const path = require('path')
const bundleAnalyzerPlugin = require('@next/bundle-analyzer')
const styles = require(path.join(process.cwd(), 'src', 'styles.config'))
const loadYaml = require('./src/helpers/loadYaml')

const prependData = Object.entries(styles).map(([category, values]) => {
  const valuesStr = Object.entries(values)
    .map(([key, value]) => [key, Array.isArray(value) ? `(${value})` : value])
    .map(([key, value]) => `"${key}": ${value}`)
    .join(', ')

  return `$${category}: (${valuesStr});`
}).join(' ')

const enabled = !!process.env.ANALYZE
const withBundleAnalyzer = bundleAnalyzerPlugin({ enabled })

module.exports = withBundleAnalyzer({
  sassOptions: { prependData },
  env: {
    globals: JSON.stringify({ texts: loadYaml('texts.yml') })
  }
})
