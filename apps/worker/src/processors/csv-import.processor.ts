import { Job } from 'bullmq';
import { IngestionJobData } from '@intellifinance/jobs';
import { prisma, IngestionStatus, TransactionType } from '@intellifinance/database';
import Papa from 'papaparse';
import fs from 'fs';

const logger = {
  info: (msg: string, meta?: any) => console.log(JSON.stringify({ level: 'info', msg, timestamp: new Date().toISOString(), ...meta })),
  error: (msg: string, meta?: any) => console.error(JSON.stringify({ level: 'error', msg, timestamp: new Date().toISOString(), ...meta })),
  warn: (msg: string, meta?: any) => console.warn(JSON.stringify({ level: 'warn', msg, timestamp: new Date().toISOString(), ...meta })),
};

interface CsvTransaction {
  Date: string;
  Amount: string;
  Description: string;
  Type: string; // INCOME, EXPENSE, TRANSFER
  Category: string;
}

export const csvImportProcessor = async (job: Job<IngestionJobData>) => {
  const { jobId, fileUrl, accountId } = job.data;

  logger.info('Starting CSV import job', { jobId, fileUrl });

  // Update status to PROCESSING
  await prisma.ingestionJob.update({
    where: { id: jobId },
    data: { status: IngestionStatus.PROCESSING }
  });

  try {
    const fileContent = fs.readFileSync(fileUrl, 'utf-8');

    const parseResult = Papa.parse<CsvTransaction>(fileContent, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (h) => h.trim()
    });

    if (parseResult.errors.length > 0) {
       logger.warn('CSV parsing errors encountered', { jobId, errors: parseResult.errors });
    }

    const transactions = parseResult.data;
    logger.info('CSV parsed', { jobId, count: transactions.length });

    await prisma.$transaction(async (tx) => {
      const account = await tx.account.findUnique({ where: { id: accountId } });
      if (!account) throw new Error(`Account ${accountId} not found`);
      const userId = account.userId;

      for (const t of transactions) {
        // Validation / Normalization
        const amount = parseFloat(t.Amount);
        if (isNaN(amount)) {
            logger.warn('Skipping invalid amount', { jobId, row: t });
            continue;
        }

        const date = new Date(t.Date);
        if (isNaN(date.getTime())) {
            logger.warn('Skipping invalid date', { jobId, row: t });
            continue;
        }

        const typeStr = t.Type?.toUpperCase();
        let type: TransactionType = 'EXPENSE';
        if (typeStr === 'INCOME') type = 'INCOME';
        else if (typeStr === 'TRANSFER') type = 'TRANSFER';

        const categoryName = t.Category || (type === 'INCOME' ? 'Income' : 'Uncategorized');

        // Find or Create Category
        let category = await tx.category.findFirst({
            where: {
              userId,
              name: { mode: 'insensitive', equals: categoryName },
              type: { equals: type === 'INCOME' ? 'INCOME' : 'EXPENSE' }
            }
        });

        if (!category) {
            category = await tx.category.create({
                data: {
                    name: categoryName,
                    type: type === 'INCOME' ? 'INCOME' : 'EXPENSE',
                    color: type === 'INCOME' ? '#10B981' : '#EF4444',
                    icon: type === 'INCOME' ? 'trending-up' : 'shopping-cart',
                    userId
                }
            });
        }

        await tx.transaction.create({
            data: {
                accountId,
                date: date,
                amount: Math.abs(amount), // Amount stored as positive, type determines sign usually, but schema has separate Type enum.
                description: t.Description || 'No description',
                type: type,
                categoryId: category.id,
                sourceFileUrl: fileUrl,
                status: 'COMPLETED'
            }
        });
      }

      await tx.ingestionJob.update({
        where: { id: jobId },
        data: {
          status: IngestionStatus.COMPLETED,
          completedAt: new Date(),
          resultSummary: `Successfully imported ${transactions.length} transactions.`
        }
      });
    });

  } catch (error: any) {
    logger.error('CSV Import Job failed', { jobId, error: error.message, stack: error.stack });

    await prisma.ingestionJob.update({
        where: { id: jobId },
        data: {
            status: IngestionStatus.FAILED,
            completedAt: new Date(),
            errorDetails: {
                message: error.message
            }
        }
    });
    throw error;
  }
};
