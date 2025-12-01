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

  // 2. Create Demo Account
  const account = await prisma.account.create({
    data: {
      userId: user.id,
      name: "Conta Principal",
      type: AccountType.CHECKING,
      balance: 0, // Will be updated by transactions? Or just set initial?
    },
  });
  console.log(`Created account: ${account.id}`);

  // 3. Create Categories
  const categoriesData = [
    {
      name: "Salário",
      type: CategoryType.INCOME,
      icon: "attach_money",
      color: "#4CAF50",
    },
    {
      name: "Mercado",
      type: CategoryType.EXPENSE,
      icon: "shopping_cart",
      color: "#FF9800",
    },
    {
      name: "Alimentação",
      type: CategoryType.EXPENSE,
      icon: "restaurant",
      color: "#F44336",
    },
    {
      name: "Transporte",
      type: CategoryType.EXPENSE,
      icon: "directions_car",
      color: "#2196F3",
    },
    {
      name: "Moradia",
      type: CategoryType.EXPENSE,
      icon: "home",
      color: "#9C27B0",
    },
    {
      name: "Lazer",
      type: CategoryType.EXPENSE,
      icon: "movie",
      color: "#E91E63",
    },
    {
      name: "Educação",
      type: CategoryType.EXPENSE,
      icon: "school",
      color: "#3F51B5",
    },
    {
      name: "Saúde",
      type: CategoryType.EXPENSE,
      icon: "local_hospital",
      color: "#00BCD4",
    },
    {
      name: "Outros",
      type: CategoryType.EXPENSE,
      icon: "category",
      color: "#9E9E9E",
    },
    {
      name: "Dívidas e empréstimos",
      type: CategoryType.EXPENSE,
      icon: "money_off",
      color: "#795548",
    },
    {
      name: "Condomínio ",
      type: CategoryType.EXPENSE,
      icon: "apartment",
      color: "#607D8B",
    },
    {
      name: "Impostos e Taxas",
      type: CategoryType.EXPENSE,
      icon: "account_balance",
      color: "#FF5722",
    },
    {
      name: "Gás ",
      type: CategoryType.EXPENSE,
      icon: "local_fire_department",
      color: "#FFC107",
    },
    {
      name: "Empréstimos",
      type: CategoryType.INCOME,
      icon: "account_balance_wallet",
      color: "#8BC34A",
    }, // Based on sample data having positive value
    {
      name: "Telefone e Internet",
      type: CategoryType.EXPENSE,
      icon: "wifi",
      color: "#03A9F4",
    },
    {
      name: "Compras",
      type: CategoryType.EXPENSE,
      icon: "shopping_bag",
      color: "#673AB7",
    },
    {
      name: "IPTU",
      type: CategoryType.EXPENSE,
      icon: "domain",
      color: "#FF5722",
    },
  ];

  const categoryMap = new Map<string, string>();

  for (const cat of categoriesData) {
    const createdCat = await prisma.category.create({
      data: {
        ...cat,
        userId: user.id,
      },
    });
    categoryMap.set(cat.name, createdCat.id);
  }
  console.log(`Created ${categoriesData.length} categories`);

  // 4. Load and Parse Transactions
  const seedDataPath = path.join(__dirname, "seed-data.json");
  const rawData = fs.readFileSync(seedDataPath, "utf-8");
  const transactions = JSON.parse(rawData);

  console.log(`Processing ${transactions.length} transactions...`);

  for (const t of transactions) {
    // Parse Date: "30.10.2025" -> ISO
    const [day, month, year] = t.Data.split(".");
    const date = new Date(`${year}-${month}-${day}T00:00:00Z`);

    // Map Category
    let categoryId = categoryMap.get(t.Categoria);
    if (!categoryId) {
      // Fallback to 'Outros' if not found
      categoryId = categoryMap.get("Outros");
      if (!categoryId) throw new Error(`Category 'Outros' not found`);
      console.warn(`Category '${t.Categoria}' not found, using 'Outros'`);
    }

    // Map Status
    const status =
      t["Situação"] === "Pago"
        ? TransactionStatus.COMPLETED
        : TransactionStatus.PENDING;

    // Determine Type based on Value
    const amount = parseFloat(t.Valor);
    const type = amount >= 0 ? TransactionType.INCOME : TransactionType.EXPENSE;

    await prisma.transaction.create({
      data: {
        accountId: account.id,
        categoryId: categoryId,
        date: date,
        amount: amount, // Prisma handles Decimal from number/string
        description: t["Descrição"],
        type: type,
        status: status,
      },
    });
  }

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
