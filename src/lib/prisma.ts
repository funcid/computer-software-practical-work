import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

type GlobalWithPrisma = typeof globalThis & {
  prisma: PrismaClient | undefined;
};

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!(global as GlobalWithPrisma).prisma) {
    (global as GlobalWithPrisma).prisma = new PrismaClient();
  }
  prisma = (global as GlobalWithPrisma).prisma;
}

export default prisma; 