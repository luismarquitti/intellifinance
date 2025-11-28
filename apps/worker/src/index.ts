import 'dotenv/config';
import { QueueName } from '@intellifinance/jobs';
import { createWorker } from './lib/worker.factory';
import { testProcessor } from './processors/test.processor';
import { ingestionProcessor } from './processors/ingestion.processor';
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
const ingestionWorker = createWorker(QueueName.INGESTION, ingestionProcessor, connection);

mainWorker.on('completed', (job) => {
  console.log(`Main Job ${job.id} completed successfully.`);
});

mainWorker.on('failed', (job, err) => {
  console.error(`Main Job ${job?.id} failed with error: ${err.message}`);
});

ingestionWorker.on('completed', (job) => {
  console.log(`Ingestion Job ${job.id} completed successfully.`);
});

ingestionWorker.on('failed', (job, err) => {
  console.error(`Ingestion Job ${job?.id} failed with error: ${err.message}`);
});

const gracefulShutdown = async (signal: string) => {
  console.log(`${signal} signal received: closing workers`);
  await Promise.all([
    mainWorker.close(),
    ingestionWorker.close()
  ]);
  await connection.quit();
  process.exit(0);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));