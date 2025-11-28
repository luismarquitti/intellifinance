import { Job } from 'bullmq';
import { IngestionJobData } from '@intellifinance/jobs';
import { pdfService } from '../services/pdf.service';
import { llmService } from '../services/llm.service';
import { prisma, IngestionStatus } from '@intellifinance/database';

const logger = {
  info: (msg: string, meta?: any) => console.log(JSON.stringify({ level: 'info', msg, timestamp: new Date().toISOString(), ...meta })),
  error: (msg: string, meta?: any) => console.error(JSON.stringify({ level: 'error', msg, timestamp: new Date().toISOString(), ...meta })),
  warn: (msg: string, meta?: any) => console.warn(JSON.stringify({ level: 'warn', msg, timestamp: new Date().toISOString(), ...meta })),
};

export const ingestionProcessor = async (job: Job<IngestionJobData>) => {
  const { jobId, fileUrl, accountId } = job.data;

  logger.info('Starting ingestion job', { jobId, fileUrl });

  // Update status to PROCESSING
  await prisma.ingestionJob.update({
    where: { id: jobId },
    data: { status: IngestionStatus.PROCESSING }
  });

  try {
    // 1. Extract Text
    const text = await pdfService.extractText(fileUrl);
    logger.info('PDF Text extracted', { jobId, textLength: text.length });
    
    // 2. LLM Extraction
    const transactions = await llmService.extractTransactions(text);
    logger.info('LLM Extraction complete', { jobId, transactionCount: transactions.length });

    // 3. Save to DB
    await prisma.$transaction(async (tx) => {
       // Create all transactions
       await tx.transaction.createMany({
         data: transactions.map(t => {
           let description = t.description;
           if (description.length > 255) {
             logger.warn('Truncating description', { jobId, original: description });
             description = description.substring(0, 255);
           }

           return {
             accountId,
             date: t.date,
             amount: t.amount,
             description,
             category: t.category,
             sourceFileUrl: fileUrl
           };
         })
       });

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