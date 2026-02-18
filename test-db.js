const { PrismaClient } = require("@prisma/client");
require("dotenv").config({ path: ".env.local" });

const prisma = new PrismaClient();

async function test() {
  try {
    console.log("Connecting to Database...");
    const count = await prisma.hunter.count();
    console.log("Connection Success! Hunter count:", count);
  } catch (error) {
    console.error("Database Connection Failure:", error.message);
  } finally {
    await prisma.$disconnect();
  }
}

test();
