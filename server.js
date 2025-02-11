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

    if (currentScore >= 500){
        increment = 16
    }else if(currentScore >= 200) {
        increment = 8;
    } else if (currentScore >= 100) {
        increment = 4;
    } else if (currentScore >= 50) {
        increment = 2;
    }

    setScore(currentScore + increment);
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
    const currentScore = getScore();
    let increment = 1;
    if (currentScore >= 500){
        increment = 16
    }else if(currentScore >= 200) {
        increment = 8;
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