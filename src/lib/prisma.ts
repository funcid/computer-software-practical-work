import { PrismaClient } from '@prisma/client';

declare global {
  let prisma: PrismaClient | undefined;
}

type GlobalWithPrisma = typeof globalThis & {
  prisma: PrismaClient | undefined;
};

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!(global as GlobalWithPrisma).prisma) {
    (global as GlobalWithPrisma).prisma = new PrismaClient();
  }
  prisma = (global as GlobalWithPrisma).prisma as PrismaClient;
}

export default prisma; 