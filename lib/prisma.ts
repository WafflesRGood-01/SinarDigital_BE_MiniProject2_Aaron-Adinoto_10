import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () =>
  new PrismaClient({
    datasourceUrl: "file:./dev.db",
  });

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

export default prisma;