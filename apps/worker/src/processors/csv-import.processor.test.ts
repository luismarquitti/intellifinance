import { csvImportProcessor } from './csv-import.processor';
import { prisma } from '@intellifinance/database';
import fs from 'fs';
import { Job } from 'bullmq';

jest.mock('@intellifinance/database', () => {
  const mockPrisma = {
    ingestionJob: {
      update: jest.fn(),
    },
    account: {
      findUnique: jest.fn(),
    },
    category: {
      findFirst: jest.fn(),
      create: jest.fn(),
    },
    transaction: {
      create: jest.fn(),
    }
  };
  return {
    prisma: {
      ...mockPrisma,
      $transaction: jest.fn((callback) => callback(mockPrisma)),
    },
    IngestionStatus: {
        PROCESSING: 'PROCESSING',
        COMPLETED: 'COMPLETED',
        FAILED: 'FAILED'
    }
  };
});

jest.mock('fs');

describe('CSV Import Processor', () => {
    const mockJob = {
        data: {
            jobId: 'job-1',
            fileUrl: '/tmp/test.csv',
            accountId: 'acc-1'
        }
    } as unknown as Job;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should process valid CSV', async () => {
        const csvContent = `Date,Amount,Description,Type,Category
2023-01-01,100,Test Transaction,INCOME,Salary`;
        (fs.readFileSync as jest.Mock).mockReturnValue(csvContent);

        (prisma.account.findUnique as jest.Mock).mockResolvedValue({ id: 'acc-1', userId: 'user-1' });
        (prisma.category.findFirst as jest.Mock).mockResolvedValue(null); // Create new
        (prisma.category.create as jest.Mock).mockResolvedValue({ id: 'cat-1' });

        await csvImportProcessor(mockJob);

        expect(prisma.ingestionJob.update).toHaveBeenCalledWith({
            where: { id: 'job-1' },
            data: { status: 'PROCESSING' }
        });

        expect(prisma.transaction.create).toHaveBeenCalledWith(expect.objectContaining({
            data: expect.objectContaining({
                amount: 100,
                description: 'Test Transaction',
                type: 'INCOME'
            })
        }));

        expect(prisma.ingestionJob.update).toHaveBeenCalledWith(expect.objectContaining({
            where: { id: 'job-1' },
            data: expect.objectContaining({ status: 'COMPLETED' })
        }));
    });
});
