import { IDataSourceAdapter } from '../../../../../packages/types/src/ingestion';
import { Transaction } from '../../../../../packages/types/src/financial';
import * as Papa from 'papaparse';

export class CsvDataSourceAdapter implements IDataSourceAdapter {
  constructor(private readonly csvData: string) {}

  async getTransactions(): Promise<Transaction[]> {
    return new Promise((resolve, reject) => {
      Papa.parse(this.csvData, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: (results) => {
          if (results.errors.length > 0) {
            reject(new Error('Error parsing CSV data'));
          }
          // This is a naive implementation. A real implementation would need to
          // validate the data against the Transaction schema.
          const transactions = results.data as Transaction[];
          resolve(transactions);
        },
      });
    });
  }
}
