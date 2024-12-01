import { NextResponse } from 'next/server';
import { getUser } from '@/lib/auth';
import prisma from '@/lib/prisma';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const user = await getUser(request);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const results = await prisma.testResult.findMany({
      where: {
        userId: user.id
      },
      orderBy: {
        completedAt: 'desc'
      }
    });

    return NextResponse.json({ results });
  } catch (error) {
    console.error('Error fetching user test results:', error);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
} 