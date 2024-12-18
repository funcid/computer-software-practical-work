import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getUser } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const user = await getUser(request);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const userId = parseInt(user.id, 10);

    if (isNaN(userId)) {
      throw new Error('Invalid user ID');
    }

    const result = await prisma.testResult.findFirst({
      where: {
        userId: {
          equals: userId
        }
      },
      orderBy: {
        completedAt: 'desc'
      }
    });

    return NextResponse.json({ result });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
} 