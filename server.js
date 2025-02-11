// Конфигурация Firebase (замените на вашу конфигурацию)
const firebaseConfig = {
    apiKey: "AIzaSyDaKFY3s85Bj1eAWyLL2HnJ7I9O5zY96NU",
    authDomain: "dataliz-f54f8.firebaseapp.com",
    databaseURL: "https://dataliz-f54f8-default-rtdb.firebaseio.com",
    projectId: "dataliz-f54f8",
    storageBucket: "dataliz-f54f8.firebasestorage.app",
    messagingSenderId: "1083604106507",
    appId: "1:1083604106507:web:8bc9813e800508ba48b60e"
};

// Инициализация Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const $circle = document.querySelector('#circle');
const $score = document.querySelector('#score');

// Функция для установки счета в Firebase
function setScore(score) {
    database.ref('score').set(score)
        .then(() => {
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
$circle.addEventListener('click', (event) => {
    console.log('Click');
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

// Инициализация Firebase и приложения
start();