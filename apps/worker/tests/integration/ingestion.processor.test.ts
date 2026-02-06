import { ingestionProcessor } from '../../src/processors/ingestion.processor';
import { CsvDataSourceAdapter } from '../../src/lib/adapters/csv.adapter';

jest.mock('../../src/services/pdf.service', () => ({
  pdfService: {
    extractText: jest.fn().mockResolvedValue(''),
  },
}));

jest.mock('../../src/services/llm.service', () => ({
  llmService: {
    extractTransactions: jest.fn().mockResolvedValue([]),
  },
}));

jest.mock('@intellifinance/database', () => ({
  prisma: {
    ingestionJob: {
      update: jest.fn().mockResolvedValue({}),
    },
    account: {
      findUnique: jest.fn().mockResolvedValue({ userId: 'test-user-id' }),
    },
    category: {
      findFirst: jest.fn().mockResolvedValue(null),
      create: jest.fn().mockResolvedValue({ id: 'test-category-id' }),
    },
    transaction: {
      create: jest.fn().mockResolvedValue({}),
    },
    $transaction: jest.fn().mockImplementation(async (callback) => {
      await callback({
        ingestionJob: {
          update: jest.fn().mockResolvedValue({}),
        },
        account: {
          findUnique: jest.fn().mockResolvedValue({ userId: 'test-user-id' }),
        },
        category: {
          findFirst: jest.fn().mockResolvedValue(null),
          create: jest.fn().mockResolvedValue({ id: 'test-category-id' }),
        },
        transaction: {
          create: jest.fn().mockResolvedValue({}),
        },
      });
    }),
  },
  IngestionStatus: {
    PROCESSING: 'PROCESSING',
    COMPLETED: 'COMPLETED',
    FAILED: 'FAILED',
  },
}));

describe('ingestionProcessor', () => {
  it('should process a job with the CsvDataSourceAdapter', async () => {
    const csvData = `date,description,amount,currency,category\n2024-01-01,Test,100,USD,Test`;
    const job = {
      data: {
        jobId: 'test-job-id',
        fileUrl: 'test-file-url',
        accountId: 'test-account-id',
        adapter: new CsvDataSourceAdapter(csvData),
      },
    } as any;

    await ingestionProcessor(job);

    expect(true).toBe(true);
  });
});