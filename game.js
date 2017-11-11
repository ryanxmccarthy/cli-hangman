var inquirer = require('inquirer');
var isLetter = require('is-letter');
var Word = require('./word.js');

var words = ['ARAGORN', 'GIMLI', 'LEGOLAS', 'FRODO', 'SAMWISE', 'GANDALF', 'MERRY', 'PIPPIN', 'BOROMIR'];
var guessesLeft = 10;
var guessedLetters = [];
var wordToGuess;

function newGame() {
	if (guessesLeft === 10) {
		guessedLetters = [];
	 	console.log("Lord of the Rings Hangman");
		console.log('========================================');
		var wordToGuess = new Word(words[Math.floor(Math.random() * words.length)]);
	  	wordToGuess.getLetters();
	  	console.log(wordToGuess.showWord());
	  	prompt(wordToGuess);
	} else {
	  	guessesLeft = 10;
	  	newGame();
	}
};

function playAgain() {
	inquirer.prompt([{
	  name: "playAgain",
	  type: "input",
	  message: "Play again? y/n",
	}]).then(function(response) {
		if (response.playAgain === 'y') {
			newGame()
		} else {
			console.log('Bye!')
		}
	})
}

function prompt(wordToGuess) {
	inquirer.prompt([{
	  name: "letter",
	  type: "input",
	  message: "Choose a letter:",
	  validate: function(value) {
	    if (isLetter(value)) {
	      	return true;
	    } else {
	      	return false;
	    }
	}
	}]).then(function(letter) {
		var userGuess = (letter.letter).toUpperCase();
	  	var guessedAlready = false;
	    for (var i = 0; i < guessedLetters.length; i++) {
	      	if (userGuess === guessedLetters[i]) {
	        	guessedAlready = true;
	      	}
	    }
	    if (guessedAlready === false) {
	      guessedLetters.push(userGuess);
	      var found = wordToGuess.letterFound(userGuess);
	      if (found === 0) {
	        console.log('Nope! You guessed wrong.');
	        guessesLeft--;
	        console.log('Guesses remaining: ' + guessesLeft);
	        console.log('\n========================================');
	        console.log(wordToGuess.showWord());
	        console.log('\n========================================');
	        console.log("Letters guessed: " + guessedLetters);
	      } else {
	        console.log('That\'s right!');
	          if (wordToGuess.wordGuessed() === true) {
	            console.log(wordToGuess.showWord());
	            console.log('Congratulations, you win!');
	            playAgain();
	          } else {
	            console.log('Guesses remaining: ' + guessesLeft);
	            console.log(wordToGuess.showWord());
	            console.log('\n========================================');
	            console.log("Letters guessed: " + guessedLetters);
	          }
	      }
	      if (guessesLeft > 0 && wordToGuess.wordFound === false) {
	        prompt(wordToGuess);
	      } else if (guessesLeft === 0) {
	        console.log('The word was: ' + wordToGuess.word);
	        playAgain();
	      }
	    } else {
	        console.log("You've guessed that letter already. Try again.")
	        prompt(wordToGuess);
	      }
	});
}

newGame();