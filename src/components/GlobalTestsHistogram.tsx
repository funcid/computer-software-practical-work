'use client';

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

interface GlobalTestsHistogramProps {
  ranges?: Range[];
  stats?: Stats;
}

export default function GlobalTestsHistogram({ ranges = [], stats }: GlobalTestsHistogramProps) {
  if (!ranges.length) {
    return (
      <div className="text-center text-gray-500 py-8">
        Нет данных для построения гистограммы
      </div>
    );
  }

  const maxCount = Math.max(...ranges.map(r => r.count));

  const getBarColor = (min: number) => {
    if (min < 40) return 'from-red-400/80 to-red-500/80 hover:from-red-500/90 hover:to-red-600/90';
    if (min < 60) return 'from-yellow-400/80 to-yellow-500/80 hover:from-yellow-500/90 hover:to-yellow-600/90';
    if (min < 80) return 'from-blue-400/80 to-blue-500/80 hover:from-blue-500/90 hover:to-blue-600/90';
    return 'from-green-400/80 to-green-500/80 hover:from-green-500/90 hover:to-green-600/90';
  };

  const getGradeLabel = (min: number) => {
    if (min < 40) return 'Неудовлетворительно';
    if (min < 60) return 'Удовлетворительно';
    if (min < 80) return 'Хорошо';
    return 'Отлично';
  };

  return (
    <div className="w-full">
      {/* Общая статистика */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-4 backdrop-blur-sm border border-blue-100/50 dark:border-blue-800/50">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📊</span>
            <div>
              <div className="text-sm text-gray-500">Всего тестов</div>
              <div className="text-2xl font-bold text-blue-600">{stats?.total}</div>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-4 backdrop-blur-sm border border-green-100/50 dark:border-green-800/50">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📈</span>
            <div>
              <div className="text-sm text-gray-500">Средний балл</div>
              <div className="text-2xl font-bold text-green-600">{stats?.averagePercentage}%</div>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-4 backdrop-blur-sm border border-purple-100/50 dark:border-purple-800/50">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🏆</span>
            <div>
              <div className="text-sm text-gray-500">Лучший результат</div>
              <div className="text-2xl font-bold text-purple-600">{stats?.maxPercentage}%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Гистограмма */}
      <div className="relative h-[400px] w-full bg-gradient-to-br from-white/50 to-gray-50/50 dark:from-gray-800/50 dark:to-gray-700/50 rounded-xl p-6 backdrop-blur-sm border border-gray-100/50 dark:border-gray-700/50">
        {/* Вертикальные столбцы */}
        <div className="absolute inset-x-12 bottom-16 top-6 flex items-end justify-between gap-2">
          {ranges.map((range, index) => (
            <div
              key={index}
              className="relative flex-1 group"
              style={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end'
              }}
            >
              <div 
                className={`w-full bg-gradient-to-t ${getBarColor(range.min)} transition-all duration-300 rounded-xl backdrop-blur-sm shadow-lg`}
                style={{ 
                  height: range.count > 0 ? `${(range.count / maxCount) * 100}%` : '4px',
                  opacity: range.count > 0 ? 1 : 0.3
                }}
              >
                {/* Подсказка при наведении */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                  <div className="bg-gray-800/90 backdrop-blur-sm text-white text-sm rounded-lg py-2 px-4 shadow-xl border border-gray-700/50">
                    <p className="font-medium">{getGradeLabel(range.min)}</p>
                    <p>Диапазон: {range.min}-{range.max}%</p>
                    <p>Количество: {range.count}</p>
                    <p>({range.percentage}% от общего)</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Горизонтальные линии */}
        <div className="absolute inset-x-12 bottom-16 top-6 flex flex-col justify-between pointer-events-none">
          {[0, 25, 50, 75, 100].map((mark) => (
            <div
              key={mark}
              className="w-full border-t border-gray-200/50 dark:border-gray-700/50"
            >
              <span className="absolute -left-10 -translate-y-1/2 text-sm text-gray-500">
                {Math.round((maxCount / 100) * (100 - mark))}
              </span>
            </div>
          ))}
        </div>

        {/* Подписи диапазонов */}
        <div className="absolute left-12 right-12 bottom-0 flex justify-between">
          {ranges.map((range, index) => (
            <div
              key={index}
              className="text-sm text-gray-600 dark:text-gray-400 transform -rotate-45 origin-top-left translate-y-4 font-medium"
            >
              {range.min}-{range.max}%
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 