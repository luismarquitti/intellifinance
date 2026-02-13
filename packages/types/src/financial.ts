import { z } from "zod";

export const TransactionTypeSchema = z.enum(["INCOME", "EXPENSE", "TRANSFER"]);
export const TransactionStatusSchema = z.enum(["PENDING", "COMPLETED"]);

export const CreateTransactionSchema = z.object({
  amount: z.number(),
  description: z.string().min(1),
  date: z.string().datetime({ offset: true }), // ISO 8601
  type: TransactionTypeSchema,
  status: TransactionStatusSchema,
  accountId: z.string().uuid(),
  categoryId: z.string().uuid(),
});

export const TransactionSchema = CreateTransactionSchema.extend({
  id: z.string().uuid(),
  currency: z.string().min(3).max(3),
  category: z.string().optional(),
  createdAt: z.string().datetime({ offset: true }),
  updatedAt: z.string().datetime({ offset: true }),
});

export const TransactionFilterSchema = z.object({
  accountId: z.string().uuid().optional(),
  categoryId: z.string().uuid().optional(),
  startDate: z.string().datetime({ offset: true }).optional(),
  endDate: z.string().datetime({ offset: true }).optional(),
  type: TransactionTypeSchema.optional(),
});

export const ExtractedTransactionSchema = z.object({
  date: z.coerce.date(),
  amount: z.coerce.number(),
  description: z.string(),
  category: z.string().optional()
});

export type ExtractedTransaction = z.infer<typeof ExtractedTransactionSchema>;
export type CreateTransactionInput = z.infer<typeof CreateTransactionSchema>;
export type Transaction = z.infer<typeof TransactionSchema>;
export type TransactionFilter = z.infer<typeof TransactionFilterSchema>;
