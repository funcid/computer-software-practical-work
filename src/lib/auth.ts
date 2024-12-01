import { verifyToken } from './jwt';
import { NextRequest } from 'next/server';

export async function getUser(req: NextRequest) {
  try {
    // Получаем токен из заголовка Authorization
    const token = req.headers.get('authorization')?.split(' ')[1] || 
                 req.cookies.get('token')?.value;

    if (!token) {
      return null;
    }

    const payload = verifyToken(token);
    
    if (!payload || !payload.id) {
      return null;
    }

    // Убедимся, что ID существует и является числом
    const userId = parseInt(payload.id, 10);
    if (isNaN(userId)) {
      console.error('Invalid user ID in token:', payload.id);
      return null;
    }

    return {
      ...payload,
      id: userId.toString() // Возвращаем ID как строку для совместимости
    };
  } catch (error) {
    console.error('Error in getUser:', error);
    return null;
  }
} 