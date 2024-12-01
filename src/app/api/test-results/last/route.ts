import { NextResponse } from 'next/server';
import { getUser } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const user = await getUser(request);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const lastResult = await prisma.testResult.findFirst({
      where: {
        userId: user.id
      },
      orderBy: {
        completedAt: 'desc'
      },
      select: {
        score: true,
        maxScore: true,
        completedAt: true
      }
    });

    return NextResponse.json({ result: lastResult });
  } catch (error) {
    console.error('Error fetching last test result:', error);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
} 