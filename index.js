import {
  startTimer,
  stopTimer,
  resetTimer,
  timer,
} from "./src/scripts/timer.js";

import { generateSudoku } from "./src/scripts/create-sudoku.js";

const SELECTORS = {
  getButton: "get-btn",
  checkButton: "check-btn",
  grid: "grid",
  buttonsGrid: "buttons-grid",
  menuContainer: "menu-container",
  winContainer: "win-container",
  loading: "loading",
  menuButtonHamb: "menu-hamb-icon",
  menuButtonClose: "menu-close-icon",
  repeatButton: "repeat-btn",
  timerResult: "timerResult",
};

const {
  getButton,
  checkButton,
  grid,
  buttonsGrid,
  menuContainer,
  winContainer,
  loading,
  menuButtonHamb,
  menuButtonClose,
  repeatButton,
  timerResult,
} = Object.entries(SELECTORS).reduce((acc, [key, id]) => {
  acc[key] = document.getElementById(id);
  return acc;
}, {});

let puzzle;
let solvedPuzzle;

function createGrid() {
  // Standard sudokus and the response from the API have 81 tiles
  for (let i = 0; i <= 80; i++) {
    const newTile = document.createElement("li");
    const newImg = document.createElement("img");
    grid.appendChild(newTile);
    newTile.appendChild(newImg);

    if ((i + 1) % 9 === 0 && (i + 1) % 3 === 0) {
      newTile.classList.add("right-border");
    } else if ((i + 1) % 3 === 0) {
      newTile.classList.add("right-border");
    }

    if (i >= 18 && i <= 26) {
      newTile.classList.add("bottom-border");
    } else if (i >= 45 && i <= 53) {
      newTile.classList.add("bottom-border");
    }
  }
}

createGrid();

function conCatData(data) {
  // Uncomment next line to test with demoData
  // return data
  return data[0].concat(
    data[1],
    data[2],
    data[3],
    data[4],
    data[5],
    data[6],
    data[7],
    data[8]
  );
}

function writeSudoku() {
  for (let i = 0; i <= 80; i++) {
    const tile = grid.children[i];
    const tileImg = grid.children[i].children[0];

    // Initialize blank tiles
    tileImg.src = "";
    tileImg.alt = "";
    tile.classList.remove("initial-value");
    tile.classList.remove("wrong");

    if (puzzle[i] > 0) {
      tileImg.src = `./src/img/${puzzle[i]}.png`;
      tileImg.alt = `${puzzle[i]}`;
      tileImg.classList.add("initial-value");
    }
  }
}

//Handle menus
const openMenu = () => {
  menuContainer.style.left = "0";
  menuButtonHamb.style.left = "-100vw";
};

const closeMenu = () => {
  menuContainer.style.left = "-100vw";
  menuButtonHamb.style.left = "10px";
};

const openWinMenu = () => {
  winContainer.style.top = "0";
};

const closeWinMenu = () => {
  winContainer.style.top = "-100vh";
};

//Handle buttons
getButton.addEventListener("click", async () => {
  loading.style.display = "block";
  menuButtonClose.style.display = "block";
  const { puzzle: fetchedPuzzle, solution: fetchedSolvedPuzzle } =
    generateSudoku(40);

  loading.style.display = "none";
  puzzle = conCatData(fetchedPuzzle);
  solvedPuzzle = conCatData(fetchedSolvedPuzzle);
  closeMenu();
  writeSudoku();
  resetTimer();
  startTimer();
});

repeatButton.addEventListener("click", () => {
  openMenu();
  closeWinMenu();
});

menuButtonHamb.addEventListener("click", () => {
  openMenu();
  stopTimer();
});

menuButtonClose.addEventListener("click", () => {
  closeMenu();
  startTimer();
});

checkButton.addEventListener("click", () => {
  checkUserSolution();
});

//Target selected tile
let selectedTile;

grid.addEventListener("click", (event) => {
  if (selectedTile?.children[0] === event.target) {
    selectedTile.children[0].src = "";
    selectedTile.children[0].alt = "";
    return;
  }
  if (event.target.classList[0] === "initial-value") return;
  // Remove previous selected tile
  if (selectedTile) selectedTile.classList.remove("selected");

  // Selected tile will allways be the <li> element
  !event.target.children[0]
    ? (selectedTile = event.target.parentNode)
    : (selectedTile = event.target);

  selectedTile.classList.remove("wrong");
  if (event.target.id != "grid") selectedTile.classList.add("selected");
});

//Target selected symbol to insert
buttonsGrid.addEventListener("click", (event) => {
  const buttonValue = event.target.alt;
  if (buttonValue && selectedTile && selectedTile.children[0]) {
    selectedTile.children[0].src = `./src/img/${buttonValue}.png`;
    selectedTile.children[0].alt = `${buttonValue}`;
    selectedTile.classList.remove("wrong");
  } else if (buttonValue && selectedTile) {
    selectedTile.src = `./src/img/${buttonValue}.png`;
    selectedTile.alt = `${buttonValue}`;
  }
});

function checkUserSolution() {
  let wrongTiles = 0;
  let blankTiles = 0;
  //Make a new array with user answers matching the data that we have from solvedPuzzle
  const tiles = [].slice.call(grid.children);

  for (const [i, tile] of tiles.entries()) {
    if (!tile.children[0].alt) {
      blankTiles++;
      continue;
    }
    if (tile.children[0].alt != solvedPuzzle[i]) {
      grid.children[i].classList.add("wrong");
      wrongTiles++;
    }
  }

  if (blankTiles === 81) {
    //All tiles empty === there's no game started yet && no sudoku to check
    alert(`The puzzle is empty! Try pressing the NEW PUZZLE button`);
    return;
  }

  countWrongAndBlank(wrongTiles, blankTiles);
  closeMenu();
  startTimer();
}

function countWrongAndBlank(wrongTiles, blankTiles) {
  if (wrongTiles > 0 && blankTiles > 0)
    alert(
      `Wrong! you made ${wrongTiles} mistakes and you are missing ${blankTiles} tiles!`
    );
  else if (blankTiles > 0) alert(`You are missing ${blankTiles} tiles!`);
  else if (wrongTiles > 0) alert(`Wrong! you made ${wrongTiles} mistakes`);
  else if (wrongTiles === 0 && blankTiles === 0) {
    openWinMenu();
    timerResult.innerText = timer;
  }
}

//Cheat: in order to test final steps you can just press "g" to solve the sudoku,🤫 don't tell anyone
function solveSudoku() {
  for (let i = 0; i <= 80; i++) {
    const tile = grid.children[i];
    tile.classList.remove("initial-value");

    if (solvedPuzzle[i] > 0) {
      const tileImg = grid.children[i].children[0];
      tileImg.src = `./src/img/${solvedPuzzle[i]}.png`;
      tileImg.alt = `${solvedPuzzle[i]}`;
    }

    tile.classList.remove("wrong");
  }
}

document.addEventListener("keypress", (e) => {
  if (!solvedPuzzle) return;
  if (e.key === "q") solveSudoku();
});
