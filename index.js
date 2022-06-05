const getButton = document.getElementById('get-btn');
const checkButton = document.getElementById('check-btn');
const grid = document.getElementById("grid");
const buttonsGrid = document.getElementById("buttons-grid");
const menuContainer = document.getElementById("menu-container");
const loading = document.getElementById("loading");
const menuButton = document.getElementById("menu-button");

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


function createGrid() {
    for (let i = 0; i <= 80; i++) {
        const newTile = document.createElement("li");
        const newImg = document.createElement("img");
        grid.appendChild(newTile);
        newTile.appendChild(newImg);
    }
}

createGrid();

function conCatData(data) {
    return data[0].concat(data[1], data[2], data[3], data[4], data[5], data[6], data[7], data[8])
}

function writeSudoku() {

    for (let i = 0; i <= 80; i++) {

        const tileImg = grid.children[i].children[0];
        const tile = grid.children[i];

        tileImg.src = "";
        tileImg.alt = "";

        tile.classList.remove("initial-value");

        if (puzzle[i] > 0) {
            tileImg.src = `./src/img/${puzzle[i]}.png`;
            tileImg.alt = `${puzzle[i]}`;
            tileImg.classList.add("initial-value");
        }
        
        tile.classList.remove("wrong");
    }

}


getButton.addEventListener("click", async () => {
    loading.style.display = 'block';
    await getPuzzle();
    loading.style.display = 'none';
    puzzle = conCatData(puzzle);
    solvedPuzzle = conCatData(solvedPuzzle);
    console.log(solvedPuzzle);
    menuContainer.style.display = 'none';
    writeSudoku();
});

menuButton.addEventListener("click", ()=>{
    if(menuContainer.style.display === 'none'){
        menuContainer.style.display = 'flex';
    }
    else menuContainer.style.display = 'none';
})


//Target selected tile
let selectedTile;

grid.addEventListener("click", (event) => {
    if (event.target.classList[0] === "initial-value") return;
    if (selectedTile) selectedTile.classList.remove("selected")
    selectedTile = event.target;
    selectedTile.classList.remove("wrong")

    if (event.target.id != "grid") selectedTile.classList.add("selected")
});

//Target selected button to insert
buttonsGrid.addEventListener("click", (event) => {
    const buttonValue = event.target.alt;
    if (buttonValue && selectedTile && selectedTile.children[0]) {
        selectedTile.children[0].src = `./src/img/${buttonValue}.png`;
        selectedTile.children[0].alt = `${buttonValue}`;
    }
    else if (buttonValue && selectedTile) {
        selectedTile.src = `./src/img/${buttonValue}.png`;
        selectedTile.alt = `${buttonValue}`;
    }
});

checkButton.addEventListener("click", () => {
    checkUserSolution();
});

function checkUserSolution() {
    let wrongTiles = 0;
    //Make a new array with user answers
    const tiles = [].slice.call(grid.children);
    for (const [i, tile] of tiles.entries()) {
        if (tile.children[0].alt != solvedPuzzle[i]) {
            grid.children[i].classList.add("wrong");
            wrongTiles++;
        }
    }
    if (wrongTiles > 0) alert(`Wrong answer! you made ${wrongTiles} mistakes`);
    menuContainer.style.display = 'none';

}
