import { createWriteStream, mkdirSync, existsSync } from 'fs';
import { join, parse } from 'path';
import { randomUUID } from 'crypto';

// Interface matching graphql-upload file object
export interface GraphQLUploadFile {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => NodeJS.ReadableStream;
}

export class UploadService {
  private uploadDir: string;

  constructor() {
    // Ensure uploads directory exists relative to where the process runs
    this.uploadDir = join(process.cwd(), 'uploads');
    this.ensureUploadDir();
  }

  private ensureUploadDir() {
    if (!existsSync(this.uploadDir)) {
      mkdirSync(this.uploadDir, { recursive: true });
      console.log(`Created upload directory at: ${this.uploadDir}`);
    }
  }

  async saveFile(file: Promise<GraphQLUploadFile> | GraphQLUploadFile): Promise<string> {
    // graphql-upload returns a Promise that resolves to the file info
    const resolvedFile = await file;
    const { createReadStream, filename } = resolvedFile;
    
    const stream = createReadStream();
    const { ext, name } = parse(filename);
    // Sanitize filename if needed, but here just using uuid for uniqueness
    const uniqueFilename = `${name.replace(/[^a-z0-9]/gi, '_')}-${randomUUID()}${ext}`;
    const filePath = join(this.uploadDir, uniqueFilename);

    return new Promise((resolve, reject) => {
      const writeStream = createWriteStream(filePath);
      stream
        .pipe(writeStream)
        .on('finish', () => resolve(filePath))
        .on('error', (err: Error) => reject(err));
    });
  }
}

export const uploadService = new UploadService();
