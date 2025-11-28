import { Worker, Processor } from 'bullmq';
import IORedis from 'ioredis';

export function createWorker(queueName: string, processor: Processor) {
  const connection = new IORedis(process.env.REDIS_URL!, {
    maxRetriesPerRequest: null,
  });

  const worker = new Worker(queueName, processor, {
    connection,
    defaultJobOptions: {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 1000,
      },
    },
  });

  return worker;
}
