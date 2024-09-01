const alphabetLetters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

const selectedWord = "rainbow";
const textArr = [...selectedWord];
let wrongGuess = 0;
let correctGuess = 0;

alphabetLetters.forEach((e, i) => {
  const btn = `<span class="btns btn__num__${i}" btnValue="${e}">${e}</span>`;
  $(".container--keyboard").append(btn);
  $(`.btn__num__${i}`).click((e) => {
    checkTheLetter(e.target.getAttribute("btnValue"), `btn__num__${i}`);
  });
});

textArr.forEach((e, i) => {
  const textPart = `<span class="wordPieces letter__num__${i}"></span>`;
  $(".word").append(textPart);
});

function checkTheLetter(letter, btnClass) {
  $(`.${btnClass}`).off("click");
  if (textArr.includes(letter)) {
    correctLetter(letter, btnClass);
  } else {
    wrongLetter(btnClass);
  }

  checkGameStatus();
}

function correctLetter(letter, btnClass) {
  const letterIndex = textArr.indexOf(letter);
  $(`.${btnClass}`).addClass("correctChoice selectedLetter");
  $(`.${btnClass}`).off("click");
  $(`.letter__num__${letterIndex}`).text(letter);
  correctGuess++;
}

function wrongLetter(btnClass) {
  $(`.${btnClass}`).addClass("wrongChoice selectedLetter");
  wrongGuess++;
  $(`.hangman div`).text(wrongGuess);
}

function checkGameStatus() {
  if (correctGuess === selectedWord.length) {
    console.log("we have winner");
  }

  if(wrongGuess === 7) {
    console.log("you loosed")
  }
}
