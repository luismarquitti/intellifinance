import { z } from 'zod';

export const TEST_JOB = 'test-job';

export const TestJobSchema = z.object({
  message: z.string(),
});

export type TestJobData = z.infer<typeof TestJobSchema>;
