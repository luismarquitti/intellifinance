import 'dotenv/config';
import { Queue } from 'bullmq';
import IORedis from 'ioredis';
import {
  QueueName,
  TEST_JOB,
  TestJobData,
  INGEST_PDF_JOB,
  IngestionJobData
} from '@intellifinance/jobs';

const redisUrl = process.env.REDIS_URL;

if (!redisUrl) {
  throw new Error('REDIS_URL is not defined in your environment variables.');
}

const connection = new IORedis(redisUrl, {
  maxRetriesPerRequest: null,
});

const mainQueue = new Queue(QueueName.MAIN, { connection });
const ingestionQueue = new Queue(QueueName.INGESTION, { connection });

export class QueueService {
  public async addTestJob(data: TestJobData): Promise<void> {
    await mainQueue.add(TEST_JOB, data);
  }

  public async addIngestionJob(data: IngestionJobData): Promise<void> {
    await ingestionQueue.add(INGEST_PDF_JOB, data);
  }
}

export const queueService = new QueueService();