import { Worker } from 'bullmq';
import { connection } from './connection';
import { MAIN_QUEUE, TEST_JOB } from '@my-app/jobs';
import { testJobProcessor } from './processors/test-job-processor';

class WorkerFactory {
  constructor() {
    this.createWorker(MAIN_QUEUE);
  }

  createWorker(queueName: string) {
    const worker = new Worker(queueName, async job => {
      switch (job.name) {
        case TEST_JOB:
          await testJobProcessor(job);
          break;
        default:
          throw new Error(`Unknown job type: ${job.name}`);
      }
    }, {
      connection,
      defaultJobOptions: {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 1000,
        },
      },
    });

    worker.on('completed', job => {
      console.log(`${job.id} has completed!`);
    });

    worker.on('failed', (job, err) => {
      if (job) {
        console.log(`${job.id} has failed with ${err.message}`);
      } else {
        console.log(`A job has failed with ${err.message}`);
      }
    });

    console.log(`Worker for queue '${queueName}' is running.`);
  }
}

new WorkerFactory();
