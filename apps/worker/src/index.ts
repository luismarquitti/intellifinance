import 'dotenv/config';
import { QueueName } from '@intellifinance/jobs';
import { createWorker } from './lib/worker.factory';
import { testProcessor } from './processors/test.processor';

const redisUrl = process.env.REDIS_URL;

if (!redisUrl) {
  console.error('REDIS_URL is not defined in your environment variables.');
  process.exit(1);
}

console.log('Worker starting...');

const mainWorker = createWorker(QueueName.MAIN, testProcessor);

mainWorker.on('completed', (job) => {
  console.log(`Job ${job.id} completed successfully.`);
});

mainWorker.on('failed', (job, err) => {
  console.error(`Job ${job?.id} failed with error: ${err.message}`);
});

process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received: closing workers');
  await mainWorker.close();
});
