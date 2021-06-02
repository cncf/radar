import { exec } from 'child_process'
import { watch } from 'chokidar'

let ready = false
let changedAt = null

const prepareRadar = () => {
  return new Promise(resolve => {
    console.log('Preparing Radar')
    exec('yarn prepare-radars', (error, stdout, stderr) => {
      if (error) {
        console.log('FAILED to prepare radars!')
        console.error(stdout);
        console.error(stderr);
      } else {
        console.log('Radars prepared successfully!')
      }
      resolve()
    })
  })
}

const onChange = ts => {
  changedAt = ts
  setTimeout(() => {
    if (ts === changedAt) {
      prepareRadar()
    }
  }, 100)
}

watch('content')
  .on('all', (event, path) => {
    if (ready) {
      console.log(event, path)
      onChange(new Date())
    }
  })
  .on('ready', _ => {
    prepareRadar()
      .then(() => {
        const nextProcess = exec('next dev')
        nextProcess.stdout.pipe(process.stdout)
        ready = true
      })
  })
