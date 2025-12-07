import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Create categories
  const cat1 = await prisma.category.create({
    data: {
      name: "Electronics",
      products: {
        create: [
          { name: "Phone", price: 5000, description: "Smartphone" },
          { name: "Laptop", price: 15000, description: "Gaming laptop" }
        ]
      }
    }
  });

  const cat2 = await prisma.category.create({
    data: {
      name: "Food",
      products: {
        create: [
          { name: "Pizza", price: 300, description: "Cheese pizza" },
          { name: "Burger", price: 120, description: "Double beef" }
        ]
      }
    }
  });

  console.log("Seeding done!");
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());