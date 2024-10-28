import {
  fetchedPuzzle,
  fetchedSolvedPuzzle,
  getPuzzle,
} from "./src/scripts/api.js";
import {
  startTimer,
  stopTimer,
  resetTimer,
  timer,
} from "./src/scripts/timer.js";

// ==================== Constants ====================
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

const GRID_SIZE = 81;

// ==================== DOM Elements ====================
const elements = Object.entries(SELECTORS).reduce((acc, [key, id]) => {
  acc[key] = document.getElementById(id);
  return acc;
}, {});

// ==================== State ====================
let puzzle = fetchedPuzzle;
let solvedPuzzle = fetchedSolvedPuzzle;
let selectedTile = null;

// ==================== Utility Functions ====================

/**
 * Concatenates a 2D array into a 1D array.
 * @param {Array<Array<number>>} data - The 2D array to concatenate.
 * @returns {Array<number>} - The concatenated 1D array.
 */
const concatenatePuzzleData = (data) => data.flat();

/**
 * Creates the Sudoku grid by appending tiles to the grid element.
 */
const createGrid = () => {
  // by creating a document fragment we can append all the tiles at once
  // this is, in terms of performance, better than appending them one by one
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < GRID_SIZE; i++) {
    const tile = document.createElement("li");
    const tileImg = document.createElement("img");
    tile.appendChild(tileImg);
    fragment.appendChild(tile);
  }
  elements.grid.appendChild(fragment);
};

/**
 * Initializes the Sudoku grid with the current puzzle.
 */
const initializeGrid = () => {
  Array.from(elements.grid.children).forEach((tile, index) => {
    const tileImg = tile.querySelector("img");
    const value = puzzle[index];

    tileImg.src = value > 0 ? `./src/img/${value}.png` : "";
    tileImg.alt = value > 0 ? `${value}` : "";
    tile.classList.toggle("initial-value", value > 0);
    tile.classList.remove("wrong");
  });
};

/**
 * Opens a specified menu.
 * @param {HTMLElement} menu - The menu element to open.
 * @param {HTMLElement} hideButton - The button to hide when the menu is open.
 */
const openMenu = (menu, hideButton) => {
  menu.style.left = "0";
  if (hideButton) hideButton.style.left = "-100vw";
};

/**
 * Closes a specified menu.
 * @param {HTMLElement} menu - The menu element to close.
 * @param {HTMLElement} showButton - The button to show when the menu is closed.
 */
const closeMenu = (menu, showButton) => {
  menu.style.left = "-100vw";
  if (showButton) showButton.style.left = "10px";
};

/**
 * Opens the win menu.
 */
const openWinMenu = () => {
  elements.winContainer.style.top = "0";
};

/**
 * Closes the win menu.
 */
const closeWinMenu = () => {
  elements.winContainer.style.top = "-100vh";
};

/**
 * Handles tile selection in the grid.
 * @param {Event} event - The click event.
 */
const handleGridClick = (event) => {
  const clickedElement = event.target;
  if (selectedTile?.contains(clickedElement)) {
    clearSelectedTile();
    return;
  }

  if (clickedElement.classList.contains("initial-value")) return;

  deselectCurrentTile();

  selectedTile =
    clickedElement.tagName === "IMG"
      ? clickedElement.parentElement
      : clickedElement;
  selectedTile.classList.add("selected");
};

/**
 * Clears the currently selected tile.
 */
const clearSelectedTile = () => {
  if (selectedTile) {
    const tileImg = selectedTile.querySelector("img");
    tileImg.src = "";
    tileImg.alt = "";
    selectedTile.classList.remove("selected");
    selectedTile = null;
  }
};

/**
 * Deselects the currently selected tile.
 */
const deselectCurrentTile = () => {
  if (selectedTile) {
    selectedTile.classList.remove("selected");
    selectedTile = null;
  }
};

/**
 * Handles symbol button clicks to insert numbers into the selected tile.
 * @param {Event} event - The click event.
 */
const handleButtonClick = (event) => {
  const button = event.target;
  const value = button.alt;

  if (!value || !selectedTile) return;

  const tileImg = selectedTile.querySelector("img");
  if (tileImg) {
    tileImg.src = `./src/img/${value}.png`;
    tileImg.alt = `${value}`;
    selectedTile.classList.remove("wrong");
  }
};

/**
 * Checks the user's solution against the solved puzzle.
 */
const checkUserSolution = () => {
  let wrongTiles = 0;
  let blankTiles = 0;

  Array.from(elements.grid.children).forEach((tile, index) => {
    const userValue = tile.querySelector("img").alt;
    const correctValue = solvedPuzzle[index];

    if (!userValue) {
      blankTiles++;
      return;
    }

    if (userValue !== `${correctValue}`) {
      tile.classList.add("wrong");
      wrongTiles++;
    }
  });

  if (blankTiles === GRID_SIZE) {
    alert("The puzzle is empty! Try pressing the NEW PUZZLE button.");
    return;
  }

  displayResult(wrongTiles, blankTiles);
  closeMenu(elements.menuContainer, elements.menuButtonClose);
  startTimer();
};

/**
 * Displays the result based on the number of wrong and blank tiles.
 * @param {number} wrongTiles - The count of wrong tiles.
 * @param {number} blankTiles - The count of blank tiles.
 */
const displayResult = (wrongTiles, blankTiles) => {
  if (wrongTiles > 0 && blankTiles > 0) {
    alert(
      `Wrong! You made ${wrongTiles} mistakes and are missing ${blankTiles} tiles!`
    );
  } else if (blankTiles > 0) {
    alert(`You are missing ${blankTiles} tiles!`);
  } else if (wrongTiles > 0) {
    alert(`Wrong! You made ${wrongTiles} mistakes.`);
  } else {
    openWinMenu();
    elements.timerResult.innerText = timer;
  }
};
/**
 * Solves the Sudoku by filling in all correct values.
 */
const solveSudoku = () => {
  Array.from(elements.grid.children).forEach((tile, index) => {
    tile.classList.remove("initial-value", "wrong");
    const tileImg = tile.querySelector("img");
    const value = solvedPuzzle[index];

    if (value > 0) {
      tileImg.src = `./src/img/${value}.png`;
      tileImg.alt = `${value}`;
    }
  });
};

/**
 * Handles keyboard shortcuts.
 * @param {KeyboardEvent} event - The keypress event.
 */
const handleKeyPress = (event) => {
  if (event.key === "q") {
    solveSudoku();
  }
};
// ==================== Event Listeners ====================
elements.getButton.addEventListener("click", async () => {
  elements.loading.style.display = "block";
  elements.menuButtonClose.style.display = "block";

  await getPuzzle();

  elements.loading.style.display = "none";
  puzzle = concatenatePuzzleData(fetchedPuzzle);
  solvedPuzzle = concatenatePuzzleData(fetchedSolvedPuzzle);

  closeMenu(elements.menuContainer, elements.menuButtonHamb);
  initializeGrid();
  resetTimer();
  startTimer();
});

elements.repeatButton.addEventListener("click", () => {
  openMenu(elements.menuContainer, elements.menuButtonHamb);
  closeWinMenu();
});

elements.menuButtonHamb.addEventListener("click", () => {
  openMenu(elements.menuContainer, elements.menuButtonHamb);
  stopTimer();
});

elements.menuButtonClose.addEventListener("click", () => {
  closeMenu(elements.menuContainer, elements.menuButtonClose);
  startTimer();
});

elements.checkButton.addEventListener("click", checkUserSolution);

elements.grid.addEventListener("click", handleGridClick);
elements.buttonsGrid.addEventListener("click", handleButtonClick);
document.addEventListener("keypress", handleKeyPress);

// ==================== Initialization ====================
createGrid();
initializeGrid();
