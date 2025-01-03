let min = 1;
let max = 100;

let getRandomNum = (min, max) => {
  return parseInt(Math.floor(Math.random() * (max - min + 1) + min));
};
let winningNum = getRandomNum(min, max);

// Elements
let attempts = document.querySelector("#attempts");
let guess = document.querySelector("#guess");
let submitBtn = document.querySelector("#submitBtn");
let resetBtn = document.querySelector("#resetBtn");
let messageContent = document.querySelector("#message");
let proximityMsg = document.querySelector("#proximity");
let prevGuess = document.querySelector("#prevGuess");
let attemptNum = 10;
let prevGuessNums = [];

// Validation
let validation = (guess) => {
  if (isNaN(guess)) {
    messageContent.textContent = "Please enter a number.";
    messageContent.style.color = "red";
  } else if (guess < min || guess > max) {
    messageContent.textContent = `Please enter a number between ${min} and ${max}`;
    messageContent.style.color = "red";
  } else {
    messageContent.textContent = " ";
    guessCheck(guess);
    guessUpdate(guess);
  }
};

// Checks

let guessCheck = (guess) => {
  if (guess == winningNum) {
    messageContent.textContent = `You guessed the correct number. The number was ${winningNum}`;
    messageContent.style.color = "green";
    resetCheck(guess);
  } else {
    attemptNum -= 1;
    attempts.textContent = `${attemptNum}`;
    messageContent.textContent = `Try again. You have ${attemptNum} attempts`;
    messageContent.style.color = "yellow";
  }
  attmeptCheck();
};

// Attempt Check
let attmeptCheck = () => {
  if (attemptNum <= 0) {
    messageContent.textContent = `You are Out of Attempts.`;
    attempts.textContent = "0";
  }
};

// Reset Check
let resetCheck = (guess) => {
  if (attemptNum == 0 || guess == winningNum) {
    submitBtn.style.display = "none";
    resetBtn.style.display = "inline-block";
    resetBtn.addEventListener("click", () => {
      location.reload();
    });
  }
};

// Previous Guess Update
let guessUpdate = (guess) => {
  if (attemptNum > 0) {
    prevGuessNums.push(guess);
    prevGuess.textContent = `Previous Guesses: ${prevGuessNums}`;
  }
};

// Proximity of Guess

let proximity = (guess) => {
  if (guess < winningNum) {
    proximityMsg.textContent = "Too Low";
  } else if (guess > winningNum) {
    // console.log("High");
    proximityMsg.textContent = "Too High";
  }
};

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const guessInput = parseInt(guess.value);
  validation(guessInput);
  resetCheck(guessInput);
  proximity(guessInput);
  guess.value = "";
});
