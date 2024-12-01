'use client';

interface TestResult {
  id: number;
  testType: string;
  score: number;
  maxScore: number;
  percentage: number;
  completedAt: string;
}

interface TestResultsChartProps {
  results?: TestResult[];
}

export default function TestResultsChart({ results = [] }: TestResultsChartProps) {
  if (!Array.isArray(results) || results.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        Недостаточно данных для построения графика
      </div>
    );
  }

  const sortedResults = [...results]
    .sort((a, b) => new Date(a.completedAt).getTime() - new Date(b.completedAt).getTime())
    .slice(-7);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit'
    });
  };

  return (
    <div className="w-full">
      <div className="relative h-[400px] w-full px-12 py-6">
        {/* Горизонтальные линии сетки */}
        {[0, 20, 40, 60, 80, 100].map((mark) => (
          <div
            key={mark}
            className="absolute left-12 right-4 border-t border-gray-200 dark:border-gray-700"
            style={{ 
              bottom: `${mark}%`,
              opacity: mark === 0 ? 1 : 0.5
            }}
          >
            <span className="absolute -left-12 -top-2.5 text-sm text-gray-500 w-8 text-right">
              {mark}%
            </span>
          </div>
        ))}

        {/* График */}
        <div className="relative h-full">
          <svg className="absolute inset-0 w-full h-full">
            {/* Линии между точками */}
            {sortedResults.slice(0, -1).map((result, index) => {
              const nextResult = sortedResults[index + 1];
              const x1 = `${(index * 100) / (sortedResults.length - 1)}%`;
              const y1 = `${100 - result.percentage}%`;
              const x2 = `${((index + 1) * 100) / (sortedResults.length - 1)}%`;
              const y2 = `${100 - nextResult.percentage}%`;
              return (
                <line
                  key={result.id}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="rgb(59, 130, 246)"
                  strokeWidth="2"
                />
              );
            })}

            {/* Точки и подсказки */}
            {sortedResults.map((result, index) => {
              const x = `${(index * 100) / (sortedResults.length - 1)}%`;
              const y = `${100 - result.percentage}%`;
              return (
                <g key={result.id} className="group">
                  {/* Точка */}
                  <circle
                    cx={x}
                    cy={y}
                    r="6"
                    fill="white"
                    stroke="rgb(59, 130, 246)"
                    strokeWidth="2"
                    className="hover:r-8 transition-all duration-300"
                  />
                  
                  {/* Подсказка */}
                  <g className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <rect
                      x={x}
                      y={y}
                      width="120"
                      height="60"
                      transform="translate(-60, -75)"
                      rx="4"
                      fill="rgb(31, 41, 55)"
                      className="opacity-90"
                    />
                    <text
                      x={x}
                      y={y}
                      transform="translate(0, -55)"
                      textAnchor="middle"
                      fill="white"
                      fontSize="12"
                    >
                      <tspan x={x} dy="0">{result.testType}</tspan>
                      <tspan x={x} dy="15">{result.score} из {result.maxScore}</tspan>
                      <tspan x={x} dy="15">{Math.round(result.percentage)}%</tspan>
                    </text>
                  </g>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Подписи дат */}
        <div className="absolute bottom-0 left-12 right-4 flex justify-between pt-6">
          {sortedResults.map((result) => (
            <div key={result.id} className="text-sm text-gray-500 text-center transform -rotate-45 origin-top-left">
              {formatDate(result.completedAt)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 