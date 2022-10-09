let playerDisplay = document.getElementById("player");
let xWins = document.getElementById("xWins");
let oWins = document.getElementById("oWins");
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "x";
let computer = "o";
let xWin = 0;
let oWin = 0;

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;

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

async function cellPlayed(cell, cellIndex) {
    let computerIndex = 0;
  gameState[cellIndex] = currentPlayer;
  cell.innerHTML = currentPlayer;

  const response = await fetch("http://localhost:55597/api/getindex", {
    method: "POST",
    mode:"cors",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(gameState)
  });

  response.json().then((data) => {
    makeComputerMove(computerIndex,data);
  }).catch((err)=> console.log(err))
  ;
}

function makeComputerMove(computerIndex,data)
{
    if(data.row == 0)
        computerIndex = data.row + data.col;

    if(data.row == 1)
        computerIndex = data.row + data.col + 2;

    if(data.row == 2)
        computerIndex = data.row + data.col + 4;

    // currentPlayer = playerChange();
    // playerChange();
    gameState[computerIndex] = computer;
    document.getElementById(computerIndex).innerHTML = computer;
    result();
}

function playerChange() {
  currentPlayer = currentPlayer === "x" ? "o" : "x";
}

function result() {
  let win = false;
  for (let i = 0; i <= 7; i++) {
    const winCondition = winningConditions[i];
    let first = gameState[winCondition[0]];
    let second = gameState[winCondition[1]];
    let third = gameState[winCondition[2]];

    if (first === "" || second === "" || third === "") continue;

    if (first === second && second === third) {
      win = true;
      if (first === "x")
      {
        xWin++;
        playerDisplay.innerHTML = `Player x has won!`;
      }
      else
      {
        oWin++;
        playerDisplay.innerHTML = `Player o has won!`;
      }
      break;
    }
  }

  if (win) {
    xWins.innerHTML = xWin;
    oWins.innerHTML = oWin;
    gameActive = false;
    return;
  }

  let draw = !gameState.includes("");
  if (draw) {
    playerDisplay.innerHTML = drawMessage();
    gameActive = false;
    return;
  }


}

function cellClick(clickedCellEvent) {

  const cell = clickedCellEvent.target;
  const cellIndex = parseInt(cell.getAttribute("cell-index"));

  if (gameState[cellIndex] !== "" || !gameActive) return;

  cellPlayed(cell, cellIndex);
  result();
}

function restartGame() {
  gameActive = true;
  currentPlayer = "x";
  gameState = ["", "", "", "", "", "", "", "", ""];
  playerDisplay.innerHTML = currentPlayerTurn();
  document.querySelectorAll(".box").forEach((cell) => (cell.innerHTML = ""));
}

document
  .querySelectorAll(".box")
  .forEach((cell) => cell.addEventListener("click", cellClick));
document.querySelector(".restart-game").addEventListener("click", restartGame);
