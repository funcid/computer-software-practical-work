import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getUser } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const user = await getUser(request);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { testType, score, maxScore } = await request.json();
    const percentage = (score / maxScore) * 100;

    const result = await prisma.testResult.create({
      data: {
        userId: parseInt(user.id, 10),
        testType,
        score,
        maxScore,
        percentage,
      },
    });

    return NextResponse.json(result);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
} 