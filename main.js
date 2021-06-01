document.addEventListener('DOMContentLoaded', () => {
  const scoresTable = {
    rock: { scissors: 1, paper: -1, rock: 0 },
    scissors: { paper: 1, rock: -1, scissors: 0 },
    paper: { rock: 1, scissors: -1, paper: 0 },
  };
  const results = { you: 0, computer: 0 };

  function playRound(playerSelection, computerSelection) {
    // Add round score to results
    const score = scoresTable[playerSelection][computerSelection];
    results.you += (score > 0 ? score : 0);
    results.computer -= (score < 0 ? score : 0);
    // Produce a message
    const winnerMessage = `You won this round, ${playerSelection} beats ${computerSelection}`;
    const loserMessage = `You lost this round, ${computerSelection} beats ${playerSelection}`;
    const drawMessage = `It is a draw! ${computerSelection} vs ${playerSelection}`;
    switch (score) {
      case 1:
        return winnerMessage;
      case -1:
        return loserMessage;
      case 0:
        return drawMessage;
      default:
        return 'Wrong data.';
    }
  }
  function computerPlay() {
    const choices = ['rock', 'scissors', 'paper'];
    const randomIndex = Math.floor(3 * Math.random());
    return choices[randomIndex];
  }
  function showResults(roundMessage) {
    // Info on the result of the round
    const roundMessageDiv = document.querySelector('.round-message');
    roundMessageDiv.style.visibility = 'visible';
    let messagePar = document.querySelector('.round-message p');
    if (!messagePar) {
      messagePar = document.createElement('p');
      roundMessageDiv.appendChild(messagePar);
    }
    messagePar.textContent = roundMessage;
    // Info on total result
    /*
    for (player in results) {
      document.querySelector(`span[data-results = ${player}]`).textContent = results[player];
    }
    */
    Object.keys(results).forEach((player) => {
      document.querySelector(`span[data-results = ${player}]`).textContent = results[player];
    });
  }
  function endOfGame() {
    const endGameDiv = document.querySelector('.end-game');
    endGameDiv.style.visibility = 'visible';
  }

  function game() {
    if (results.you >= 5 || results.computer >= 5) {
      endOfGame();
    } else {
      const playerSelection = this.getAttribute('data-you-pick');
      const computerSelection = computerPlay();
      const roundResult = playRound(playerSelection, computerSelection);
      showResults(roundResult);
      if (results.you >= 5 || results.computer >= 5) {
        endOfGame();
      }
    }
  }
  function reStartGame() {
    results.you = 0;
    results.computer = 0;
    this.parentNode.style.visibility = 'hidden';
    /*
    for (player in results) {
      document.querySelector(`span[data-results = ${player}]`).textContent = results[player];
    }
    */
    Object.keys(results).forEach((player) => {
      document.querySelector(`span[data-results = ${player}]`).textContent = results[player];
    });
    const roundMessageDiv = document.querySelector('.round-message');
    roundMessageDiv.style.visibility = 'hidden';
  }
  document.querySelectorAll('.game-buttons button').forEach((b) => b.addEventListener('click', game));
  document.querySelector('.end-game button').addEventListener('click', reStartGame);
});
