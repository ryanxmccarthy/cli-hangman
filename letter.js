var Letter = function(letter) {
  this.letter = letter;
  this.show = false;
  this.showLetter = function() {
	if(this.show === false) {
      return ' _ ';
    } else {
      return this.letter;
    }
  }
}

module.exports = Letter;