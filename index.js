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
        grid.appendChild(newTile);
    }
}

createGrid();

function conCatData() {
    puzzle = puzzle[0].concat(puzzle[1], puzzle[2], puzzle[3], puzzle[4], puzzle[5], puzzle[6], puzzle[7], puzzle[8])
}

function writeSudoku() {

    for (let i = 0; i <= 80; i++) {

        let tile = grid.children[i];

        tile.innerText = puzzle[i];

        if (tile.innerText == 0) tile.innerText = "";

        //Add class to the values given
        if(tile.innerText != "") tile.classList.add("initial-value");
    }

}


getButton.addEventListener("click", async () => {
    await getPuzzle();
    conCatData();
    writeSudoku();
})


//Target selected tile
let selectedTile;

grid.addEventListener("click", (event)=>{
    if(event.target.classList[0] === "initial-value") return;
    if(selectedTile) selectedTile.classList.remove("selected")
    selectedTile = event.target;
    selectedTile.classList.add("selected")
});

//Target selected button to insert
buttonsGrid.addEventListener("click", (event)=>{
    const buttonValue = event.target.innerText;
    if(selectedTile) selectedTile.innerText = buttonValue;
});