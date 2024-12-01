'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import TestResultsChart from '@/components/TestResultsChart';

interface TestResult {
  id: number;
  testType: string;
  score: number;
  maxScore: number;
  percentage: number;
  completedAt: string;
}

export default function ProfilePage() {
  const [results, setResults] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'history'>('overview');

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await fetch('/api/test-results/user');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setResults(Array.isArray(data.results) ? data.results : []);
      } catch (err) {
        console.error('Error fetching results:', err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  const getGradeColor = (percentage: number) => {
    if (percentage < 40) return 'text-red-500';
    if (percentage < 60) return 'text-yellow-500';
    if (percentage < 80) return 'text-blue-500';
    return 'text-green-500';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getBestResult = () => {
    if (results.length === 0) return { percentage: 0, testType: 'Нет данных' };
    const best = results.reduce((best, current) => 
      current.percentage > best.percentage ? current : best
    );
    return {
      percentage: Math.round(best.percentage),
      testType: best.testType
    };
  };

  const getAverageByType = () => {
    const typeStats: { [key: string]: { totalScore: number; totalMaxScore: number; count: number } } = {};
    
    results.forEach(result => {
      if (!typeStats[result.testType]) {
        typeStats[result.testType] = { totalScore: 0, totalMaxScore: 0, count: 0 };
      }
      typeStats[result.testType].totalScore += result.score;
      typeStats[result.testType].totalMaxScore += result.maxScore;
      typeStats[result.testType].count += 1;
    });

    return Object.entries(typeStats).map(([type, stats]) => ({
      type,
      average: Math.round((stats.totalScore / stats.totalMaxScore) * 100),
      count: stats.count
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <div className="animate-pulse text-center">Загрузка результатов...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        {/* Шапка */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Личный кабинет</h1>
            <p className="text-gray-500 mt-1">Ваш прогресс в обучении</p>
          </div>
          <Link 
            href="/"
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 flex items-center gap-2"
          >
            <span>←</span> На главную
          </Link>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                <span className="text-2xl">👨‍🎓</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Всего тестов</h3>
                <p className="text-sm text-gray-500">пройдено за все время</p>
              </div>
            </div>
            <div className="flex items-end gap-2">
              <p className="text-3xl font-bold text-blue-600">{results.length}</p>
              {results.length > 0 && (
                <p className="text-sm text-gray-500 mb-1">
                  {`≈ ${Math.round(
                    (results.reduce((acc, curr) => acc + curr.score, 0) / 
                     results.reduce((acc, curr) => acc + curr.maxScore, 0)) * 100
                  )}% средний балл`}
                </p>
              )}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                <span className="text-2xl">🏆</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Лучший результат</h3>
                <p className="text-sm text-gray-500">самый высокий балл</p>
              </div>
            </div>
            <div className="flex flex-col">
              <p className="text-3xl font-bold text-green-600">
                {getBestResult().percentage}%
              </p>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${getBestResult().percentage}%` }}
                  />
                </div>
                <span className="text-sm text-gray-500">{getBestResult().testType}</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
                <span className="text-2xl">⏰</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Последний тест</h3>
                <p className="text-sm text-gray-500">
                  {results[0] ? formatDate(results[0].completedAt).split(',')[0] : 'нет данных'}
                </p>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold text-purple-600">
                  {results[0]?.score ?? 0}
                </p>
                <p className="text-lg text-gray-500">
                  из {results[0]?.maxScore ?? 0}
                </p>
              </div>
              {results[0] && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${results[0].percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-500">{Math.round(results[0].percentage)}%</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Табы */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <div className="flex">
              <button
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === 'overview'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('overview')}
              >
                Обзор
              </button>
              <button
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === 'history'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('history')}
              >
                История
              </button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'overview' ? (
              <>
                {/* График прогресса */}
                {results.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">График успеваемости</h2>
                    <TestResultsChart results={results} />
                  </div>
                )}

                {/* Статистика по темам */}
                <div className="mt-8">
                  <h2 className="text-xl font-semibold mb-4">Статистика по темам</h2>
                  <div className="grid gap-4">
                    {getAverageByType().map(({ type, average, count }) => (
                      <div key={type} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-medium">{type}</h3>
                            <p className="text-sm text-gray-500">Пройдено тестов: {count}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-blue-600">{average}%</p>
                            <p className="text-sm text-gray-500">средний балл</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              /* История тестов */
              <div className="divide-y">
                {results.map((result) => (
                  <div key={result.id} className="py-4 first:pt-0 last:pb-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">Тестирование по теме "{result.testType}"</h3>
                        <p className="text-sm text-gray-500">{formatDate(result.completedAt)}</p>
                      </div>
                      <div className={`text-lg font-bold ${getGradeColor(result.percentage)}`}>
                        {result.score}/{result.maxScore} ({Math.round(result.percentage)}%)
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Кнопка для нового теста */}
        <div className="text-center">
          <Link
            href="/tests"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Пройти новый тест
          </Link>
        </div>
      </div>
    </div>
  );
} 