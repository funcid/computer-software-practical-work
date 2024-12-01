import { headers } from 'next/headers';
import jwt from 'jsonwebtoken';
import prisma from './prisma';

export async function getUser(request: Request) {
  const headersList = headers();
  const authorization = headersList.get('authorization');

  if (!authorization?.startsWith('Bearer ')) {
    return null;
  }

  const token = authorization.substring(7);
  return await verifyAuth(token);
}

export async function verifyAuth(token: string) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });
    
    if (!user) {
      throw new Error('User not found');
    }
    
    return user;
  } catch {
    throw new Error('Invalid token');
  }
}

export function generateToken(userId: number): string {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET!,
    { expiresIn: '24h' }
  );
} 