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
    const increment = currentScore >= 50 ? 2 : 1; // Если счет >= 50, добавляем 2, иначе 1
    const increment2 = currentScore >= 100 ? 4 : 1;
    const increment3 = currentScore >= 1000 ? 1000000 : 1;
    setScore(currentScore + increment);
    setScore(currentScore + increment2);
    setScore(currentScore + increment3);
}

$circle.addEventListener('click', (event) => {
    const rect = $circle.getBoundingClientRect();
    const offsetX = event.clientX - rect.left - rect.width / 2;
    const offsetY = event.clientY - rect.top -  rect.height / 2;

    const DEG = 40;

    const tiltX = (offsetY / rect.height) * DEG;
    const tiltY = (offsetX / rect.width) * -DEG;

    $circle.style.setProperty('--tiltX', `${tiltX}deg`);
    $circle.style.setProperty('--tiltY', `${tiltY}deg`);

    setTimeout(() => {
        $circle.style.setProperty('--tiltX', `0deg`);
        $circle.style.setProperty('--tiltY', `0deg`);
    }, 150);
    console.log('Click');
    
    const currentScore = getScore();
    const increment = currentScore >= 50 ? 2 : 1;
    const increment2 = currentScore >= 100 ? 4 : 1;
    const increment3 = currentScore >= 1000 ? 1000000 : 1;
    const plusOne = document.createElement('div');
    plusOne.classList.add('plus-one');
    plusOne.textContent = `+${increment, increment2, increment3}`;
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