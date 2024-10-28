function createEmptyGrid() {
  const grid = [];
  for (let row = 0; row < 9; row++) {
    const currentRow = [];
    for (let col = 0; col < 9; col++) {
      currentRow.push(0);
    }
    grid.push(currentRow);
  }
  return grid;
}

// Function to check if num can be placed at grid[row][col]
function isSafe(grid, row, col, num) {
  // Check if num is not in the current row or column
  for (let x = 0; x < 9; x++) {
    if (grid[row][x] === num || grid[x][col] === num) {
      return false;
    }
  }

  // Check if num is not in the current 3x3 subgrid
  const startRow = row - (row % 3);
  const startCol = col - (col % 3);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[startRow + i][startCol + j] === num) {
        return false;
      }
    }
  }

  return true;
}

// Function to shuffle an array (Fisher-Yates shuffle)
// https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// fill the grid using backtracking
/*
Backtracking is a general algorithm for finding all (or some) solutions to some computational problems.
*/
function fillGrid(grid) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === 0) {
        // Try numbers 1 through 9 in random order
        const numbers = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        for (let num of numbers) {
          if (isSafe(grid, row, col, num)) {
            grid[row][col] = num;
            if (fillGrid(grid)) {
              return true;
            }
            grid[row][col] = 0; // Reset on backtrack
          }
        }
        return false; // Trigger backtracking
      }
    }
  }
  return true; // Grid filled successfully
}

function generateSolution() {
  const grid = createEmptyGrid();
  fillGrid(grid);
  return grid;
}

function deepCopyGrid(grid) {
  return grid.map((row) => row.slice());
}

function removeCells(grid, cellsToRemove) {
  let attempts = cellsToRemove;
  while (attempts > 0) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    if (grid[row][col] !== 0) {
      grid[row][col] = 0;
      attempts--;
    }
  }
  return grid;
}

// Function to generate both solution and puzzle
function generateSudoku(puzzleCellsToRemove = 40) {
  const solution = generateSolution();

  // Create a deep copy of the solution to generate the puzzle
  const puzzle = deepCopyGrid(solution);
  removeCells(puzzle, puzzleCellsToRemove);

  return { solution, puzzle };
}

// Example Usage:
/* 
const { solution, puzzle } = generateSudoku(40);

console.log("Sudoku Solution:");
solution.forEach((row) => console.log(row.join(" ")));

console.log("\nSudoku Puzzle:");
puzzle.forEach((row) => console.log(row.join(" ")));
*/
export { generateSudoku };
