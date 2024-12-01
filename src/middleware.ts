import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // Защищенные маршруты
  const protectedPaths = ['/tests', '/api/test-results/save', '/profile', '/api/test-results/user'];
  const authPaths = ['/login', '/register'];
  
  const path = request.nextUrl.pathname;
  const token = request.cookies.get('token')?.value || request.headers.get('authorization')?.split(' ')[1];

  // Если пользователь авторизован и пытается зайти на страницы авторизации/регистрации
  if (token && authPaths.some(prefix => path.startsWith(prefix))) {
    return NextResponse.redirect(new URL('/tests', request.url));
  }

  // Проверка защищенных маршрутов
  if (protectedPaths.some(prefix => path.startsWith(prefix))) {
    if (!token) {
      // Если это API запрос, возвращаем ошибку
      if (path.startsWith('/api/')) {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        );
      }
      // Для обычных страниц перенаправляем на логин
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      // Добавляем токен в заголовки для API запросов
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('Authorization', `Bearer ${token}`);

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } catch (error) {
      if (path.startsWith('/api/')) {
        return NextResponse.json(
          { error: 'Invalid token' },
          { status: 401 }
        );
      }
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/tests/:path*',
    '/api/test-results/:path*',
    '/profile',
    '/login',
    '/register'
  ],
}; 