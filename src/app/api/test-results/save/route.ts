import { NextResponse } from 'next/server';
import { getUser } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
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
        userId: user.id,
        testType,
        score,
        maxScore,
        percentage,
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
} 