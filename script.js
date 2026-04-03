const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function setStatusMessage(message, type = '') {
    status.textContent = message;
    status.className = 'status';
    if (type) status.classList.add(type);
}

function highlightWinningCells(winningCells) {
    winningCells.forEach(i => {
        const cell = document.querySelector(`.cell[data-index="${i}"]`);
        if (cell) cell.classList.add('win-cell');
    });
}

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (gameBoard[index] !== '' || !gameActive) {
        return;
    }

    gameBoard[index] = currentPlayer;
    cell.textContent = currentPlayer;

    const winner = checkWinner();
    if (winner) {
        highlightWinningCells(winner);
        setStatusMessage(`🎉 Player ${currentPlayer} wins! Happy victory! 🎉`, 'win');
        speak(`Player ${currentPlayer} wins! Congratulations!`);
        gameActive = false;
        return;
    }

    if (checkDraw()) {
        setStatusMessage("🤝 It's a draw! Great game!", 'draw');
        speak("It's a draw! Great game!");
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    setStatusMessage(`Player ${currentPlayer}'s turn`, 'turn');
    speak(`Player ${currentPlayer}'s turn`);
}

function checkWinner() {
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return condition;
        }
    }
    return null;
}

function checkDraw() {
    return gameBoard.every(cell => cell !== '');
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('win-cell');
    });
    setStatusMessage(`Player ${currentPlayer}'s turn`, 'turn');
    speak("Game reset. Player X's turn");
}

function speak(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);