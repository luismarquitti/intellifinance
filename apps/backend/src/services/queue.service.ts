import 'dotenv/config';
import { Queue } from 'bullmq';
import IORedis from 'ioredis';
import {
  QueueName,
  TEST_JOB,
  TestJobData,
} from '@intellifinance/jobs';

const redisUrl = process.env.REDIS_URL;

if (!redisUrl) {
  throw new Error('REDIS_URL is not defined in your environment variables.');
}

const connection = new IORedis(redisUrl, {
  maxRetriesPerRequest: null,
});

const mainQueue = new Queue(QueueName.MAIN, { connection });

export class QueueService {
  public async addTestJob(data: TestJobData): Promise<void> {
    await mainQueue.add(TEST_JOB, data);
  }

  // Add other job types here
}

export const queueService = new QueueService();
