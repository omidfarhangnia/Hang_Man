import { wordGroups, alphabetLetters } from "./data.js";

let selectedWord = "",
  selectedWordArr,
  wrongGuess = 0,
  correctGuess = 0,
  newSelectedGroup = {
    name: "",
    member: [],
  };

$(".select--group").click(function () {
  changePage("home", "selectGroup");
});

function changePage(firstClass, secondClass) {
  $("." + firstClass).toggleClass("none");
  $("." + secondClass).toggleClass("none");
}

function playGame() {
  changePage("game", "home");
  chooseWord();
  wrongGuess = 0;
  correctGuess = 0;
  putLetterInKeyword();
}

function chooseWord() {
  const randomId = Math.floor(Math.random() * 10) + 1;
  selectedWord = newSelectedGroup.member[randomId];
  selectedWordArr = [...selectedWord];
}

function putLetterInKeyword() {
  alphabetLetters.forEach((e, i) => {
    const btn = `<span class="btns btn__num__${i}" btnValue="${e}">${e}</span>`;
    $(".keyboard").append(btn);
    $(`.btn__num__${i}`).click((e) => {
      checkTheLetter(e.target.getAttribute("btnValue"), `btn__num__${i}`);
    });
  });

  textArr.forEach((e, i) => {
    const textPart = `<span class="wordPieces letter__num__${i}"></span>`;
    $(".word").append(textPart);
  });
}

function checkTheLetter(letter, btnClass) {
  $(`.${btnClass}`).off("click");
  if (selectedWordArr.includes(letter)) {
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

  if (wrongGuess === 7) {
    console.log("you loosed");
  }
}

function activePlayBtn() {
  const playBtn = $(".play--btn");
  if (newSelectedGroup.name !== "") {
    playBtn.removeClass("disable--btn");
    playBtn.removeAttr("disabled", "false");
    playBtn.on("click", playGame);
  }
}

wordGroups.forEach((member, i) => {
  const button = `<a class="group--btns fas group--btn--${i}">${member.groupName} <i class="${member.icon}"></i></a>`;
  $(".selectGroup--container").append(button);
  $(`.group--btn--${i}`).click(() => {
    newSelectedGroup.name = member.groupName;
    newSelectedGroup.member = member.groupMember;
    changePage("home", "selectGroup");
    activePlayBtn();
  });
});
