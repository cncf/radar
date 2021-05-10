import { exec } from 'child_process'
import { watch } from 'chokidar'

let ready = false
let changedAt = null

const prepareRadar = () => {
  return new Promise(resolve => {
    console.log('Preparing Radar')
    const prepareProcess = exec('yarn prepare-radars')
    prepareProcess.stdout.pipe(process.stdout);
    prepareProcess.on('exit', code => {
      if  (code === 0) {
        console.log('Radars Prepared Successfully!')
        resolve()
      } else {
        console.log('FAILED To Prepare Radars!')
        resolve()
      }
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
