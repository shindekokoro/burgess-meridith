var timer = 1000; // 1 Second
var timeRemaining = 30; // 60 Seconds (1 minute)
var wins = 0;
var losses = 0;

var words = ["JavaScript", "Java", "C Plus Plus", "C Sharp", "Swift", "Python"];
var winningWord = pickWord(words);
var tempWord = updateTempWord(null, null);
var guessedLetters = [];

var gameSpace = document.querySelector("#game");
var gameForm = document.createElement("form");
var startGameButton = document.querySelector("#startGame");
var timeSpan = document.querySelector("#time-remaining");

function startGame() {
    // Remove Start game button from the game space
    gameSpace.removeChild(startGameButton);

    // Start Timer
    var gameTimer = setInterval(() => {
        if (timeRemaining <= 0) {
            clearInterval(gameTimer);
            gameSpace.removeChild(gameForm);
        } else {
            timeRemaining = timeRemaining - 1;
            checkWin();
        }
        timeSpan.textContent = timeRemaining;
    }, timer);

    // Display _ _ initial word
    var h1 = document.createElement("h1");
    gameSpace.appendChild(h1);
    h1.textContent = renderTempWord();

    createUserForm();
}

function updateTempWord(letter, indexes) {
    if(!tempWord) {
        var temp = ""
        for(var i = 0; i < winningWord.length; i++) {
            temp = temp + "_"
        }
        return temp.split("");
    } else {
        indexes.forEach(index => {
            tempWord[index] = letter;
        });
        var h1 = document.querySelector("h1");
        return h1.textContent = renderTempWord();
    }
    
}

function renderTempWord() {
    var output = ""
    for(var i = 0; i < tempWord.length; i++) {
        output = output + tempWord[i] + " ";
    }
    return output;
}

function pickWord(wordList) {
    if(Array.isArray(wordList)) {
        var randomIndex = Math.floor(Math.random() * wordList.length);
        return wordList[randomIndex].toUpperCase().split("");
    } else {
        return "Burgess Meredith".toUpperCase().split("");
    }
}

// Submit user guess input
function submitUserInput(event) {
    event.preventDefault();
    var userGuess = document.querySelector("#userGuess");
    if(!userGuess) {
        return;
    }
    var userInput = userGuess.value.split(0,1)[0].toUpperCase();
    userGuess.value = "";

    return compareGuess(userInput);
}

// Compare letter guess and check for win.
function compareGuess(letter) {
    var indexes = indexesOf(winningWord, letter);
    if (indexes.length) {
        updateTempWord(letter, indexes)
    }
    checkWin();
}

function checkWin() {
    var win = winningWord.toString() === tempWord.toString();
    var h2 = document.createElement("h2");
    gameSpace.appendChild(h2);
    if(win) {
        wins++;
        timeRemaining = 0;
        return h2.textContent = "You Win!"
    } else if (timeRemaining <= 0 ) {
        losses++;
        return h2.textContent = "You Lose!"
    }
}

// Return an array of indexes
function indexesOf(array, searchItem) {
    var i = array.indexOf(searchItem);
    var indexes = [];
    while (i !== -1) {
      indexes.push(i);
      i = array.indexOf(searchItem, ++i);
    }
    return indexes;
}

function createUserForm() {
    gameForm.setAttribute("method", "POST");
    gameForm.setAttribute("id", "gameForm");
    gameSpace.appendChild(gameForm);

    // Label for Form
    var formLabel = document.createElement("label");
    formLabel.setAttribute("for", "userGuess");
    formLabel.textContent = "Guess A Letter for Hangman";
    
    // Input for Form
    var formInput = document.createElement("input");
    formInput.setAttribute("type", "text");
    formInput.setAttribute("name", "userGuess");
    formInput.setAttribute("id", "userGuess");
    formInput.setAttribute("placeholder", "Guess A Letter");

    gameForm.appendChild(formLabel)
    gameForm.appendChild(formInput)

    gameForm.addEventListener("submit", submitUserInput);
}

startGameButton.addEventListener("click", startGame);

