import { verifyToken } from './jwt';
import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

export async function getUser(req: NextRequest) {
  try {
    const token = req.headers.get('authorization')?.split(' ')[1] || 
                 req.cookies.get('token')?.value;

    if (!token) {
      return null;
    }

    const payload = verifyToken(token);
    
    if (!payload || !payload.userId) {
      return null;
    }

    // Получаем пользователя из базы данных
    const user = await prisma.user.findUnique({
      where: {
        id: payload.userId
      }
    });

    if (!user) {
      return null;
    }

    return {
      id: user.id.toString(),
      email: user.email,
      name: user.name
    };
  } catch (error) {
    console.error('Error in getUser:', error);
    return null;
  }
} 