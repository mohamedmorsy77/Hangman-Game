let getLetters = document.querySelector(".letters");
let category = document.querySelector(".category span");
let lettersGuess = document.querySelector(".letter-guess");
let container = document.querySelector(".container");

// Letters
const letters = "abcdefghijklmnopqrstuvwxyz";

let lettersArray = Array.from(letters);

lettersArray.forEach((letter) => {
  // Create Span
  let span = document.createElement("span");

  span.textContent = letter;

  // Create ClassName for span

  span.className = "box-letter";

  getLetters.appendChild(span);
});
// Object Of Words + Category
const words = {
  programming: [
    "php",
    "javascript",
    "go",
    "scala",
    "fortran",
    "r",
    "mysql",
    "python",
  ],
  movies: [
    "Prestige",
    "Inception",
    "Parasite",
    "Interstellar",
    "Whiplash",
    "Memento",
    "Coco",
    "Up",
  ],
  people: ["messi", "cristiano", "Alexander", "Cleopatra", "Mahatma Ghandi"],
  countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"],
};
// Get Random Property
// ["programming","movies","people","countries"]
let keys = Object.keys(words);

let randomProp = Math.floor(Math.random() * keys.length); // 0 1 2 3

let randomPropName = keys[randomProp]; // programming or movies or people or countries

let randomPropValue = words[randomPropName];

let randomValue = Math.floor(Math.random() * randomPropValue.length);
// Choosen Word
let categoryValue = randomPropValue[randomValue].toLowerCase();
// Add Category
category.textContent = randomPropName;

// Convert LettersGuess To Array

let lettersAndSpace = Array.from(categoryValue);

lettersAndSpace.forEach((letter) => {
  let span = document.createElement("span");
  if (letter === " ") {
    span.className = "with-space";
  }
  lettersGuess.appendChild(span);
});

//  Number Of Wrong Attemps
let wrongAttemps = 0;
let draw = document.querySelector(".hangman-draw");
document.addEventListener("click", (e) => {
  let theStatus = false;
  if (e.target.className === "box-letter") {
    e.target.classList.add("clicked");

    // Get Letter User
    let UserLetter = e.target.innerHTML.toLowerCase();
    // console.log(lettersAndSpace );
    // console.log(UserLetter);
    lettersAndSpace.forEach((letter, index) => {
      if (letter === UserLetter) {
        theStatus = true;
        let spans = document.querySelectorAll(".letter-guess span");
        spans.forEach((span, spanIndex) => {
          if (spanIndex === index) {
            span.textContent = letter;
          }
        });
      }
    });
    if (!theStatus) {
        wrongAttemps++;
        if (wrongAttemps === 8) {
          endGame();
          getLetters.classList.add("finished");
        }
        draw.classList.add(`wrong-${wrongAttemps}`);
        // Play Fail audio
        document.getElementById("fail").play();
      } else {
        document.getElementById("success").play();
      }
  }

});

// popup
function endGame() {
  let div = document.createElement("div");
  let txt = document.createTextNode(`Game Over,The Word Is ${categoryValue}`);
  div.appendChild(txt);
  div.className = "popup";
  document.body.appendChild(div);
  container.classList.add("blur");
}
