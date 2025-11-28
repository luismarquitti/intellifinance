import { Job } from 'bullmq';
import { TestJobData, TEST_JOB } from '@my-app/jobs';

export const testJobProcessor = async (job: Job<TestJobData>) => {
  console.log(`Processing job ${job.id} of type ${job.name}`);
  console.log('Job data:', job.data);

  // Simulate some work
  await new Promise(resolve => setTimeout(resolve, 1000));

  console.log(`Finished processing job ${job.id}`);
};
