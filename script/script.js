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

const selectedWord = "rainbow"

function giveBtns() {
    const arr = [];
    for(var i = 0; i < alphabetLetters.length; i++) {
        arr.push(`<span class="btns">${alphabetLetters[i]}</span>`)
    }
    
    return arr.join("");
}

function giveTextPieces() {
    const arr = [];
    for(var i = 0; i < selectedWord.length; i++) {
        arr.push(`<span class="wordPieces"></span>`)
    }

    return arr.join("");
}

$(".container--keyboard").html(giveBtns)
$(".word").html(giveTextPieces)