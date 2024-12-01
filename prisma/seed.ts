import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Создаем тестового пользователя
  const user = await prisma.user.create({
    data: {
      email: 'test@example.com',
      passwordHash: await bcrypt.hash('password123', 10),
      name: 'Test User',
    },
  });

  // Добавляем тестовые результаты
  const testResults = [
    { score: 15, maxScore: 30 },
    { score: 20, maxScore: 30 },
    { score: 25, maxScore: 30 },
    { score: 18, maxScore: 30 },
    { score: 22, maxScore: 30 },
    { score: 28, maxScore: 30 },
    { score: 12, maxScore: 30 },
    { score: 16, maxScore: 30 },
    { score: 24, maxScore: 30 },
    { score: 19, maxScore: 30 },
  ];

  for (const result of testResults) {
    await prisma.testResult.create({
      data: {
        userId: user.id,
        testType: 'general',
        score: result.score,
        maxScore: result.maxScore,
        percentage: (result.score / result.maxScore) * 100,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 