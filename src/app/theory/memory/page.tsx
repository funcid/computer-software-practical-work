'use client';
import { useState } from 'react';
import Link from 'next/link';

interface Section {
  id: string;
  title: string;
  content: string[];
  image?: string;
  keyPoints?: string[];
  examples?: { title: string; description: string }[];
}

export default function MemoryPage() {
  const [activeSection, setActiveSection] = useState<string>('intro');
  const [showQuiz, setShowQuiz] = useState(false);

  const sections: Section[] = [
    {
      id: 'intro',
      title: 'Введение в компьютерную память',
      content: [
        'Память компьютера - это устройства для хранения информации и программ.',
        'Существует иерархия памяти, где более быстрая память имеет меньший объём и наоборот.',
      ],
      keyPoints: [
        'Память необходима для хранения данных и программ',
        'Разные типы памяти имеют разные характеристики',
        'Существует иерархия устройств памяти'
      ],
      image: '/images/memory-hierarchy.png'
    },
    {
      id: 'types',
      title: 'Типы памяти',
      content: [
        'Оперативная память (RAM) - быстрая, энергозависимая память для временного хранения.',
        'Постоянная память (ROM) - энергонезависимая память для хранения базовых инструкций.',
        'Кэш-память - сверхбыстрая память небольшого объёма.',
        'Внешняя память (HDD, SSD) - для долговременного хранения данных.',
      ],
      examples: [
        {
          title: 'Оперативная память',
          description: 'Хранит запущенные программы и открытые файлы'
        },
        {
          title: 'Жесткий диск',
          description: 'Хранит операционную систему, программы и файлы пользователя'
        }
      ]
    },
    {
      id: 'characteristics',
      title: 'Характеристики памяти',
      content: [
        'Объём - количество информации, которое может храниться.',
        'Скорость доступа - время получения или записи информации.',
        'Энергозависимость - сохранение данных при отключении питания.',
        'Стоимость - цена за единицу объёма памяти.',
      ],
      keyPoints: [
        'Объём измеряется в байтах и кратных единицах',
        'Скорость влияет на производительность системы',
        'Цена растёт с увеличением скорости работы'
      ]
    }
  ];

  const quizQuestions = [
    {
      question: 'Какой тип памяти является энергозависимым?',
      options: [
        'ROM',
        'RAM',
        'HDD',
        'SSD'
      ],
      correct: 1
    },
    {
      question: 'Где хранятся данные при выключении компьютера?',
      options: [
        'В оперативной памяти',
        'В процессоре',
        'На жестком диске',
        'В кэше'
      ],
      correct: 2
    },
    {
      question: 'Какой тип памяти самый быстрый?',
      options: [
        'Жесткий диск',
        'Оперативная память',
        'Кэш-память',
        'USB-накопитель'
      ],
      correct: 2
    }
  ];

  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const handleQuizAnswer = (selectedOption: number) => {
    if (selectedOption === quizQuestions[currentQuiz].correct) {
      setQuizScore(score => score + 1);
    }

    if (currentQuiz + 1 < quizQuestions.length) {
      setCurrentQuiz(current => current + 1);
    } else {
      setShowResults(true);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Память компьютера</h1>
          <Link 
            href="/theory"
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
          >
            ← К списку тем
          </Link>
        </div>

        {/* Навигация по разделам */}
        <div className="flex flex-wrap gap-2 mb-8">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                activeSection === section.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700'
              }`}
            >
              {section.title}
            </button>
          ))}
          <button
            onClick={() => {
              setShowQuiz(true);
              setCurrentQuiz(0);
              setQuizScore(0);
              setShowResults(false);
            }}
            className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors"
          >
            Проверить знания
          </button>
        </div>

        {/* Контент раздела */}
        {!showQuiz ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            {sections.map((section) => (
              section.id === activeSection && (
                <div key={section.id} className="space-y-6">
                  <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
                  
                  {section.content.map((paragraph, index) => (
                    <p key={index} className="text-gray-700 dark:text-gray-300">
                      {paragraph}
                    </p>
                  ))}

                  {section.image && (
                    <div className="my-6">
                      <img 
                        src={section.image} 
                        alt={section.title}
                        className="rounded-lg shadow-md"
                      />
                    </div>
                  )}

                  {section.keyPoints && (
                    <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-lg mt-6">
                      <h3 className="font-semibold mb-3 text-blue-800 dark:text-blue-300">
                        Ключевые моменты:
                      </h3>
                      <ul className="list-disc pl-5 space-y-2">
                        {section.keyPoints.map((point, index) => (
                          <li key={index} className="text-blue-700 dark:text-blue-400">
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {section.examples && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                      {section.examples.map((example, index) => (
                        <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                          <h4 className="font-semibold mb-2">{example.title}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {example.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            {!showResults ? (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold mb-4">
                  Вопрос {currentQuiz + 1} из {quizQuestions.length}
                </h3>
                <p className="text-lg mb-4">{quizQuestions[currentQuiz].question}</p>
                <div className="space-y-3">
                  {quizQuestions[currentQuiz].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuizAnswer(index)}
                      className="w-full p-3 text-left border rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">Результаты проверки знаний</h3>
                <p className="text-lg mb-4">
                  Правильных ответов: {quizScore} из {quizQuestions.length}
                </p>
                <button
                  onClick={() => setShowQuiz(false)}
                  className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  Вернуться к материалу
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 