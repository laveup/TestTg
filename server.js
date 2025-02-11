// Конфигурация Firebase (замените на вашу конфигурацию)
const firebaseConfig = {
    apiKey: "ВАШ_API_KEY",
    authDomain: "ВАШ_AUTH_DOMAIN",
    databaseURL: "ВАШ_DATABASE_URL",
    projectId: "ВАШ_PROJECT_ID",
    storageBucket: "ВАШ_STORAGE_BUCKET",
    messagingSenderId: "ВАШ_MESSAGING_SENDER_ID",
    appId: "ВАШ_APP_ID"
};

// Инициализация Firebase
try {
    const app = firebase.initializeApp(firebaseConfig);
    console.log("Firebase инициализирован успешно!");
    const database = firebase.database();
} catch (error) {
    console.error("Ошибка инициализации Firebase:", error);
}

const $circle = document.querySelector('#circle');
const $score = document.querySelector('#score');

if (!$circle || !$score) {
    console.error("Элементы #circle или #score не найдены!");
} else {
    console.log("Элементы #circle и #score найдены.");
}

// Функция для установки счета в Firebase
function setScore(score) {
    database.ref('score').set(score)
        .then(() => {
            console.log("Счет успешно сохранен в Firebase:", score);
            $score.textContent = score; // Обновляем текст на странице
        })
        .catch((error) => {
            console.error('Ошибка при сохранении счета:', error);
        });
}

// Функция для получения счета из Firebase
function getScore(callback) {
    database.ref('score').once('value')
        .then((snapshot) => {
            const score = snapshot.val() || 0; // Если данных нет, возвращаем 0
            console.log("Счет успешно получен из Firebase:", score);
            callback(score);
        })
        .catch((error) => {
            console.error('Ошибка при получении счета:', error);
            callback(0);
        });
}

// Функция для увеличения счета на 1
function addOne() {
    getScore((score) => {
        setScore(score + 1); // Увеличиваем счет и сохраняем в Firebase
    });
}

// Инициализация приложения
function start() {
    getScore((score) => {
        setScore(score); // Устанавливаем счет из Firebase
    });
}

// Обработчик клика по кругу
if ($circle) {
    $circle.addEventListener('click', (event) => {
        console.log('Клик по кругу');
        const rect = $circle.getBoundingClientRect();

        const offsetX = event.clientX - rect.left - rect.width / 2;
        const offsetY = event.clientY - rect.top - rect.height / 2;

        const DEG = 40;

        const tiltX = (offsetY / rect.height) * DEG;
        const tiltY = (offsetX / rect.width) * -DEG;

        $circle.style.setProperty('--tiltX', `${tiltX}deg`);
        $circle.style.setProperty('--tiltY', `${tiltY}deg`);

        setTimeout(() => {
            $circle.style.setProperty('--tiltX', `0deg`);
            $circle.style.setProperty('--tiltY', `0deg`);
        }, 150);

        const plusOne = document.createElement('div');
        plusOne.classList.add('plus-one');
        plusOne.textContent = '+1';
        plusOne.style.left = `${event.clientX - rect.left}px`;
        plusOne.style.top = `${event.clientY - rect.top}px`;
        $circle.parentElement.appendChild(plusOne);

        addOne(); // Увеличиваем счет

        setTimeout(() => {
            plusOne.remove();
        }, 2000);
    });
} else {
    console.error("Элемент #circle не найден, обработчик клика не добавлен.");
}

// Инициализация Firebase и приложения
start();