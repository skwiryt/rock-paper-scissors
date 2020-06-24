document.addEventListener('DOMContentLoaded', () => {

    document.querySelector('button').addEventListener('click', game);
            const scoresTable = {
                rock:       { scissors: 1, paper: -1, rock: 0 },
                scissors:   { paper: 1, rock: -1, scissors: 0 },
                paper :     { rock: 1, scissors: -1, paper: 0 }
            }
            let results = {you: 0, computer: 0};

            function playRound(playerSelection, computerSelection) {
                playerSelection = playerSelection.toLowerCase();
                computerSelection = computerSelection.toLowerCase();
                score =  scoresTable[playerSelection][computerSelection]; 
                results["you"] = results["you"] + (score > 0 ? score : 0);
                results["computer"] = results["computer"] - (score < 0 ? score : 0);
                
                return getMessage(playerSelection, computerSelection, score) 
            }
            function getMessage(playerSelection, computerSelection,score) {
                let winnerMessage = `You won, ${playerSelection} wins over ${computerSelection}`;
                let loserMessage = `You lose, ${computerSelection} wins over ${playerSelection}`;
                let drawMessage = "It is a draw!";  
                    
                switch (score){
                    case 1 :
                         return winnerMessage;                         
                    case -1 :
                        return loserMessage;
                    case 0 : 
                        return drawMessage;    
                    default : 
                        return "Wrong data.";
                }         
            }
            
            function computerPlay() {
                const choices = ["rock", "scissors", "paper"];
                let randomIndex = Math.floor(3 * Math.random());
                return choices[randomIndex];
            }
            function showResults(roundMessage) {
                alert(`${roundMessage} \nYour score is: ${results["you"]} vs computer's: ${results["computer"]}`);
            }
            function game() {
                for(let i = 0; i < 5; i++) {
                    let playerSelection = prompt("Choose: 'rock', 'scissors' or 'paper'.")
                    let computerSelection = computerPlay();
                    let roundResult = playRound(playerSelection, computerSelection);
                    let roundMessage = `Round number ${i + 1}. \n${roundResult}`;
                    showResults(roundMessage);
                }
                endOfGame();             
            }
            function endOfGame(){
                alert(`End of game! Final results: \nYour score: ${results["you"]} vs computer's: ${results["computer"]}`);
            }
});