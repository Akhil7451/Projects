let message = document.getElementById('message');
let restartBtn = document.getElementById('restart');
let boxes = Array.from(document.getElementsByClassName('box'));

const O_text = "O";
const X_text = "X";

let currentPlayer = X_text;
let spaces = Array(9).fill(null);

const startGame = () => {
    boxes.forEach(box => {
        box.addEventListener("click", boxClicked);
    });
};

function boxClicked(e) {
    const id = e.target.id;

    if (!spaces[id]) {        //spaces[id] == null
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;

        if (playerHasWon() !== false) {
            message.innerText = `${currentPlayer} has won the game`;

            let winning_blocks = playerHasWon();
            winning_blocks.map(box => boxes[box].style.backgroundColor = 'green');

            return;
        }

        currentPlayer = currentPlayer == X_text ? O_text : X_text;
    }
}

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [1, 4, 7],
    [0, 3, 6],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function playerHasWon() {
    for (const winCombo of winningCombos) {
        let [a, b, c] = winCombo;

        if (spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return [a, b, c];
        }
    }

    return false;
}

restartBtn.addEventListener("click", restart);

function restart() {
    spaces.fill(null);

    boxes.forEach(box => {
        box.innerText = '';
        box.style.backgroundColor = '';
    });

    message.innerHTML = '';

    currentPlayer = X_text;
}

startGame();