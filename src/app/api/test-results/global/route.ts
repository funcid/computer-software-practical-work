import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Получаем общее количество результатов
    const totalResults = await prisma.testResult.count();

    // Получаем статистику
    const stats = await prisma.testResult.aggregate({
      _avg: {
        percentage: true,
        score: true
      },
      _max: {
        percentage: true
      },
      _min: {
        percentage: true
      }
    });

    // Получаем распределение результатов по диапазонам
    const ranges = [
      { min: 0, max: 20 },
      { min: 21, max: 40 },
      { min: 41, max: 60 },
      { min: 61, max: 80 },
      { min: 81, max: 100 }
    ];

    const rangesWithCounts = await Promise.all(
      ranges.map(async ({ min, max }) => {
        const count = await prisma.testResult.count({
          where: {
            percentage: {
              gte: min,
              lte: max
            }
          }
        });

        return {
          min,
          max,
          count,
          percentage: totalResults > 0 ? (count / totalResults) * 100 : 0
        };
      })
    );

    return NextResponse.json({
      ranges: rangesWithCounts,
      stats: {
        total: totalResults,
        averagePercentage: Math.round(Number(stats._avg.percentage) || 0),
        averageScore: Math.round(Number(stats._avg.score) || 0),
        maxPercentage: Math.round(Number(stats._max.percentage) || 0),
        minPercentage: Math.round(Number(stats._min.percentage) || 0),
      }
    });
  } catch (error) {
    console.error('Error fetching global stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch global stats' },
      { status: 500 }
    );
  }
} 