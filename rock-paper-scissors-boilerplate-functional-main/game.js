let teamYouScore = 0;
let teamCompScore = 0;

const images = [
    './assets/paper-hand.png',
    './assets/rock-hand.png',
    './assets/scissors-hand.png'
];

function getRandomImage() {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
}

const randomImageElement = document.getElementById('randomImage');
const scoresElement = document.querySelector('.score');
// Set the src attribute of the img element to a random image
//randomImageElement.src = getRandomImage();

function update_random_img(){
    randomImageElement.src = getRandomImage();

}
const RockButton = document.getElementById('rock');
const Paperbutton = document.getElementById('paper');
const ScissorsButton=document.getElementById('scissors');


function handleButtonClick(choice){
    const imageSrc = `./assets/${choice}-hand.png`;

    const displayedImage= document.getElementById('display-image');

    displayedImage.src = imageSrc;

    update_random_img();

    checkComparison(choice);

    if(teamYouScore === 5 || teamCompScore === 5){
        endGame();
    }
}


function checkComparison(userChoice){
    const computerChoice = randomImageElement.src;

    const userFilename = userChoice.substring(userChoice.lastIndexOf('/') + 1);
    const computerFilename = computerChoice.substring(computerChoice.lastIndexOf('/') + 1);

    if (userFilename === computerFilename) {
        // It's a tie
        alert("It's a tie! Play your next move");}
    if (
        (userFilename.includes('rock') && computerFilename.includes('scissors')) ||
        (userFilename.includes('scissors') && computerFilename.includes('paper')) ||
        (userFilename.includes('paper') && computerFilename.includes('rock'))
    ) {
        // User wins
        teamYouScore++;
    } else
      { 
        // Computer wins
        teamCompScore++;
    }  
     
    // Update the scores
    if (userFilename !== computerFilename) {
        updateScores();
    }
    }

function updateScores() {
    scoresElement.textContent = `${teamYouScore} - ${teamCompScore}`;
}

function endGame() {
    // Display end of game message
    let winner;
    if (teamYouScore > teamCompScore) {
        winner = "You";
    } else if (teamCompScore > teamYouScore) {
        winner = "Computer";
    } else {
        winner = "It's a tie!";
    }
   
    const resultElement = document.getElementById('result');
    resultElement.textContent = `${winner} won the game!`;

    // Create and append the "Play Again" button
    const playAgainButton = document.createElement('button');
    playAgainButton.textContent = 'Play Again';
    playAgainButton.addEventListener('click', () => {
        // Reload the page to play again
        location.reload();
    });
    resultElement.appendChild(playAgainButton);
    // Reset scores and roundsPlayed for a new game
    teamYouScore = 0;
    teamCompScore = 0;
    roundsPlayed = 0;

    // Update scores
    updateScores();
}

RockButton.addEventListener('click', () => handleButtonClick('rock'));
Paperbutton.addEventListener('click', () => handleButtonClick('paper'));
ScissorsButton.addEventListener('click', () => handleButtonClick('scissors'));


