import { CsvDataSourceAdapter } from '../../src/lib/adapters/csv.adapter';
import { IDataSourceAdapter } from '../../../../packages/types/src/ingestion';

describe('CsvDataSourceAdapter', () => {
  let adapter: IDataSourceAdapter;

  it('should be defined', () => {
    adapter = new CsvDataSourceAdapter('');
    expect(adapter).toBeDefined();
  });

  it('should parse valid CSV data', async () => {
    const csvData = `date,description,amount,currency,category\n2024-01-01,Test,100,USD,Test`;
    adapter = new CsvDataSourceAdapter(csvData);
    const transactions = await adapter.getTransactions();
    expect(transactions).toHaveLength(1);
    expect(transactions[0].description).toBe('Test');
  });

  it('should handle malformed CSV data', async () => {
    const csvData = `date,description,amount,currency,category\n2024-01-01,Test,100,USD`;
    adapter = new CsvDataSourceAdapter(csvData);
    await expect(adapter.getTransactions()).rejects.toThrow();
  });
});
