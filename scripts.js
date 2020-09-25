// game parameters to track
let playerScore = 0;
let computerScore = 0;
let playerChoice = '';
let computerChoice = '';
let computerChoiceMessage = document.querySelector('#computer-play');
let gameResult = 0;
let numberOfRounds = 5;
let roundMessage = document.querySelector('#round-message');
let winningMessage = document.querySelector('#winning-message');
let resetButton = document.querySelector('#reset');
// define the three possible options in an array
const selections = ['rock', 'paper', 'scissors'];
// add listerners for play buttons
const playButtons = document.querySelectorAll('#play-buttons>button');

// display change inner html of selector
function displayMessage(selector, message) {
    selector.innerHTML = message;
}

// Update player and Computer score in html
function updateScore() {
    document.querySelector('#score').innerHTML = `${playerScore}    -   ${computerScore}`;
}

// message for computer selection
function getComputerChoiceMessage() {
    return `The computer played ${computerChoice.italics()}`;
}

// tracks the number of rounds left then shows final sessage and disables buttons
function updateRounds() {
    // check number of rounds left
    numberOfRounds--;
    if (numberOfRounds < 1) {
        displayMessage(winningMessage, getWinningMessage());
        disableButtons();
    }

}
// enable play buttons
function enableButtons() {
    playButtons.forEach(button => {
        button.disabled = false;
    })
}
// disable play buttons
function disableButtons() {
    playButtons.forEach(button => {
        button.disabled = true;
    })
}

// get the winning message depanding on the result
function getWinningMessage() {
    let message = '';
    if (playerScore > computerScore) {
        message = `Congratulations! You Won the Game!`;
    }
    else if (playerScore < computerScore) {
        message = `Unfortunately! You Lost the Game! Better luck next time!`;
    }
    else {
        message = `The Game is a Draw!`;
    }
    return message;
}
 // resets all vriables required to restart the game
function resetGame() {
    // reset scores, remove messages and reenable buttons
    playerScore = 0;
    computerScore = 0;
    numberOfRounds = 5;
    enableButtons()
    displayMessage(computerChoiceMessage, '');
    displayMessage(roundMessage, '');
    displayMessage(winningMessage, '');
    updateScore();
}
// play round function
function playRound(playerSelection, computerSelection) {
    // check that the play entry is valid
    if (!selections.includes(playerSelection.toLowerCase())) {
        return 'Invalid input. Enter rock, paper or scissors.'
    }
    // convert to lower case so input case doesn't matter
    let player = playerSelection.toLowerCase();
    let computer = computerSelection.toLowerCase();
    let roundResultMesssage = '';
    // draw
    if (player === computer) {
        //console.log(`This round is a draw! ${playerSelection} equals ${computerSelection}.`);
        playerScore++;
        computerScore++;
        roundResultMesssage = `This round is a draw! ${playerSelection} equals ${computerSelection}.`;
    }
    else {
        // win/lose conditions
        let diff = selections.indexOf(player) - selections.indexOf(computer);
        if ((diff == -1) || (diff == 2)) {
            //console.log(`You Lose this round! ${playerSelection} loses to ${computerSelection}.`);
            computerScore++;
            roundResultMesssage = `You Lose this round! ${playerSelection} loses to ${computerSelection}.`;
        }
        else {
            playerScore++;
            roundResultMesssage = `You Win this round! ${playerSelection} beats ${computerSelection}.`;
        }
    }
    // update rounds left
    updateScore();
    displayMessage(roundMessage, roundResultMesssage);
    updateRounds()
}

function computerPlay() {
    // pick a random number from 0 - 2 (array locations)
    let pick = Math.floor(Math.random() * 3);
    // return the pick at the randomly selected array location
    computerChoice = selections[pick];
    displayMessage(computerChoiceMessage, getComputerChoiceMessage());
    return computerChoice;
}

// Add click listners for play buttons
playButtons.forEach(button => button.addEventListener('click', () => {
    playRound(button.id, computerPlay());
}));

// add click listner for reset button
resetButton.addEventListener('click', () => {
    resetGame();
});

