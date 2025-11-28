import { z } from 'zod';

export const TEST_JOB = 'TEST_JOB';

export const TestJobSchema = z.object({
  message: z.string(),
});

export type TestJobData = z.infer<typeof TestJobSchema>;
