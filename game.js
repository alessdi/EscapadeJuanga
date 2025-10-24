const player = document.getElementById('player');
const gameArea = document.getElementById('game-area');
const juanga = document.getElementById('juanga');

const difficultySelect = document.getElementById('difficulty-select');
const bgSelect = document.getElementById('bg-select');
const startButton = document.getElementById('start-button');
const volumeControl = document.getElementById('volume-control');
const backgroundMusic = document.getElementById('musica');

let playerPosition = { x: 100, y: 100 };
let juangaPosition = { x: 300, y: 300 };

let playerSpeed;
let juangaSpeed;
let gameStarted = false;

// Inicializa volumen
backgroundMusic.volume = 0.5;



function setDifficulty(level) {
    switch(level) {
        case 'easy':
            playerSpeed = 50;
            juangaSpeed = 1;
            break;
        case 'normal':
            playerSpeed = 40;
            juangaSpeed = 3;
            break;
        case 'hard':
            playerSpeed = 30;
            juangaSpeed = 5;
            break;
    }
}

difficultySelect.addEventListener('change', () => {
    if (!gameStarted) {
        setDifficulty(difficultySelect.value);
    }
});

bgSelect.addEventListener('change', () => {
    gameArea.style.backgroundImage = `url('resources/${bgSelect.value}')`;
});

// Fondo inicial
gameArea.style.backgroundImage = `url('resources/${bgSelect.value}')`;

startButton.addEventListener('click', () => {
    gameStarted = true;
    setDifficulty(difficultySelect.value);

    difficultySelect.disabled = true;
    bgSelect.disabled = true;
    startButton.disabled = true;

    backgroundMusic.play();
});

volumeControl.addEventListener('input', () => {
    backgroundMusic.volume = volumeControl.value / 100;
});

window.addEventListener('keydown', event => {
    if (!gameStarted) return;

    switch(event.key) {
        case 'ArrowUp':
            if (playerPosition.y > 0) playerPosition.y -= playerSpeed;
            break;
        case 'ArrowDown':
            if (playerPosition.y < gameArea.clientHeight - 70) playerPosition.y += playerSpeed;
            break;
        case 'ArrowLeft':
            if (playerPosition.x > 0) playerPosition.x -= playerSpeed;
            break;
        case 'ArrowRight':
            if (playerPosition.x < gameArea.clientWidth - 70) playerPosition.x += playerSpeed;
            break;
    }
    updatePositions();
});

function moveJuanga() {
    if (!gameStarted) return;

    if (juangaPosition.x < playerPosition.x) {
        juangaPosition.x += juangaSpeed;
    } else if (juangaPosition.x > playerPosition.x) {
        juangaPosition.x -= juangaSpeed;
    }

    if (juangaPosition.y < playerPosition.y) {
        juangaPosition.y += juangaSpeed;
    } else if (juangaPosition.y > playerPosition.y) {
        juangaPosition.y -= juangaSpeed;
    }

    updatePositions();
    checkCollision();
}

function updatePositions() {
    player.style.transform = `translate(${playerPosition.x}px, ${playerPosition.y}px)`;
    juanga.style.transform = `translate(${juangaPosition.x}px, ${juangaPosition.y}px)`;
}

function checkCollision() {
    if (Math.abs(playerPosition.x - juangaPosition.x) < 70 &&
        Math.abs(playerPosition.y - juangaPosition.y) < 70) {
        alert('Juanga te atrapó! perdiste! lo que se ve no se pregunta 🤫.');
        resetGame();
    }
}

function resetGame() {
    playerPosition = { x: 100, y: 100 };
    juangaPosition = { x: 300, y: 300 };
    updatePositions();

    gameStarted = false;
    difficultySelect.disabled = false;
    bgSelect.disabled = false;
    startButton.disabled = false;
    // Música sigue sonando sin cortes
}

function gameLoop() {
    moveJuanga();
    requestAnimationFrame(gameLoop);
}

setDifficulty(difficultySelect.value);
updatePositions();
gameLoop();
