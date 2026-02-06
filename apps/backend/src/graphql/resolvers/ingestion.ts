import { IngestionQueue } from '@intellifinance/jobs';
import { v4 as uuidv4 } from 'uuid';
import { createWriteStream } from 'fs';
import { resolve } from 'path';
import { finished } from 'stream/promises';
import { prisma } from '@intellifinance/database';

export const ingestionResolvers = {
  Mutation: {
    uploadStatement: async (_, { file, accountId }) => {
      const { createReadStream, filename, mimetype } = await file;
      const stream = createReadStream();
      const jobId = uuidv4();
      const path = resolve('uploads', `${jobId}-${filename}`);
      const out = createWriteStream(path);
      await finished(stream.pipe(out));

      const job = await IngestionQueue.add('ingestion', {
        jobId,
        fileUrl: path,
        accountId,
      });

      const ingestionJob = await prisma.ingestionJob.create({
        data: {
          id: jobId,
          fileUrl: path,
          accountId,
          status: 'PENDING',
        }
      })

      return ingestionJob;
    },
  },
};