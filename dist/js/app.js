"use strict";

const players = {
  1: {
    current: 0,
    overall: 0,
  },
  2: {
    current: 0,
    overall: 0,
  },
};

let playerActive = 1;

// DOM Objects
const playerOneBoard = document.getElementById("player-1-board");
const playerTwoBoard = document.getElementById("player-2-board");
const playerOneOverall = document.getElementById("player-1-overall");
const playerTwoOverall = document.getElementById("player-2-overall");
const playerOneCurrent = document.getElementById("player-1-current");
const playerTwoCurrent = document.getElementById("player-2-current");

const dice = document.querySelector(".dice-image");
const winnerOverlay = document.querySelector(".winner");
const overlay = document.querySelector(".overlay");
const howTo = document.getElementById("how-to");
const newGame = document.getElementById("new-game");
const rollDice = document.getElementById("roll-dice");
const holdScore = document.getElementById("hold-score");

const startNewGame = () => {
  players["1"] = {
    current: 0,
    overall: 0,
  };
  players["2"] = {
    current: 0,
    overall: 0,
  };
  playerActive = 1;
};

const checkIfWon = (diceValue) => {
  if (diceValue === 1) {
    winnerOverlay.textContent = `Player ${3 - playerActive} Won!!`;
    winnerOverlay.classList.remove("winner-hidden");
    return true;
  } else if (players[playerActive].current > 330) {
    winnerOverlay.textContent = `Player ${playerActive} Won!!`;
    winnerOverlay.classList.remove("winner-hidden");
    return true;
  }
  return false;
};

const updateValues = () => {
  playerOneOverall.textContent = players["1"].overall.toString();
  playerTwoOverall.textContent = players["2"].overall.toString();
  playerOneCurrent.textContent = players["1"].current.toString();
  playerTwoCurrent.textContent = players["2"].current.toString();
};

winnerOverlay.addEventListener("click", () =>
  winnerOverlay.classList.add("winner-hidden")
);

overlay.addEventListener("click", () => overlay.classList.add("hidden"));

howTo.addEventListener("click", () => {
  overlay.classList.remove("hidden");
});

newGame.addEventListener("click", () => {
  startNewGame();
  updateValues();
});

holdScore.addEventListener("click", () => {
  if (playerActive === 1) {
    playerTwoBoard.classList.add("player-active");
    playerOneBoard.classList.remove("player-active");
    players["1"].current = 0;
  } else {
    playerOneBoard.classList.add("player-active");
    playerTwoBoard.classList.remove("player-active");
    players["2"].current = 0;
  }
  playerActive = 3 - playerActive;
  updateValues();
});

rollDice.addEventListener("click", () => {
  const diceValue = 1 + Math.floor(Math.random() * 6);
  dice.src = `images/dice-${diceValue}.png`;
  players[playerActive].current += diceValue;
  players[playerActive].overall += diceValue;
  if (checkIfWon(diceValue)) startNewGame();
  updateValues();
});
