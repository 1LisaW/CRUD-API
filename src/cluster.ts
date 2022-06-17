import cluster from 'cluster'
import { cpus } from 'os'
        
(async () => {
  if (cluster.isPrimary) {
    const numCPUs = cpus().length

    console.log(`Master process started`)

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
    }
  } else {
    const id = cluster.worker?.id
    await import('./index');
    console.log(`Worker with id ${process.pid} has been spawned`)
  }
})()
