'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

const questions: Question[] = [
  // Архитектура компьютера
  {
    id: 1,
    text: "Кто предложил основные принципы построения компьютера, используемые до сих пор?",
    options: [
      "Билл Гейтс",
      "Джон фон Нейман",
      "Стив Джобс",
      "Алан Тьюринг"
    ],
    correctAnswer: 1
  },
  {
    id: 2,
    text: "Какой принцип архитектуры фон Неймана говорит о том, что программы и данные хранятся в одной памяти?",
    options: [
      "Принцип двоичного кодирования",
      "Принцип адресности",
      "Принцип однородности памяти",
      "Принцип программного управления"
    ],
    correctAnswer: 2
  },
  {
    id: 3,
    text: "Какое устройство обеспечивает связь всех устройств компьютера?",
    options: [
      "Процессор",
      "Системная шина",
      "Оперативная память",
      "Жесткий диск"
    ],
    correctAnswer: 1
  },
  // Процессор
  {
    id: 4,
    text: "В каких единицах измеряется тактовая частота процессора?",
    options: [
      "Байт",
      "Герц",
      "Бит",
      "Вольт"
    ],
    correctAnswer: 1
  },
  {
    id: 5,
    text: "Какой кэш процессора имеет наименьший объём, но наибольшую скорость?",
    options: [
      "L1",
      "L2",
      "L3",
      "RAM"
    ],
    correctAnswer: 0
  },
  {
    id: 6,
    text: "Что такое многоядерность процессора?",
    options: [
      "Количество поддерживаемых операционных систем",
      "Количество одновременно выполняемых потоков",
      "Наличие нескольких вычислительных блоков на одном кристалле",
      "Количество поддерживаемых программ"
    ],
    correctAnswer: 2
  },
  // Память
  {
    id: 7,
    text: "Какой вид памяти является энергозависимым?",
    options: [
      "ROM",
      "RAM",
      "BIOS",
      "HDD"
    ],
    correctAnswer: 1
  },
  {
    id: 8,
    text: "Какой тип накопителя имеет движущиеся механические части?",
    options: [
      "SSD",
      "HDD",
      "Flash-накопитель",
      "RAM"
    ],
    correctAnswer: 1
  },
  {
    id: 9,
    text: "Что такое BIOS?",
    options: [
      "Тип оперативной памяти",
      "Базовая система ввода-вывода",
      "Операционная система",
      "Антивирусная программа"
    ],
    correctAnswer: 1
  },
  // Программное обеспечение
  {
    id: 10,
    text: "Какое ПО управляет работой всех устройств компьютера?",
    options: [
      "Прикладное ПО",
      "Системное ПО",
      "Инструментальное ПО",
      "Сервисное ПО"
    ],
    correctAnswer: 1
  },
  {
    id: 11,
    text: "Что такое операционная система?",
    options: [
      "Комплекс программ для работы с документами",
      "Комплекс программ для работы с играми",
      "Комплекс программ для управления компьютером",
      "Комплекс программ для работы в интернете"
    ],
    correctAnswer: 2
  },
  {
    id: 12,
    text: "Какая программа НЕ является операционной системой?",
    options: [
      "Windows",
      "Linux",
      "macOS",
      "Microsoft Office"
    ],
    correctAnswer: 3
  },
  {
    id: 13,
    text: "Что такое драйвер?",
    options: [
      "Программа для работы с устройствами компьютера",
      "Программа для создания документов",
      "Программа для работы в интернете",
      "Программа для создания рисунков"
    ],
    correctAnswer: 0
  },
  {
    id: 14,
    text: "Какой тип программного обеспечения предназначен для разработки программ?",
    options: [
      "Системное ПО",
      "Прикладное ПО",
      "Инструментальное ПО",
      "Сервисное ПО"
    ],
    correctAnswer: 2
  },
  // Компьютерные сети
  {
    id: 15,
    text: "Что такое LAN?",
    options: [
      "Локальная сеть",
      "Глобальная сеть",
      "Городская сеть",
      "Беспроводная сеть"
    ],
    correctAnswer: 0
  },
  {
    id: 16,
    text: "Какое устройство обеспечивает связь между разными сетями?",
    options: [
      "Коммутатор",
      "Маршрутизатор",
      "Концентратор",
      "Сетевая карта"
    ],
    correctAnswer: 1
  },
  {
    id: 17,
    text: "Какой протокол используется для просмотра веб-страниц?",
    options: [
      "FTP",
      "HTTP",
      "SMTP",
      "POP3"
    ],
    correctAnswer: 1
  },
  // Дополнительные вопросы
  {
    id: 18,
    text: "Какой компонент компьютера отвечает за долговременное хранение данных?",
    options: [
      "Процессор",
      "Оперативная память",
      "Жесткий диск",
      "Видеокарта"
    ],
    correctAnswer: 2
  },
  {
    id: 19,
    text: "Что такое файловая система?",
    options: [
      "Способ организации файлов на диске",
      "Программа для работы с файлами",
      "Набор файлов на компьютере",
      "Система защиты файлов"
    ],
    correctAnswer: 0
  },
  {
    id: 20,
    text: "Какая единица измерения используется для объема памяти?",
    options: [
      "Герц",
      "Вольт",
      "Байт",
      "Метр"
    ],
    correctAnswer: 2
  },
  {
    id: 21,
    text: "Что такое IP-адрес?",
    options: [
      "Адрес электронной почты",
      "Уникальный идентификатор устройства в сети",
      "Адрес веб-сайта",
      "Почтовый адрес"
    ],
    correctAnswer: 1
  },
  {
    id: 22,
    text: "Какое устройство преобразует цифровой сигнал в аналоговй?",
    options: [
      "Процессор",
      "Модем",
      "Маршрутизатор",
      "Коммутатор"
    ],
    correctAnswer: 1
  },
  {
    id: 23,
    text: "Что такое GUI?",
    options: [
      "Графический интерфейс пользователя",
      "Игровой движок",
      "Язык программирования",
      "Тип процессора"
    ],
    correctAnswer: 0
  },
  {
    id: 24,
    text: "Какой тип программного обеспечения является бесплатным и открытым?",
    options: [
      "Shareware",
      "Freeware",
      "Open Source",
      "Commercial"
    ],
    correctAnswer: 2
  },
  {
    id: 25,
    text: "Что такое брандмауэр?",
    options: [
      "Антивирусная программа",
      "Программа для защиты сети",
      "Программа для работы с файлами",
      "Программа для создания резервных копий"
    ],
    correctAnswer: 1
  },
  {
    id: 26,
    text: "Какая технология используется для беспроводного подключения к интернету?",
    options: [
      "Bluetooth",
      "Wi-Fi",
      "NFC",
      "GPS"
    ],
    correctAnswer: 1
  },
  {
    id: 27,
    text: "Что такое RAID?",
    options: [
      "Тип процессора",
      "Система резервного копирования",
      "Технология объединения дисков",
      "Сетевой протокол"
    ],
    correctAnswer: 2
  },
  {
    id: 28,
    text: "Какой компонент отвечает за обработку графики в компьютере?",
    options: [
      "Процессор",
      "Видеокарта",
      "Оперативная память",
      "Жесткий диск"
    ],
    correctAnswer: 1
  },
  {
    id: 29,
    text: "Что такое виртуальная память?",
    options: [
      "Часть жесткого диска, используемая как RAM",
      "Тип оперативной памяти",
      "Облачное хранилище",
      "Резервная копия данных"
    ],
    correctAnswer: 0
  },
  {
    id: 30,
    text: "Какой порт используется для подключения современных мониторов?",
    options: [
      "VGA",
      "USB",
      "HDMI",
      "PS/2"
    ],
    correctAnswer: 2
  }
];

export default function TestsPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const router = useRouter();

  const handleAnswer = async (selectedOption: number) => {
    const newAnswers = [...answers, selectedOption];
    setAnswers(newAnswers);

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Подсчитываем результат только в конце теста
      const score = newAnswers.reduce((total, answer, index) => {
        return total + (answer === questions[index].correctAnswer ? 1 : 0);
      }, 0);

      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }

        await fetch('/api/test-results/save', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            testType: 'general',
            score,
            maxScore: questions.length,
          }),
        });

        setShowResults(true);
      } catch (error) {
        console.error('Error saving test results:', error);
      }
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Тестирование</h1>
          <Link 
            href="/"
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 flex items-center gap-2"
          >
            <span>←</span> На главную
          </Link>
        </div>
        
        {!showResults ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            {/* Прогресс */}
            <div className="mb-8">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                <span>Прогресс</span>
                <span>{Math.round((currentQuestion / questions.length) * 100)}%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                <div 
                  className="h-full bg-blue-600 rounded-full transition-all duration-300"
                  style={{ width: `${(currentQuestion / questions.length) * 100}%` }}
                />
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-semibold">
                Вопрос {currentQuestion + 1} из {questions.length}
              </h2>
              <p className="text-lg p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                {questions[currentQuestion].text}
              </p>
              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    className="w-full p-4 text-left border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 font-medium">
                        {String.fromCharCode(65 + index)}
                      </span>
                      {option}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Тестирование завершено</h2>
            <p className="text-lg mb-8">
              Результаты сохранены в вашем личном кабинете
            </p>
            <div className="flex justify-center gap-4">
              <Link 
                href="/theory"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                К теории
              </Link>
              <Link 
                href="/"
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                На главную
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 