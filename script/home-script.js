import { wordGroups, alphabetLetters } from "./data.js";

let selectedWord = "",
  selectedWordArr,
  wrongGuess = 0,
  correctGuess = 0,
  groupTarget = null,
  newSelectedGroup = {
    name: "",
    member: [],
  };

$(".select--group").click(function () {
  changePage();
});

$(".playAgain").click(function () {
  changePage("result", "game");
  playGame();
  console.log("hello there");
});

$(".select--groupAgain").click(function () {
  groupTarget = "result";
  changePage();
});

function changePage(firstClass = "home", secondClass = "selectGroup") {
  if (groupTarget !== null && firstClass === "home") {
    $("." + groupTarget).toggleClass("none");
    $(".selectGroup").toggleClass("none");
  } else {
    $("." + firstClass).toggleClass("none");
    $("." + secondClass).toggleClass("none");
  }
}

function playGame() {
  chooseWord();
  wrongGuess = 0;
  correctGuess = 0;
  putLetterInKeyword();
  $(".mistakes").addClass("none");
}

function chooseWord() {
  const randomId = Math.floor(Math.random() * 10);
  selectedWord = newSelectedGroup.member[randomId];
  selectedWordArr = [...selectedWord];
}

function putLetterInKeyword() {
  $(".keyboard").empty();
  $(".word").empty();

  alphabetLetters.forEach((e, i) => {
    const btn = `<span class="btns btn__num__${i}" btnValue="${e}">${e}</span>`;
    $(".keyboard").append(btn);
    $(`.btn__num__${i}`).click((e) => {
      checkTheLetter(e.target.getAttribute("btnValue"), `btn__num__${i}`);
    });
  });

  selectedWordArr.forEach((e, i) => {
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
  // const letterIndex = selectedWordArr.indexOf(letter);
  const letterIndex = giveLetterIndex(letter);
  for (var i = 0; i < letterIndex.length; i++) {
    $(`.letter__num__${letterIndex[i]}`).text(letter);
    correctGuess++;
  }
  $(`.${btnClass}`).addClass("correctChoice selectedLetter");
  $(`.${btnClass}`).off("click");
}

function giveLetterIndex(letter) {
  const foundedIndexes = [];

  for (var i = 0; i < selectedWord.length; i++) {
    if (selectedWord[i] === letter) foundedIndexes.push(i);
  }

  return foundedIndexes;
}

function wrongLetter(btnClass) {
  $(`.${btnClass}`).addClass("wrongChoice selectedLetter");
  wrongGuess++;
  $(`.hangman--mistake${wrongGuess}`).removeClass("none");
  $(`.hangman div`).text(wrongGuess);
}

function checkGameStatus() {
  if (correctGuess === selectedWord.length) {
    changePage("game", "result");
    showResult("won");
    playParty();
  }

  if (wrongGuess === 7) {
    changePage("game", "result");
    showResult("loose");
  }
}

function showResult(status) {
  const message = status === "won" ? "won" : "loosed";

  $(".result--status").text(message);
  $(".played--word").text(selectedWord);
}

function playParty() {
  const container = $(".colored--paper--container");
  container.empty();

  for (var i = 0; i < 200; i++) {
    const positonX = Math.floor(Math.random() * 100);
    const positonY = Math.floor(Math.random() * 1000);
    const color = Math.floor(Math.random() * 16777215).toString(16);
    const span = `<span style="left: ${positonX}%; background: #${color}; transform: translateY(${positonY}px);" class="colored--paper"></span>`;
    container.append(span);
  }

  container.animate(
    {
      top: "1000px",
    },
    3000, function() {
      container.css("top", "-1100px")
    }
  );
}

function activePlayBtn() {
  const playBtn = $(".play--btn");
  if (newSelectedGroup.name !== "") {
    playBtn.removeClass("disable--btn");
    playBtn.removeAttr("disabled", "false");
    playBtn.on("click", function () {
      changePage("game", "home");
      playGame();
    });
  }
}

wordGroups.forEach((member, i) => {
  const button = `<a class="group--btns fas group--btn--${i}">${member.groupName} <i class="${member.icon}"></i></a>`;
  $(".selectGroup--container").append(button);
  $(`.group--btn--${i}`).click(() => {
    newSelectedGroup.name = member.groupName;
    newSelectedGroup.member = member.groupMember;
    changePage();
    activePlayBtn();
  });
});
