export type FinancialAccount = {
  id: string;
  userId: string;
  name: string;
  type: 'CHECKING' | 'SAVINGS' | 'CREDIT_CARD' | 'INVESTMENT' | 'LOAN' | 'MORTGAGE';
  institution: string;
  createdAt: Date;
  updatedAt: Date;
};
