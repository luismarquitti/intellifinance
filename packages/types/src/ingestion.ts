import { Transaction } from './financial';

export interface IDataSourceAdapter {
  getTransactions(): Promise<Transaction[]>;
}