const tileDisplay = document.querySelector(".tile-container");
const keyboard = document.querySelector(".key-container");
const messageDisplay = document.querySelector(".message-container");

const randomWords = [
  "apple",
  "baker",
  "couch",
  "daisy",
  "eagle",
  "fence",
  "grape",
  "happy",
  "inbox",
  "jolly",
  "kiwi",
  "lemon",
  "mango",
  "nurse",
  "ocean",
  "piano",
  "quiet",
  "river",
  "sunny",
  "table",
  "ultra",
  "vivid",
  "waste",
  "xerox",
  "young",
  "zebra",
  "query",
  "dance",
  "flame",
  "globe",
  "honor",
  "ivory",
  "joker",
  "kiosk",
  "laser",
  "magic",
  "noble",
  "oasis",
  "pluto",
  "quest",
  "rebel",
  "stone",
  "truce",
  "unity",
  "vocal",
  "wrist",
  "xenon",
  "yacht",
  "zesty",
  "angel",
  "bison",
  "chair",
  "dwell",
  "empty",
  "fairy",
  "gears",
  "happy",
  "igloo",
  "jumps",
  "kiwi",
  "latch",
  "motel",
  "noble",
  "ocean",
  "pouch",
  "quilt",
  "rider",
  "sugar",
  "table",
  "under",
  "vivid",
  "waste",
  "xerox",
  "yacht",
  "zebra",
  "amber",
  "bacon",
  "crane",
  "dusty",
  "eleven",
  "flame",
  "giant",
  "house",
  "ivory",
  "jelly",
  "kings",
  "lemon",
  "melon",
  "nurse",
  "oasis",
  "piano",
  "quest",
  "rival",
  "storm",
  "truce",
  "unity",
  "vocal",
  "whale",
  "xylophone",
  "young",
  "zesty",
  "apron",
  "beard",
  "candy",
  "daisy",
  "elbow",
  "flour",
  "grass",
  "happy",
  "island",
  "juice",
  "kiosk",
  "laser",
  "magic",
  "novel",
  "onion",
  "peach",
  "quilt",
  "rider",
  "sunny",
  "thorn",
  "union",
  "vowel",
  "wrist",
  "xenon",
  "zebra",
  "anchor",
  "bloom",
  "crisp",
  "dusty",
  "emily",
  "fudge",
  "glaze",
  "hazel",
  "inked",
  "joust",
  "kiwi",
  "latch",
  "melon",
  "noble",
  "ocean",
  "pluto",
  "quest",
  "rider",
  "stone",
  "truce",
  "unity",
  "vocal",
  "wrist",
  "xenon",
  "yacht",
  "zebra",
];
const wordle =
  randomWords[Math.floor(Math.random() * randomWords.length)].toUpperCase();
console.log(wordle);
const keys = [
  "Q",
  "W",
  "E",
  "R",
  "T",
  "Y",
  "U",
  "I",
  "O",
  "P",
  "A",
  "S",
  "D",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  "ENTER",
  "Z",
  "X",
  "C",
  "V",
  "B",
  "N",
  "M",
  "<<",
];

const guessRows = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

let currentRow = 0;
let currentTile = 0;
let isGameOver = false;
//create keyBoard
guessRows.forEach((guessRow, guessRowIndex) => {
  const rowElement = document.createElement("div");
  rowElement.setAttribute("id", "guessRow-" + guessRowIndex);

  //create game board
  guessRow.forEach((guess, guessIndex) => {
    const tileElement = document.createElement("div");
    tileElement.setAttribute(
      "id",
      "guessRow-" + guessRowIndex + "-tile-" + guessIndex
    );
    tileElement.classList.add("tile");
    rowElement.append(tileElement);
  });
  tileDisplay.append(rowElement);
});

keys.forEach((key) => {
  const buttonElement = document.createElement("button");
  buttonElement.innerText = key;
  buttonElement.setAttribute("id", key);
  buttonElement.addEventListener("click", () => handleClick(key));
  keyboard.append(buttonElement);
});

const handleClick = (letter) => {
  if (letter === "<<") {
    deleteLetter();
    return;
  }
  if (letter === "ENTER") {
    checkRow();
    return;
  }
  addLetter(letter);
};

const addLetter = (letter) => {
  if (currentTile < 5 && currentRow < 6) {
    const tile = document.getElementById(
      "guessRow-" + currentRow + "-tile-" + currentTile
    );
    tile.textContent = letter;
    guessRows[currentRow][currentTile] = letter;
    tile.setAttribute("data", letter);
    currentTile++;
  }
};

const deleteLetter = () => {
  if (currentTile > 0) {
    currentTile--;
    const tile = document.getElementById(
      "guessRow-" + currentRow + "-tile-" + currentTile
    );
    tile.textContent = "";
    guessRows[currentRow][currentTile] = "";
    tile.setAttribute("data", "");
  }
};

const checkRow = () => {
  const guess = guessRows[currentRow].join("");
  if (currentTile > 4) {
    flipTile();
    if (wordle === guess) {
      showMessage("Magnificent");
      isGameOver = true;
      return;
    } else {
      if (currentRow >= 5) {
        isGameOver = false;
        showMessage(`Game Over! Wordle Was ${wordle}`);
        return;
      }
      if (currentRow < 5) {
        currentRow++;
        currentTile = 0;
      }
    }
  }
};

const showMessage = (message) => {
  const messageElement = document.createElement("p");
  messageElement.innerText = message;
  messageDisplay.append(messageElement);

  setTimeout(() => {
    messageDisplay.removeChild(messageElement);
  }, 6000);
};

const addColorToKey = (keyLetter, color) => {
  const key = document.getElementById(keyLetter);
  key.classList.add(color);
};

const flipTile = () => {
  const rowTiles = document.querySelector("#guessRow-" + currentRow).childNodes;
  const guess = [];
  let checkWordle = wordle;

  rowTiles.forEach((tile) => {
    guess.push({ letter: tile.getAttribute("data"), color: "grey-overlay" });
  });

  guess.forEach((guess, index) => {
    if (guess.letter == wordle[index]) {
      guess.color = "green-overlay";
      checkWordle = checkWordle.replace(guess.letter, "");
    }
  });

  guess.forEach((guess) => {
    if (checkWordle.includes(guess.letter)) {
      guess.color = "yellow-overlay";
      checkWordle = checkWordle.replace(guess.letter, "");
    }
  });

  rowTiles.forEach((tile, index) => {
    setTimeout(() => {
      tile.classList.add("flip");
      tile.classList.add(guess[index].color);
      addColorToKey(guess[index].letter, guess[index].color);
    }, 500 * index);
  });
};
