let playerDisplay = document.getElementById("player");
let xWins = document.getElementById("xWins");
let oWins = document.getElementById("oWins");
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let xWin = 0;
let oWin = 0;

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

// playerDisplay.innerHTML = currentPlayerTurn();

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function cellPlayed(cell, cellIndex) {
    gameState[cellIndex] = currentPlayer;
    cell.innerHTML = currentPlayer;
}

function playerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    playerDisplay.innerHTML = currentPlayerTurn();
}

function result() {
    let win = false;
    for(let i = 0; i <= 7; i++)
    {
        const winCondition = winningConditions[i];
        let first = gameState[winCondition[0]];
        let second = gameState[winCondition[1]];
        let third = gameState[winCondition[2]];

        if(first === '' || second === '' || third === '')
            continue;

        if(first === second && second === third)
        {
            win = true;
            break;
        }
    }

    if(win)
    {
        if(currentPlayer === "X")
            xWin++;

        else
            oWin++;
        
        console.log(playerDisplay.innerText);
        playerDisplay.innerHTML = winningMessage();
        xWins.innerHTML = xWin;
        oWins.innerHTML = oWin;
        console.log(playerDisplay.innerText);
        console.log(xWin);
        console.log(oWin);  
        gameActive = false;
        return;
    }

    let draw = !gameState.includes("");
    if(draw)
    {
        playerDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    playerChange();
}

function cellClick(clickedCellEvent) {
    const cell = clickedCellEvent.target;

    const cellIndex = parseInt(cell.getAttribute('cell-index'));

    if(gameState[cellIndex] !== "" || !gameActive)
        return;

    cellPlayed(cell, cellIndex);
    result();
}

function restartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    playerDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.box').forEach(cell => cell.innerHTML = "");
    
}

document.querySelectorAll('.box').forEach(cell => cell.addEventListener('click',cellClick));
document.querySelector('.restart-game').addEventListener('click', restartGame);

