import "dotenv/config";
import {
  PrismaClient,
  AccountType,
  CategoryType,
  TransactionType,
  TransactionStatus,
} from "@prisma/client";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding ...");

  // 1. Create Demo User
  const userEmail = "demo@intellifinance.app";
  const user = await prisma.user.upsert({
    where: { email: userEmail },
    update: {},
    create: {
      email: userEmail,
      fullName: "Demo User",
      passwordHash: "hashed_password_placeholder", // In real app, hash this
    },
  });
  console.log(`Created user: ${user.id}`);

  // Base Data Structure for Lookups
  const accountMap = new Map<string, string>();
  const categoryMap = new Map<string, string>();

  // Ensure "Outros" category exists first as fallback
  const outrosCategory = await prisma.category.create({
    data: {
      name: "Outros",
      type: CategoryType.EXPENSE,
      icon: "category",
      color: "#9E9E9E",
      userId: user.id,
    },
  });
  categoryMap.set("Outros", outrosCategory.id);

  // 4. Load and Parse Transactions
  const seedDataPath = path.join(__dirname, "../../../data-sources/transactions-0126.csv");

  if (!fs.existsSync(seedDataPath)) {
    console.error(`CSV file not found at: ${seedDataPath}`);
    return;
  }

  const rawData = fs.readFileSync(seedDataPath, "utf-8");
  const lines = rawData.split(/\r?\n/);

  // Skip header (line 0)
  const dataLines = lines.slice(1).filter(line => line.trim() !== "");

  console.log(`Processing ${dataLines.length} transactions from CSV...`);

  let processedCount = 0;

  for (const line of dataLines) {
    // Basic CSV split - assuming simplistic CSV without commas in quoted fields for now based on visual inspection
    // But looking at the file, it has "R$ 3.000,00" which contains commas. 
    // We need a smarter regex execution or simple parser.
    // The format seems to be: 
    // Tipo de Conta,Conta/Cartão,Data,Descrição,Categoria,Valor,Situação,Recorrência,Data Primeira Parcela,Data Última Parcela,Parcela,Informações adicionais
    // Value is quoted like "R$ 0,03"

    // Regex to split by comma, ignoring commas inside quotes
    const matches = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
    // Actually a better regex for CSV split:
    // /,(?=(?:(?:[^"]*"){2})*[^"]*$)/

    const columns = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(c => c.trim().replace(/^"|"$/g, ''));

    if (columns.length < 6) continue;

    const [
      tipoConta,      // 0: Tipo de Conta
      contaCartao,    // 1: Conta/Cartão
      dataStr,        // 2: Data (01.01.2026 or 18/02/2025)
      descricao,      // 3: Descrição
      categoria,      // 4: Categoria
      valorStr,       // 5: Valor ("R$ 0,03" or "-R$ 3.660,00")
      situacao,       // 6: Situação
      recorrencia,    // 7: Recorrência
      // ... others
    ] = columns;

    // --- 1. Handle Account ---
    let accountId = accountMap.get(contaCartao);
    if (!accountId) {
      // Check if exists in DB
      const existingAccount = await prisma.account.findFirst({
        where: { name: contaCartao, userId: user.id }
      });

      if (existingAccount) {
        accountId = existingAccount.id;
      } else {
        // Create Account
        const type = tipoConta === 'Cartão de Crédito' ? AccountType.CREDIT_CARD : AccountType.CHECKING;
        const newAccount = await prisma.account.create({
          data: {
            name: contaCartao,
            type: type,
            userId: user.id,
          }
        });
        accountId = newAccount.id;
        console.log(`Created new account: ${contaCartao}`);
      }
      accountMap.set(contaCartao, accountId);
    }

    // --- 2. Handle Category ---
    let categoryId = categoryMap.get(categoria);
    if (!categoryId) {
      // Check if exists in DB
      const existingCategory = await prisma.category.findFirst({
        where: { name: categoria, userId: user.id }
      });

      if (existingCategory) {
        categoryId = existingCategory.id;
      } else {
        // Create Category (Guessing details)
        const newCategory = await prisma.category.create({
          data: {
            name: categoria,
            // Defaulting to EXPENSE, logic could be refined but fine for MVP import
            type: CategoryType.EXPENSE,
            icon: "category", // default
            color: "#607D8B", // default
            userId: user.id
          }
        });
        categoryId = newCategory.id;
        console.log(`Created new category: ${categoria}`);
      }
      categoryMap.set(categoria, categoryId);
    }

    // --- 3. Parse Date ---
    let date: Date;
    if (dataStr.includes(".")) {
      // Format: 01.01.2026
      const [day, month, year] = dataStr.split(".");
      date = new Date(`${year}-${month}-${day}T00:00:00Z`);
    } else if (dataStr.includes("/")) {
      // Format: 18/02/2025
      const [day, month, year] = dataStr.split("/");
      date = new Date(`${year}-${month}-${day}T00:00:00Z`);
    } else {
      console.warn(`Invalid date format for: ${dataStr}, skipping transaction.`);
      continue;
    }

    // --- 4. Parse Amount ---
    // Remove "R$ ", remove dots (thousands), replace comma with dot
    // "R$ 3.000,00" -> 3000.00
    // "-R$ 3.660,00" -> -3660.00
    const cleanedValue = valorStr
      .replace("R$", "")
      .replace(/\./g, "")
      .replace(",", ".")
      .trim();

    const amount = parseFloat(cleanedValue);
    if (isNaN(amount)) {
      console.warn(`Invalid amount format for: ${valorStr}, skipping transaction.`);
      continue;
    }

    // Determine Type (Simpler logic: if > 0 INCOME, else EXPENSE)
    // CSV has negative values for expenses
    const type = amount >= 0 ? TransactionType.INCOME : TransactionType.EXPENSE;

    // Status
    const status = situacao === "Pago" ? TransactionStatus.COMPLETED : TransactionStatus.PENDING;

    // --- 5. Create Transaction ---
    await prisma.transaction.create({
      data: {
        accountId: accountId,
        categoryId: categoryId,
        date: date,
        amount: amount,
        description: descricao || "Sem descrição",
        type: type,
        status: status,
      },
    });

    processedCount++;
  }

  console.log(`Seeding finished. Processed ${processedCount} transactions.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
