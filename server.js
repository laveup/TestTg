const $circle = document.querySelector('#circle');
const $score = document.querySelector('#score');

function start() {
    setScore(getScore());
}

function setScore(score) {
    localStorage.setItem('score', score);
    $score.textContent = score;
}

function getScore() {
    return Number(localStorage.getItem('score')) || 0;
}

function addOne() {
    const currentScore = getScore();
    let increment = 1; // По умолчанию +1

    if (currentScore >= 200) {
        increment = 1000; // Если счет >= 1000, добавляем +1000
    } else if (currentScore >= 100) {
        increment = 4; // Если счет >= 100, добавляем +4
    } else if (currentScore >= 50) {
        increment = 2; // Если счет >= 50, добавляем +2
    }

    setScore(currentScore + increment);
}

$circle.addEventListener('click', (event) => {
    console.log('Click');
    const rect = $circle.getBoundingClientRect();
    const currentScore = getScore();
    let increment = 1;

    if (currentScore >= 200) {
        increment = 1000;
    } else if (currentScore >= 100) {
        increment = 4;
    } else if (currentScore >= 50) {
        increment = 2;
    }

    const plusOne = document.createElement('div');
    plusOne.classList.add('plus-one');
    plusOne.textContent = `+${increment}`; // Отображаем +1, +2, +4 или +1000
    plusOne.style.left = `${event.clientX - rect.left}px`;
    plusOne.style.top = `${event.clientY - rect.top}px`;
    $circle.parentElement.appendChild(plusOne);

    addOne();

    setTimeout(() => {
        plusOne.remove();
    }, 2000);
});

// Инициализация
start();