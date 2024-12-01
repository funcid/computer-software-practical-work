'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: string;
}

interface TestResult {
  score: number;
  maxScore: number;
  percentage: number;
  answers: {
    questionId: number;
    isCorrect: boolean;
    userAnswer: string;
    correctAnswer: string;
  }[];
}

export default function TestPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const router = useRouter();

  // Пример вопросов (в реальном приложении должны загружаться с сервера)
  const questions: Question[] = [
    {
      id: 1,
      text: "Что такое CPU?",
      options: [
        "Центральный процессор",
        "Оперативная память",
        "Жесткий диск",
        "Видеокарта"
      ],
      correctAnswer: "Центральный процессор"
    },
    {
      id: 2,
      text: "Какой компонент отвечает за временное хранение данных при работе компьютера?",
      options: [
        "HDD",
        "RAM",
        "CPU",
        "GPU"
      ],
      correctAnswer: "RAM"
    },
    {
      id: 3,
      text: "Что такое операционная система?",
      options: [
        "Программа для работы с текстом",
        "Базовое программное обеспечение компьютера",
        "Антивирусная программа",
        "Игровое приложение"
      ],
      correctAnswer: "Базовое программное обеспечение компьютера"
    },
    {
      id: 4,
      text: "Какое устройство отвечает за вывод изображения на монитор?",
      options: [
        "Звуковая карта",
        "Сетевая карта",
        "Видеокарта",
        "Материнская плата"
      ],
      correctAnswer: "Видеокарта"
    },
    {
      id: 5,
      text: "Что такое BIOS?",
      options: [
        "Антивирусная программа",
        "Базовая система ввода-вывода",
        "Операционная система",
        "Файловая система"
      ],
      correctAnswer: "Базовая система ввода-вывода"
    },
    {
      id: 6,
      text: "Какой тип памяти является энергозависимым?",
      options: [
        "HDD",
        "SSD",
        "RAM",
        "ROM"
      ],
      correctAnswer: "RAM"
    },
    {
      id: 7,
      text: "Что такое материнская плата?",
      options: [
        "Устройство для хранения данных",
        "Основная плата компьютера, соединяющая все компоненты",
        "Устройство ввода",
        "Устройство вывода"
      ],
      correctAnswer: "Основная плата компьютера, соединяющая все компоненты"
    },
    {
      id: 8,
      text: "Какое устройство преобразует цифровой сигнал в аналоговый?",
      options: [
        "Процессор",
        "Звуковая карта",
        "Жесткий диск",
        "Оперативная память"
      ],
      correctAnswer: "Звуковая карта"
    },
    {
      id: 9,
      text: "Что такое драйвер?",
      options: [
        "Программа для работы с устройством",
        "Устройство ввода",
        "Компонент процессора",
        "Тип файловой системы"
      ],
      correctAnswer: "Программа для работы с устройством"
    },
    {
      id: 10,
      text: "Какой компонент отвечает за долговременное хранение данных?",
      options: [
        "RAM",
        "CPU",
        "HDD/SSD",
        "GPU"
      ],
      correctAnswer: "HDD/SSD"
    },
    {
      id: 11,
      text: "Что такое тактовая частота процессора?",
      options: [
        "Количество ядер",
        "Скорость работы в герцах",
        "Объем кэш-памяти",
        "Температура работы"
      ],
      correctAnswer: "Скорость работы в герцах"
    },
    {
      id: 12,
      text: "Какой тип программного обеспечения является посредником между пользователем и оборудованием?",
      options: [
        "Прикладное ПО",
        "Операционная система",
        "Драйверы",
        "Утилиты"
      ],
      correctAnswer: "Операционная система"
    },
    {
      id: 13,
      text: "Что такое файловая система?",
      options: [
        "Способ организации хранения файлов",
        "Программа для работы с файлами",
        "Тип памяти",
        "Компонент процессора"
      ],
      correctAnswer: "Способ организации хранения файлов"
    },
    {
      id: 14,
      text: "Какое устройство служит для ввода текстовой информации?",
      options: [
        "Монитор",
        "Принтер",
        "Клавиатура",
        "Колонки"
      ],
      correctAnswer: "Клавиатура"
    },
    {
      id: 15,
      text: "Что такое кэш-память?",
      options: [
        "Тип оперативной памяти",
        "Быстрая память процессора",
        "Внешняя память",
        "Виртуальная память"
      ],
      correctAnswer: "Быстрая память процессора"
    },
    {
      id: 16,
      text: "Какой компонент обеспечивает питание всех устройств компьютера?",
      options: [
        "Материнская плата",
        "Процессор",
        "Блок питания",
        "Оперативная память"
      ],
      correctAnswer: "Блок питания"
    },
    {
      id: 17,
      text: "Что такое порт USB?",
      options: [
        "Тип процессора",
        "Универсальный последовательный порт",
        "Тип памяти",
        "Сетевой протокол"
      ],
      correctAnswer: "Универсальный последовательный порт"
    },
    {
      id: 18,
      text: "Какое устройство используется для подключения к интернету?",
      options: [
        "Звуковая карта",
        "Сетевая карта",
        "Видеокарта",
        "Контроллер жесткого диска"
      ],
      correctAnswer: "Сетевая карта"
    },
    {
      id: 19,
      text: "Что такое RAID-массив?",
      options: [
        "Тип процессора",
        "Система объединения дисков",
        "Сетевой протокол",
        "Тип оперативной памяти"
      ],
      correctAnswer: "Система объединения дисков"
    },
    {
      id: 20,
      text: "Какой тип программного обеспечения предназначен для защиты от вредоносных программ?",
      options: [
        "Текстовый редактор",
        "Антивирус",
        "Браузер",
        "Медиаплеер"
      ],
      correctAnswer: "Антивирус"
    },
    {
      id: 21,
      text: "Что такое IP-адрес?",
      options: [
        "Адрес электронной почты",
        "Уникальный идентификатор устройства в сети",
        "Название программы",
        "Тип файловой системы"
      ],
      correctAnswer: "Уникальный идентификатор устройства в сети"
    },
    {
      id: 22,
      text: "Какой компонент отвечает за обработку графической информации?",
      options: [
        "CPU",
        "RAM",
        "GPU",
        "HDD"
      ],
      correctAnswer: "GPU"
    },
    {
      id: 23,
      text: "Что такое браузер?",
      options: [
        "Программа для работы с текстом",
        "Программа для просмотра веб-страниц",
        "Антивирусная программа",
        "Операционная система"
      ],
      correctAnswer: "Программа для просмотра веб-страниц"
    },
    {
      id: 24,
      text: "Какой тип памяти работает быстрее?",
      options: [
        "HDD",
        "SSD",
        "DVD",
        "CD-ROM"
      ],
      correctAnswer: "SSD"
    },
    {
      id: 25,
      text: "Что такое процессорное ядро?",
      options: [
        "Тип памяти",
        "Блок обработки данных",
        "Сетевой протокол",
        "Тип файловой системы"
      ],
      correctAnswer: "Блок обработки данных"
    },
    {
      id: 26,
      text: "Какое устройство преобразует цифровой сигнал в изображение?",
      options: [
        "Процессор",
        "Монитор",
        "Клавиатура",
        "Жесткий диск"
      ],
      correctAnswer: "Монитор"
    },
    {
      id: 27,
      text: "Что такое сетевой протокол?",
      options: [
        "Тип компьютера",
        "Правила передачи данных в сети",
        "Программа для работы с сетью",
        "Сетевое устройство"
      ],
      correctAnswer: "Правила передачи данных в сети"
    },
    {
      id: 28,
      text: "Какой компонент обеспечивает охлаждение процессора?",
      options: [
        "Блок питания",
        "Кулер",
        "Термопаста",
        "Радиатор"
      ],
      correctAnswer: "Кулер"
    },
    {
      id: 29,
      text: "Что такое архитектура компьютера?",
      options: [
        "Внешний вид компьютера",
        "Набор программ",
        "Организация и взаимосвязь компонентов",
        "Тип операционной системы"
      ],
      correctAnswer: "Организация и взаимосвязь компонентов"
    },
    {
      id: 30,
      text: "Какой тип программного обеспечения используется для работы с документами?",
      options: [
        "Операционная система",
        "Офисный пакет",
        "Антивирус",
        "Драйверы"
      ],
      correctAnswer: "Офисный пакет"
    }
  ];

  const handleAnswer = (answer: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answer;
    setUserAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateResult();
    }
  };

  const calculateResult = () => {
    const score = userAnswers.reduce((total, answer, index) => {
      return total + (answer === questions[index].correctAnswer ? 1 : 0);
    }, 0);

    const result: TestResult = {
      score,
      maxScore: questions.length,
      percentage: (score / questions.length) * 100,
      answers: userAnswers.map((answer, index) => ({
        questionId: questions[index].id,
        isCorrect: answer === questions[index].correctAnswer,
        userAnswer: answer,
        correctAnswer: questions[index].correctAnswer
      }))
    };

    setTestResult(result);
    saveResult(result);
  };

  const saveResult = async (result: TestResult) => {
    try {
      const response = await fetch('/api/test-results/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          testType: 'general',
          score: result.score,
          maxScore: result.maxScore,
          percentage: result.percentage
        }),
      });

      if (response.ok) {
        router.push('/profile');
      }
    } catch (error) {
      console.error('Error saving test result:', error);
    }
  };

  if (testResult) {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Результаты теста</h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <p className="text-lg mb-4">
              Ваш результат: {testResult.score} из {testResult.maxScore} ({Math.round(testResult.percentage)}%)
            </p>
            <button
              onClick={() => router.push('/profile')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Перейти в профиль
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="mb-4">
            <span className="text-sm text-gray-500">
              Вопрос {currentQuestionIndex + 1} из {questions.length}
            </span>
          </div>
          <h2 className="text-xl font-semibold mb-6">{currentQuestion.text}</h2>
          <div className="space-y-4">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className="w-full text-left p-4 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 