import { ChatOpenAI } from '@langchain/openai';
import { ExtractedTransactionSchema, ExtractedTransaction } from '@intellifinance/types';
import { z } from 'zod';

// Mock data for development without API Key
const MOCK_TRANSACTIONS: ExtractedTransaction[] = [
  {
    date: new Date(),
    amount: -54.32,
    description: "WHOLE FOODS MARKET - Mock",
    category: "Groceries"
  },
  {
    date: new Date(),
    amount: -12.99,
    description: "NETFLIX.COM - Mock",
    category: "Entertainment"
  },
  {
    date: new Date(),
    amount: 2500.00,
    description: "PAYROLL DEPOSIT - Mock",
    category: "Income"
  }
];

export class LlmService {
  private model: ChatOpenAI | null = null;

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (apiKey) {
      this.model = new ChatOpenAI({
        openAIApiKey: apiKey,
        modelName: 'gpt-4o-mini', 
        temperature: 0,
      });
    } else {
      console.warn('OPENAI_API_KEY not found. LlmService will use MOCK MODE.');
    }
  }

  async extractTransactions(text: string): Promise<ExtractedTransaction[]> {
    if (!this.model) {
      console.log('Processing in MOCK MODE: Returning static transactions.');
      // Simulate latency
      await new Promise(resolve => setTimeout(resolve, 1000));
      return MOCK_TRANSACTIONS;
    }

    const schema = z.object({
      transactions: z.array(ExtractedTransactionSchema).describe("List of extracted transactions")
    });

    const structuredModel = this.model.withStructuredOutput(schema);

    try {
      const result = await structuredModel.invoke([
        ["system", "You are a data extraction expert. Extract financial transactions from the provided bank statement text. Ensure dates are ISO formatted strings if possible, or recognizable dates. Amounts should be numbers."],
        ["user", `Extract transactions from this text:\n\n${text.substring(0, 25000)}`]
      ]);

      return result.transactions;
    } catch (error) {
      console.error('LLM Extraction Error:', error);
      throw error;
    }
  }
}

export const llmService = new LlmService();