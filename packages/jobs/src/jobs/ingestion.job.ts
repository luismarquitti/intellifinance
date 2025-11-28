export const INGEST_PDF_JOB = 'ingest-pdf';

export interface IngestionJobData {
  jobId: string;
  fileUrl: string;
  accountId: string;
}
