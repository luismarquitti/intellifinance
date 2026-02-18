import { ingestionResolvers } from './ingestion.resolver';
import { prisma } from '@intellifinance/database';
import { queueService } from '../../services/queue.service';
import { uploadService } from '../../services/upload.service';

jest.mock('@intellifinance/database', () => ({
  prisma: {
    ingestionJob: {
      create: jest.fn(),
      findUnique: jest.fn(),
    },
  },
}));

jest.mock('../../services/queue.service', () => ({
  queueService: {
    addIngestionJob: jest.fn(),
  },
}));

jest.mock('../../services/upload.service', () => ({
  uploadService: {
    saveFile: jest.fn(),
  },
}));

describe('Ingestion Resolvers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should upload statement and queue job', async () => {
    const mockFile = Promise.resolve({
      filename: 'test.csv',
      mimetype: 'text/csv',
      encoding: 'utf-8',
      createReadStream: jest.fn(),
    });
    const accountId = 'acc-1';
    const filePath = '/uploads/test.csv';
    const mockJob = { id: 'job-1', status: 'PENDING' };

    (uploadService.saveFile as jest.Mock).mockResolvedValue(filePath);
    (prisma.ingestionJob.create as jest.Mock).mockResolvedValue(mockJob);

    const result = await ingestionResolvers.Mutation.uploadStatement({}, { file: mockFile, accountId });

    expect(uploadService.saveFile).toHaveBeenCalledWith(mockFile);
    expect(prisma.ingestionJob.create).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({
        accountId,
        fileUrl: filePath,
        status: 'PENDING' // Should match Enum in implementation but here string is fine for mock
      })
    }));
    expect(queueService.addIngestionJob).toHaveBeenCalledWith({
      jobId: 'job-1',
      fileUrl: filePath,
      accountId,
    });
    expect(result).toEqual(mockJob);
  });
});
