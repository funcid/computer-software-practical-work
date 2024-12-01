import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Получаем id пользователя
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Получаем общее количество результатов пользователя
    const totalResults = await prisma.testResult.count({
      where: { userId: user.id }
    });

    // Получаем агрегированные данные по диапазонам для пользователя
    const ranges = await Promise.all(
      Array.from({ length: 10 }, async (_, i) => {
        const min = i * 10;
        const max = (i + 1) * 10;
        
        const count = await prisma.testResult.count({
          where: {
            userId: user.id,
            percentage: {
              gte: min,
              lt: max,
            },
          },
        });

        return {
          min,
          max,
          count,
          percentage: totalResults > 0 ? Math.round((count / totalResults) * 100) : 0
        };
      })
    );

    // Получаем дополнительную статистику пользователя
    const stats = await prisma.testResult.aggregate({
      where: { userId: user.id },
      _avg: {
        percentage: true,
        score: true,
      },
      _max: {
        percentage: true,
      },
      _min: {
        percentage: true,
      },
    });

    // Получаем статистику по типам тестов
    const testTypeStats = await prisma.testResult.groupBy({
      by: ['testType'],
      where: { userId: user.id },
      _count: true,
      _avg: {
        percentage: true,
      },
    });

    return NextResponse.json({
      ranges,
      stats: {
        total: totalResults,
        averagePercentage: Math.round(stats._avg.percentage || 0),
        averageScore: Math.round(stats._avg.score || 0),
        maxPercentage: Math.round(stats._max.percentage || 0),
        minPercentage: Math.round(stats._min.percentage || 0),
      },
      testTypes: testTypeStats.map(type => ({
        type: type.testType,
        count: type._count,
        averagePercentage: Math.round(type._avg.percentage || 0)
      }))
    });
  } catch (error) {
    console.error('Error fetching user stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' }, 
      { status: 500 }
    );
  }
} 