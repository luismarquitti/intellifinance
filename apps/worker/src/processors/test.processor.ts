import { Job } from 'bullmq';
import { TEST_JOB, TestJobData, TestJobSchema } from '@intellifinance/jobs';

export const testProcessor = async (job: Job) => {
  if (job.name === TEST_JOB) {
    try {
      const data: TestJobData = TestJobSchema.parse(job.data);
      console.log(`Processing TEST_JOB with message: "${data.message}"`);
      // Simulate some work
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return { status: 'completed' };
    } catch (error) {
      console.error('Data validation failed for TEST_JOB', error);
      throw new Error('Invalid job data');
    }
  } else {
    console.warn(`Unknown job name: ${job.name}`);
    throw new Error(`Unknown job: ${job.name}`);
  }
};
