'use client';
import { useState } from 'react';
import Link from 'next/link';

interface Topic {
  id: number;
  title: string;
  description: string;
  path: string;
  icon: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: string;
  keyPoints: string[];
}

export default function TheoryPage() {
  const [hoveredTopic, setHoveredTopic] = useState<number | null>(null);

  const topics: Topic[] = [
    {
      id: 1,
      title: "Архитектура компьютера",
      description: "Принципы фон Неймана, устройство компьютера, взаимодействие компонентов",
      path: "/theory/architecture",
      icon: "🖥️",
      difficulty: "medium",
      estimatedTime: "45 минут",
      keyPoints: [
        "Базовые принципы работы компьютера",
        "Основные компоненты и их взаимодействие",
        "Архитектура фон Неймана"
      ]
    },
    {
      id: 2,
      title: "Процессор (CPU)",
      description: "Характеристики, принципы работы, архитектура процессора",
      path: "/theory/cpu",
      icon: "⚡",
      difficulty: "hard",
      estimatedTime: "60 минут",
      keyPoints: [
        "Устройство современных процессоров",
        "Принципы обработки данных",
        "Многоядерность и параллельные вычисления"
      ]
    },
    {
      id: 3,
      title: "Память компьютера",
      description: "Виды памяти, принципы хранения данных, иерархия памяти",
      path: "/theory/memory",
      icon: "💾",
      difficulty: "medium",
      estimatedTime: "40 минут",
      keyPoints: [
        "Типы компьютерной памяти",
        "Принципы хранения информации",
        "Взаимодействие различных видов памяти"
      ]
    },
    {
      id: 4,
      title: "Программное обеспечение",
      description: "Системное и прикладное ПО, операционные системы",
      path: "/theory/software",
      icon: "📱",
      difficulty: "easy",
      estimatedTime: "30 минут",
      keyPoints: [
        "Классификация программного обеспечения",
        "Операционные системы",
        "Прикладные программы"
      ]
    },
    {
      id: 5,
      title: "Компьютерные сети",
      description: "Виды сетей, сетевое оборудование, принципы работы",
      path: "/theory/networks",
      icon: "🌐",
      difficulty: "hard",
      estimatedTime: "50 минут",
      keyPoints: [
        "Топологии сетей",
        "Сетевые протоколы",
        "Принципы передачи данных"
      ]
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'hard': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return '';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Легкий уровень';
      case 'medium': return 'Средний уровень';
      case 'hard': return 'Сложный уровень';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold">Теоретический материал</h1>
          <Link 
            href="/"
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 flex items-center gap-2"
          >
            <span>←</span> На главную
          </Link>
        </div>
        
        <div className="grid gap-6">
          {topics.map((topic) => (
            <div 
              key={topic.id}
              className="relative"
              onMouseEnter={() => setHoveredTopic(topic.id)}
              onMouseLeave={() => setHoveredTopic(null)}
            >
              <Link 
                href={topic.path}
                className="block"
              >
                <div className="p-6 border rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-white dark:bg-gray-800">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{topic.icon}</span>
                      <div>
                        <h2 className="text-2xl font-bold mb-2">{topic.title}</h2>
                        <p className="text-gray-600 dark:text-gray-300">
                          {topic.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(topic.difficulty)}`}>
                        {getDifficultyText(topic.difficulty)}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        ⏱️ {topic.estimatedTime}
                      </span>
                    </div>
                  </div>

                  {hoveredTopic === topic.id && (
                    <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <h3 className="font-semibold mb-2">Ключевые моменты:</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        {topic.keyPoints.map((point, index) => (
                          <li key={index} className="text-gray-600 dark:text-gray-300">
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 