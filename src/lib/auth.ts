import { verifyToken } from './jwt';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export async function getUser(req: NextRequest) {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || 
                req.headers.get('authorization')?.split(' ')[1];

  if (!token) {
    return null;
  }

  const payload = verifyToken(token);
  return payload;
} 