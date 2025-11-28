import pdf from 'pdf-parse';
import { readFileSync } from 'fs';

export class PdfService {
  async extractText(filePath: string): Promise<string> {
    try {
      const dataBuffer = readFileSync(filePath);
      const data = await pdf(dataBuffer);
      // Basic cleanup of text could happen here
      return data.text;
    } catch (error) {
      console.error('PDF Parse Error:', error);
      throw new Error(`Failed to parse PDF at ${filePath}`);
    }
  }
}

export const pdfService = new PdfService();
