import { Job } from 'bullmq';
import { IngestionJobData } from '@intellifinance/jobs';
import { pdfService } from '../services/pdf.service';
import { llmService } from '../services/llm.service';
import { prisma, IngestionStatus } from '@intellifinance/database';
import { IDataSourceAdapter } from '../../../../packages/types/src/ingestion';

const logger = {
  info: (msg: string, meta?: any) => console.log(JSON.stringify({ level: 'info', msg, timestamp: new Date().toISOString(), ...meta })),
  error: (msg: string, meta?: any) => console.error(JSON.stringify({ level: 'error', msg, timestamp: new Date().toISOString(), ...meta })),
  warn: (msg: string, meta?: any) => console.warn(JSON.stringify({ level: 'warn', msg, timestamp: new Date().toISOString(), ...meta })),
};

export const ingestionProcessor = async (job: Job<IngestionJobData & { adapter?: IDataSourceAdapter }>) => {
  const { jobId, fileUrl, accountId, adapter } = job.data;

  logger.info('Starting ingestion job', { jobId, fileUrl });

  // Update status to PROCESSING
  await prisma.ingestionJob.update({
    where: { id: jobId },
    data: { status: IngestionStatus.PROCESSING }
  });

  try {
    let transactions;
    if (adapter) {
        transactions = await adapter.getTransactions();
        logger.info('Transactions extracted via adapter', { jobId, transactionCount: transactions.length });
    } else {
        // 1. Extract Text
        const text = await pdfService.extractText(fileUrl);
        logger.info('PDF Text extracted', { jobId, textLength: text.length });

        // 2. LLM Extraction
        transactions = await llmService.extractTransactions(text);
        logger.info('LLM Extraction complete', { jobId, transactionCount: transactions.length });
    }


    // 3. Save to DB
    await prisma.$transaction(async (tx) => {
      // Get Account to determine User
      const account = await tx.account.findUnique({ where: { id: accountId } });
      if (!account) throw new Error(`Account ${accountId} not found`);
      const userId = account.userId;

      // Create transactions one by one to handle categories
      for (const t of transactions) {
        let description = t.description;
        if (description.length > 255) {
          logger.warn('Truncating description', { jobId, original: description });
          description = description.substring(0, 255);
        }

        const type = t.amount >= 0 ? 'INCOME' : 'EXPENSE';
        const categoryResult = t.category || (type === 'INCOME' ? 'Income' : 'Uncategorized');

        // Find or Create Category
        let category = await tx.category.findFirst({
          where: {
            userId,
            name: { mode: 'insensitive', equals: categoryResult },
            type: { equals: type === 'INCOME' ? 'INCOME' : 'EXPENSE' }
          }
        });

        if (!category) {
          category = await tx.category.create({
            data: {
              name: categoryResult,
              type: type === 'INCOME' ? 'INCOME' : 'EXPENSE',
              color: type === 'INCOME' ? '#10B981' : '#EF4444', // Green or Red
              icon: type === 'INCOME' ? 'trending-up' : 'shopping-cart',
              userId
            }
          });
        }

        await tx.transaction.create({
          data: {
            accountId,
            date: t.date,
            amount: t.amount,
            description,
            type: type === 'INCOME' ? 'INCOME' : 'EXPENSE', // Ensure matches enum string
            categoryId: category.id,
            sourceFileUrl: fileUrl,
            status: 'COMPLETED'
          }
        });
      }

      // Update Job to COMPLETED
      await tx.ingestionJob.update({
        where: { id: jobId },
        data: {
          status: IngestionStatus.COMPLETED,
          completedAt: new Date(),
          resultSummary: `Successfully extracted ${transactions.length} transactions.`
        }
      });
    });

    logger.info('Job completed successfully', { jobId });

  } catch (error: any) {
    logger.error('Job failed', { jobId, error: error.message, stack: error.stack });

    // Update Job to FAILED
    await prisma.ingestionJob.update({
      where: { id: jobId },
      data: {
        status: IngestionStatus.FAILED,
        completedAt: new Date(),
        errorDetails: {
          technicalError: error.message,
          stack: error.stack,
          userFriendlyMessage: "Failed to process the bank statement."
        }
      }
    });

    throw error;
  }
};