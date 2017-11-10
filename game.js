var inquirer = require('inquirer');
var isLetter = require('is-letter');
var Word = require('./word.js');

var words = ['ARAGORN', 'GIMLI', 'LEGOLAS', 'FRODO', 'SAMWISE', 'GANDALF', 'MERRY', 'PIPPIN', 'BOROMIR'];
var guessesLeft = 10;
var guessedLetters = [];
var wordToGuess;

function newGame() {
	if (guessesLeft === 10) {
	 	console.log("Get ready!");
		console.log('====================');
		var wordToGuess = new Word(words[Math.floor(Math.random() * words.length)]);
	  	wordToGuess.getLetters();
	  	console.log(wordToGuess.wordRender());
	  	prompt(wordToGuess);
	} else {
	  	guessesLeft = 10;
	  	newGame();
	}
};

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
	}]).then(function(lttr) {
		var userGuess = (lttr.letter).toUpperCase();
	  	var guessedAlready = false;
	    for (var i = 0; i < guessedLetters.length; i++) {
	      	if (userGuess === guessedLetters[i]) {
	        	guessedAlready = true;
	      	}
	    }
	    if (guessedAlready === false) {
	      guessedLetters.push(userGuess);
	      var found = wordToGuess.checkIfLetterFound(userGuess);
	      if (found === 0) {
	        console.log('Nope! You guessed wrong.');
	        guessesLeft--;
	        console.log('Guesses remaining: ' + guessesLeft);
	        console.log('\n====================');
	        console.log(wordToGuess.wordRender());
	        console.log('\n====================');
	        console.log("Letters guessed: " + guessedLetters);
	      } else {
	        console.log('That\'s right!');
	          if (wordToGuess.didWeFindTheWord() === true) {
	            console.log(wordToGuess.wordRender());
	            console.log('Congratulations, you win!');
	          } else {
	            console.log('Guesses remaining: ' + guessesLeft);
	            console.log(wordToGuess.wordRender());
	            console.log('\n====================');
	            console.log("Letters guessed: " + guessedLetters);
	          }
	      }
	      if (guessesLeft > 0 && wordToGuess.wordFound === false) {
	        prompt(wordToGuess);
	      } else if (guessesLeft === 0){
	        console.log('The word was: ' + wordToGuess.word);
	      }
	    } else {
	        console.log("You've guessed that letter already. Try again.")
	        prompt(wordToGuess);
	      }
	});
}

newGame();