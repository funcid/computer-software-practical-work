import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Получаем общее количество результатов
    const totalResults = await prisma.testResult.count();

    // Получаем агрегированные данные по диапазонам
    const ranges = await Promise.all(
      Array.from({ length: 10 }, async (_, i) => {
        const min = i * 10;
        const max = (i + 1) * 10;
        
        const count = await prisma.testResult.count({
          where: {
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

    // Получаем дополнительную статистику
    const stats = await prisma.testResult.aggregate({
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

    return NextResponse.json({
      ranges,
      stats: {
        total: totalResults,
        averagePercentage: Math.round(stats._avg.percentage || 0),
        averageScore: Math.round(stats._avg.score || 0),
        maxPercentage: Math.round(stats._max.percentage || 0),
        minPercentage: Math.round(stats._min.percentage || 0),
      }
    });
  } catch (error) {
    console.error('Error fetching global test results:', error);
    return NextResponse.json(
      { error: 'Failed to fetch results' }, 
      { status: 500 }
    );
  }
} 