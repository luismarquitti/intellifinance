export type Transaction = {
    id: string;
    accountId: string;
    userId: string;
    amount: number;
    type: 'INCOME' | 'EXPENSE';
    date: Date;
    description?: string;
    category?: string;
    createdAt: Date;
    updatedAt: Date;
};
