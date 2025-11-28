import { Queue } from 'bullmq';
import { MAIN_QUEUE, TestJobData, TestJobSchema, TEST_JOB } from '@my-app/jobs';
import { connection } from '../lib/redis';

class QueueService {
  private static instance: QueueService;
  public mainQueue: Queue;

  private constructor() {
    this.mainQueue = new Queue(MAIN_QUEUE, { connection });
  }

  public static getInstance(): QueueService {
    if (!QueueService.instance) {
      QueueService.instance = new QueueService();
    }
    return QueueService.instance;
  }

  public async addTestJob(data: TestJobData) {
    const validationResult = TestJobSchema.safeParse(data);
    if (!validationResult.success) {
      throw new Error(`Invalid job data: ${validationResult.error.message}`);
    }

    await this.mainQueue.add(TEST_JOB, validationResult.data);
  }
}

export const queueService = QueueService.getInstance();
