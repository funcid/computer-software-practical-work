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
      // ... остальной код
    ]);

    const results = await prisma.testResult.findMany({
      where: {
        userId
      },
      orderBy: {
        completedAt: 'desc'
      }
    });

    return NextResponse.json({
      results,
      totalResults,
      ranges
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
} 