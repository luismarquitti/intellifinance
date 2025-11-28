import 'dotenv/config';
import { QueueName } from '@intellifinance/jobs';
import { createWorker } from './lib/worker.factory';
import { testProcessor } from './processors/test.processor';
import IORedis from 'ioredis';

const redisUrl = process.env.REDIS_URL;

if (!redisUrl) {
  console.error('REDIS_URL is not defined in your environment variables.');
  process.exit(1);
}

console.log('Worker starting...');

const connection = new IORedis(redisUrl, {
  maxRetriesPerRequest: null,
});

const mainWorker = createWorker(QueueName.MAIN, testProcessor, connection);

mainWorker.on('completed', (job) => {
  console.log(`Job ${job.id} completed successfully.`);
});

mainWorker.on('failed', (job, err) => {
  console.error(`Job ${job?.id} failed with error: ${err.message}`);
});

const gracefulShutdown = async (signal: string) => {
  console.log(`${signal} signal received: closing workers`);
  await mainWorker.close();
  await connection.quit();
  process.exit(0);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
