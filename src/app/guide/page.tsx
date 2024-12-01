'use client';
import { useState } from 'react';
import Link from 'next/link';

interface StudySection {
  title: string;
  content: string[];
  tips: string[];
}

export default function GuidePage() {
  const [activeSection, setActiveSection] = useState<number>(0);

  const studySections: StudySection[] = [
    {
      title: "Как эффективно изучать материал",
      content: [
        "Начните с базовых концепций и постепенно переходите к более сложным темам",
        "Делайте короткие перерывы каждые 25-30 минут обучения",
        "Ведите конспект, записывая ключевые моменты",
        "Пытайтесь объяснить материал своими словами"
      ],
      tips: [
        "Используйте метод Помодоро: 25 минут учебы, 5 минут отдыха",
        "Создавайте ментальные карты для лучшего запоминания",
        "Регулярно повторяйте пройденный материал"
      ]
    },
    {
      title: "План изучения курса",
      content: [
        "Неделя 1-2: Архитектура компьютера",
        "Неделя 3-4: Процессор и память",
        "Неделя 5-6: Программное обеспечение",
        "Неделя 7-8: Компьютерные сети",
        "Каждую неделю выделяйте время на практику и тестирование"
      ],
      tips: [
        "Придерживайтесь графика обучения",
        "Не пропускайте практические задания",
        "Проходите тесты после каждой темы"
      ]
    },
    {
      title: "Подготовка к тестированию",
      content: [
        "Изучите теоретический материал по каждой теме",
        "Выполните все практические задания",
        "Регулярно проходите пробные тесты",
        "Анализируйте свои ошибки и работайте над их исправлением"
      ],
      tips: [
        "Начинайте подготовку заранее",
        "Уделяйте особое внимание сложным темам",
        "Используйте дополнительные материалы при необходимости"
      ]
    }
  ];

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Методические материалы</h1>
          <Link 
            href="/"
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 flex items-center gap-2"
          >
            <span>←</span> На главную
          </Link>
        </div>

        {/* Навигация по разделам */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          {studySections.map((section, index) => (
            <button
              key={index}
              onClick={() => setActiveSection(index)}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                activeSection === index
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {section.title}
            </button>
          ))}
        </div>

        {/* Активный раздел */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">{studySections[activeSection].title}</h2>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Основные положения:</h3>
            <ul className="space-y-4">
              {studySections[activeSection].content.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-sm">
                    {index + 1}
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-300">
              Полезные советы:
            </h3>
            <ul className="space-y-3">
              {studySections[activeSection].tips.map((tip, index) => (
                <li key={index} className="flex items-center gap-2 text-blue-700 dark:text-blue-400">
                  <span className="text-xl">💡</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Дополнительная информация */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-50 dark:bg-green-900/30 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-green-800 dark:text-green-300">
              Рекомендуемая литература
            </h3>
            <ul className="space-y-2 text-green-700 dark:text-green-400">
              <li>• Учебник &quot;Информатика&quot; для 10 класса</li>
              <li>• Практикум по информатике</li>
              <li>• Сборник задач по информатике</li>
            </ul>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/30 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-purple-800 dark:text-purple-300">
              Онлайн-ресурсы
            </h3>
            <ul className="space-y-2 text-purple-700 dark:text-purple-400">
              <li>• Видеоуроки по темам</li>
              <li>• Интерактивные тренажеры</li>
              <li>• Образовательные порталы</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 