const getButton = document.getElementById('get-btn')
const grid = document.getElementById("grid");
const buttonsGrid = document.getElementById("buttons-grid");

let puzzle;
let solvedPuzzle;

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': 'sudoku-board.p.rapidapi.com',
        'X-RapidAPI-Key': '5ab38a79c4mshbc78b0c078b897ap1a1767jsn0586e66df467'
    }
};


async function getPuzzle() {
    const response = await fetch('https://sudoku-board.p.rapidapi.com/new-board?diff=2&stype=list&solu=true', options);
    const data = await response.json();
    puzzle = data["response"]["unsolved-sudoku"];
    solvedPuzzle = data["response"]["solution"];
}

// function getPuzzle() {
//     fetch('https://sudoku-board.p.rapidapi.com/new-board?diff=2&stype=list&solu=true', options)
//         .then(response => response.json())
//         .then(data => puzzle = data["response"]["unsolved-sudoku"])
//         .then(console.log(puzzle))
//         .catch(err => console.error(err));

// }


//

function createGrid() {
    for (let i = 0; i <= 80; i++) {
        const newTile = document.createElement("li");
        const newImg = document.createElement("img");
        grid.appendChild(newTile);
        newTile.appendChild(newImg);
    }
}

createGrid();

function conCatData() {
    puzzle = puzzle[0].concat(puzzle[1], puzzle[2], puzzle[3], puzzle[4], puzzle[5], puzzle[6], puzzle[7], puzzle[8])
}

function writeSudoku() {

    for (let i = 0; i <= 80; i++) {

        const tileImg = grid.children[i].children[0];

        tileImg.src = "";
        tileImg.alt = "";

        if (puzzle[i] > 0) {
            tileImg.src = `./src/img/${puzzle[i]}.png`;
            tileImg.alt = `${puzzle[i]}`;
            tileImg.classList.add("initial-value");
        }

    }

}


getButton.addEventListener("click", async () => {
    await getPuzzle();
    conCatData();
    writeSudoku();
})


//Target selected tile
let selectedTile;

grid.addEventListener("click", (event) => {
    console.log(event.target);
    if (event.target.classList[0] === "initial-value") return;
    if (selectedTile) selectedTile.classList.remove("selected")
    selectedTile = event.target;

    if (event.target.id != "grid") selectedTile.classList.add("selected")
});

//Target selected button to insert
buttonsGrid.addEventListener("click", (event) => {
    const buttonValue = event.target.alt;
    if (buttonValue && selectedTile) {
        selectedTile.children[0].src = `./src/img/${buttonValue}.png`;
        selectedTile.children[0].alt = `${buttonValue}`;
    }
});