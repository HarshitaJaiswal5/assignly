import "dotenv/config";
import { prisma } from "./prisma.js";

async function main() {
  console.log("URL:", process.env.DATABASE_URL?.replace(/:.+@/, ":****@"));

  try {
    await prisma.$connect();
    console.log("✅ CONNECTED");

    const result = await prisma.$queryRaw`SELECT NOW()`;

    console.log("✅ RAW QUERY:", result);

    const account = await prisma.account.findUnique({
  where: {
    provider_providerAccountId: {
      provider: "google",
      providerAccountId: "118190215064134284355",
    },
  },
});

console.log("ACCOUNT:", account);

    console.log("✅ ACCOUNT:", account);
  } catch (error) {
    console.error("❌ ERROR:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();