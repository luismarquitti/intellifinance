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

export const TransactionFilterSchema = z.object({
  accountId: z.string().uuid().optional(),
  categoryId: z.string().uuid().optional(),
  startDate: z.string().datetime({ offset: true }).optional(),
  endDate: z.string().datetime({ offset: true }).optional(),
  type: TransactionTypeSchema.optional(),
});

export type CreateTransactionInput = z.infer<typeof CreateTransactionSchema>;
export type TransactionFilter = z.infer<typeof TransactionFilterSchema>;
