/*
GAME-FUNCTION:
-players must guess a number between a min and a max
- player gets a certain amount of guesses
- notify player of guesses remaining
- notify the player of the correct answer if loose
- let player choose to play again
*/

// Game Values
let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3;

// UI elements
const game = document.querySelector("#game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessBtn = document.querySelector("#guess-Btn"),
  guessInput = document.querySelector("#guess-input"),
  message = document.querySelector(".message");

// Assign UI min and Max
minNum.textContent = min;
maxNum.textContent = max;

//Play Again event listener
game.addEventListener("mousedown", function(e) {
  if (e.target.className === "play-again") {
    window.location.reload();
  }
});

//Listen for guess
guessBtn.addEventListener("click", function() {
  let guess = parseInt(guessInput.value);

  //validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(` Please enter a number between ${min} and ${max}`, "red");
  }
  //Game Over Won
  //Check if won
  if (guess === winningNum) {
    //Optimised the code if won
    gameOver(true, `Woohoo Congratulation, ${winningNum} is correct !`);

    // //disable input
    // guessInput.disabled = true;
    // //if won change border color
    // guessInput.style.borderColor = "green";
    // // setMesssage{let user know they have won}
    // setMessage(`Woohoo Congratulation, ${winningNum} is correct !`, "green");
  } else {
    // Wrong number
    guessesLeft -= 1;

    if (guessesLeft === 0) {
      //Game over - lost {optimised code}
      gameOver(
        false,
        `Game Over, you lost. The correct number was ${winningNum}`
      );
      //   //game continues - answer wrong
      //   //disable input
      //   guessInput.disabled = true;
      //   //if lost change border color
      //   guessInput.style.borderColor = "red";
      //   // setMesssage{let user know they have lost}
      //   setMessage(
      //     `Game Over, you lost. The correct number was ${winningNum}`,
      //     "red"
      //   );
    } else {
      //Game continues -answer wrong

      //Change border color
      guessInput.style.borderColor = "red";

      //clear Input
      guessInput.value = "";

      //Tell user its a wrong number
      setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, "red");
    }
  }
});

//creating setMessage function
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}

//GAME OVER FUNCTION

//creating a function called GAME _OVER
function gameOver(won, msg) {
  let color;
  won === true ? (color = "green") : (color = "red");
  //disable input
  guessInput.disabled = true;
  //if won change border color
  guessInput.style.borderColor = color;

  //Set textcolor
  message.style.color = color;

  // setMesssage{let user know they have won}
  setMessage(msg);

  //Play Again?
  guessBtn.value = "play-again";
  guessBtn.className += "play-again";
}

//GET WINNING NUMBER FUNCTION
/*math.random gives you a random decimal number, howerver putting the function in math.floor gives you a whole number*/
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
