import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function benchmark() {
  console.log('🚀 Starting Performance Benchmark for Transaction Indices...');

  const queries = [
    {
      name: 'Filter by Account and Date Range',
      query: 'SELECT * FROM "Transaction" WHERE "accountId" = $1 AND "date" BETWEEN $2 AND $3 ORDER BY "date" DESC LIMIT 50',
      params: ['some-account-id', '2023-01-01', '2023-12-31'],
    },
    {
      name: 'Filter by Category and Date Range',
      query: 'SELECT * FROM "Transaction" WHERE "categoryId" = $1 AND "date" BETWEEN $2 AND $3 ORDER BY "date" DESC LIMIT 50',
      params: ['some-category-id', '2023-01-01', '2023-12-31'],
    },
    {
      name: 'Global Date Range Sort',
      query: 'SELECT * FROM "Transaction" WHERE "date" BETWEEN $1 AND $2 ORDER BY "date" DESC LIMIT 50',
      params: ['2023-01-01', '2023-12-31'],
    },
  ];

  for (const q of queries) {
    console.log(`\n📊 Benchmarking: ${q.name}`);
    try {
      const explanation = await prisma.$queryRawUnsafe(`EXPLAIN ANALYZE ${q.query}`, ...q.params);
      console.log('Execution Plan:');
      console.table(explanation);
    } catch (error) {
      console.error(`❌ Error benchmarking ${q.name}:`, error.message);
      console.log('Note: This script requires a running database and a generated Prisma client.');
    }
  }

  await prisma.$disconnect();
}

benchmark().catch((err) => {
  console.error('Fatal benchmark error:', err);
  process.exit(1);
});
