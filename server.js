const $circle = document.querySelector('#circle');
const $score = document.querySelector('#score');

let db;

// Инициализация IndexedDB
function initDB() {
    const request = indexedDB.open('GameDB', 1);

    request.onupgradeneeded = function(event) {
        db = event.target.result;
        if (!db.objectStoreNames.contains('scoreStore')) {
            db.createObjectStore('scoreStore', { keyPath: 'id' });
        }
    };

    request.onsuccess = function(event) {
        db = event.target.result;
        start();
    };

    request.onerror = function(event) {
        console.error('Error opening DB', event);
    };
}

// Установка счета в базу данных
function setScore(score) {
    const transaction = db.transaction(['scoreStore'], 'readwrite');
    const store = transaction.objectStore('scoreStore');
    const request = store.put({ id: 1, score: score });

    request.onsuccess = function() {
        $score.textContent = score;
    };

    request.onerror = function(event) {
        console.error('Error setting score', event);
    };
}

// Получение счета из базы данных
function getScore(callback) {
    const transaction = db.transaction(['scoreStore'], 'readonly');
    const store = transaction.objectStore('scoreStore');
    const request = store.get(1);

    request.onsuccess = function(event) {
        const result = event.target.result;
        callback(result ? result.score : 0);
    };

    request.onerror = function(event) {
        console.error('Error getting score', event);
        callback(0);
    };
}

function start() {
    getScore((score) => {
        setScore(score);
    });
}

function addOne() {
    getScore((score) => {
        setScore(score + 1);
    });
}

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

    addOne();

    setTimeout(() => {
        plusOne.remove();
    }, 2000);
});

// Инициализация
initDB();