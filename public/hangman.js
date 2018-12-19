'use strict';

const greetingsArray = ['hola','jambo','salaam','bonjour','ohayo','ola','konichiwa'];
//generate random greeting
let randomized = Math.floor(Math.random() * greetingsArray.length);
let selectedWord = greetingsArray[randomized];
console.log(selectedWord);
let correct = [];
let incorrect = [];
let underscore = [];

let underscoreFill = document.getElementsByClassName('underscore');
let correctletters = document.getElementsByClassName('correctletters');
let incorrectletters = document.getElementsByClassName('incorrectletters');


//this function generates the correct number of underscores based on the length of the selected word
let setupUnderscores = () => {
  for(let i = 0; i < selectedWord.length; i++){
    underscore.push('_');
  }
  return underscore;
}

// run user guess based on letter key pressed
document.addEventListener('keypress', (event) => {
  let keyletter = String.fromCharCode(event.keyCode);
  //if the guess is correct
  if(selectedWord.indexOf(keyletter) > -1) {
    //if the user's guess is correct
    correct.push(keyletter);
    //change the underscore to the correct letter
    underscore[selectedWord.indexOf(keyletter)] = keyletter;
    underscoreFill[0].innerHTML = underscore.join(' ');
    correctletters[0].innerHTML = correct;
    //verify the users input matches guesses
    if(underscore.join('') === selectedWord) {
      alert('Congratulations! You\'ve solved the puzzle');
    }
  } else {
    //populate incorrect letters
    incorrect.push(keyletter);
    incorrectletters[0].innerHTML = incorrect;
  }
});

underscoreFill[0].innerHTML = setupUnderscores().join(' ');