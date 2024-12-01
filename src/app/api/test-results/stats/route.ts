import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getUser } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const payload = await getUser(request);
    
    if (!payload) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const userId = parseInt(payload.id, 10);

    const totalResults = await prisma.testResult.count({
      where: { userId }
    });

    const ranges = await Promise.all([
      prisma.testResult.count({
        where: {
          userId,
          percentage: {
            gte: 0,
            lt: 40
          }
        }
      }),
      prisma.testResult.count({
        where: {
          userId,
          percentage: {
            gte: 40,
            lt: 60
          }
        }
      }),
      prisma.testResult.count({
        where: {
          userId,
          percentage: {
            gte: 60,
            lt: 80
          }
        }
      }),
      prisma.testResult.count({
        where: {
          userId,
          percentage: {
            gte: 80,
            lte: 100
          }
        }
      })
    ]).then(counts => {
      return [
        { min: 0, max: 39, count: counts[0], percentage: (counts[0] / totalResults) * 100 },
        { min: 40, max: 59, count: counts[1], percentage: (counts[1] / totalResults) * 100 },
        { min: 60, max: 79, count: counts[2], percentage: (counts[2] / totalResults) * 100 },
        { min: 80, max: 100, count: counts[3], percentage: (counts[3] / totalResults) * 100 }
      ];
    });

    return NextResponse.json({
      totalResults,
      ranges
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
} 