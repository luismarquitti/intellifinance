import { z } from 'zod';

export const ExtractedTransactionSchema = z.object({
  date: z.string().or(z.date()).transform((val) => new Date(val)),
  amount: z.number().or(z.string().transform((val) => parseFloat(val))),
  description: z.string(),
  category: z.string().optional(),
});

export type ExtractedTransaction = z.infer<typeof ExtractedTransactionSchema>;
