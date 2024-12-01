'use client';
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import GlobalTestsHistogram from '@/components/GlobalTestsHistogram';
import Cookies from 'js-cookie';

interface LastTestResult {
  score: number;
  maxScore: number;
  completedAt: string;
}

interface Range {
  min: number;
  max: number;
  count: number;
  percentage: number;
}

interface Stats {
  total: number;
  averagePercentage: number;
  averageScore: number;
  maxPercentage: number;
  minPercentage: number;
}

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [lastResult, setLastResult] = useState<LastTestResult | null>(null);
  const [globalStats, setGlobalStats] = useState<{ ranges: Range[]; stats: Stats }>();
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token') || localStorage.getItem('token');
    setIsAuthenticated(!!token);

    if (token) {
      fetch('/api/test-results/last', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          if (data.result) {
            setLastResult(data.result);
          }
        })
        .catch(err => console.error('Error fetching last result:', err));
    }

    const fetchGlobalStats = async () => {
      try {
        const res = await fetch('/api/test-results/global');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setGlobalStats(data);
      } catch (err) {
        console.error('Error fetching global stats:', err);
      }
    };

    fetchGlobalStats();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      Cookies.remove('token');
      localStorage.removeItem('token');
      setIsAuthenticated(false);
      setLastResult(null);
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Шапка */}
        <header className="text-center mb-16 relative">
          {isAuthenticated && (
            <div className="absolute right-0 top-0 flex gap-4">
              <Link
                href="/profile"
                className="text-sm text-white bg-blue-600 hover:bg-blue-700 px-6 py-2.5 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Профиль
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm text-white bg-red-500 hover:bg-red-600 px-6 py-2.5 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Выйти
              </button>
            </div>
          )}
          <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Компьютер и его ПО
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Интерактивная система для изучения компьютерного оборудования и программного обеспечения
          </p>
        </header>

        {/* Последний результат теста */}
        {isAuthenticated && lastResult && (
          <div className="mb-12 max-w-lg mx-auto transform hover:scale-105 transition-all duration-300">
            <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-xl backdrop-blur-sm shadow-xl border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                    <span className="text-xl text-white font-bold">
                      {Math.round((lastResult.score / lastResult.maxScore) * 100)}%
                    </span>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Последний результат
                    </div>
                    <div className="font-semibold text-gray-800 dark:text-gray-200">
                      {lastResult.score} из {lastResult.maxScore} баллов
                    </div>
                  </div>
                </div>
                <Link
                  href="/tests"
                  className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2 font-medium"
                >
                  <span>Пройти снова</span>
                  <span className="text-lg">→</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Основные разделы */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Link 
            href="/theory"
            className="group relative overflow-hidden rounded-2xl bg-white/70 dark:bg-gray-800/70 shadow-xl hover:shadow-2xl transition-all duration-500 p-8 backdrop-blur-sm border border-gray-100 dark:border-gray-700 transform hover:-translate-y-1"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/20 dark:to-blue-800/20 rounded-bl-[100px] transform translate-x-10 -translate-y-10 group-hover:translate-x-8 group-hover:-translate-y-8 transition-transform duration-500"></div>
            <div className="relative">
              <span className="text-5xl mb-6 block">📚</span>
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Теоретический материал
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Изучите основы компьютерного оборудования, программного обеспечения и сетевых технологий
              </p>
              <div className="text-blue-600 dark:text-blue-400 group-hover:translate-x-2 transition-transform duration-300 flex items-center gap-2">
                Начать изучение
                <span className="text-lg">→</span>
              </div>
            </div>
          </Link>

          <Link 
            href={isAuthenticated ? "/tests" : "/login"}
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-xl hover:shadow-2xl transition-all duration-500 p-8 transform hover:-translate-y-1"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-bl-[100px] transform translate-x-10 -translate-y-10 group-hover:translate-x-8 group-hover:-translate-y-8 transition-transform duration-500"></div>
            <div className="relative">
              <span className="text-5xl mb-6 block">✍️</span>
              <h2 className="text-2xl font-bold mb-4 text-white">
                {isAuthenticated ? "Пройти тестирование" : "Войти для тестирования"}
              </h2>
              <p className="text-blue-50 mb-6 leading-relaxed">
                {isAuthenticated 
                  ? "Проверьте свои знания с помощью интерактивных тестов"
                  : "Войдите в систему, чтобы получить доступ к тестированию"
                }
              </p>
              <div className="text-white group-hover:translate-x-2 transition-transform duration-300 flex items-center gap-2">
                {isAuthenticated ? "Начать тест" : "Войти"}
                <span className="text-lg">→</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Методические материалы */}
        <Link 
          href="/guide"
          className="block rounded-2xl bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 p-8 shadow-xl hover:shadow-2xl transition-all duration-500 mb-16 backdrop-blur-sm border border-gray-100 dark:border-gray-700 transform hover:-translate-y-1"
        >
          <div className="max-w-3xl mx-auto">
            <span className="text-5xl mb-6 block">📖</span>
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
              Методические материалы
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              Изучите рекомендации по эффективному освоению материала, планированию обучения и подготовке к тестированию
            </p>
            <div className="text-blue-600 dark:text-blue-400 flex items-center gap-2">
              Перейти к рекомендациям
              <span className="text-lg">→</span>
            </div>
          </div>
        </Link>

        {/* Статистика */}
        <section className="mb-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                Статистика результатов
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                Распределение результатов всех тестов
              </p>
            </div>
            <div className="bg-white/70 dark:bg-gray-800/70 rounded-2xl shadow-xl p-8 backdrop-blur-sm border border-gray-100 dark:border-gray-700">
              <GlobalTestsHistogram 
                ranges={globalStats?.ranges} 
                stats={globalStats?.stats}
              />
            </div>
          </div>
        </section>

        {/* Футер */}
        <footer className="mt-20 text-center text-gray-500 dark:text-gray-400">
          <div className="max-w-2xl mx-auto border-t border-gray-200 dark:border-gray-700 pt-8">
            <p className="mb-2">Разработано для учащихся 10 класса</p>
            <p className="text-sm">© 2024 Все права защищены</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
