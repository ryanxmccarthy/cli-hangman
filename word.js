var Letter = require('./letter.js');

function Word(word) {
  var that = this;
  this.word = word;
  this.letters = [];
  this.wordFound = false;
  this.getLetters = function() {
    for (var i = 0; i < that.word.length; i++) {
      var newLetter = new Letter(that.word[i]);
      this.letters.push(newLetter);
    }
  };
  this.wordGuessed = function() {
    if (this.letters.every(function(letter) {
      return letter.show === true;
    })){
      this.wordFound = true;
      return true;
    }
  };
  this.letterFound = function(guessedLetter) {
    var whatToReturn = 0;
    this.letters.forEach(function(letter) {
      if (letter.letter === guessedLetter) {
        letter.show = true;
        whatToReturn++;
      }
    })
    return whatToReturn;
  };
  this.showWord = function() {
    var display = '';
    that.letters.forEach(function(letter){
      var currentLetter = letter.showLetter();
      display += currentLetter;
    });
    return display;
  };
};

module.exports = Word;