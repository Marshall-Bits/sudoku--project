const getButton = document.getElementById('get-btn')


let puzzle;
let solvedPuzzle;

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': 'sudoku-board.p.rapidapi.com',
        'X-RapidAPI-Key': '5ab38a79c4mshbc78b0c078b897ap1a1767jsn0586e66df467'
    }
};


async function getPuzzle(){
    const response = await fetch('https://sudoku-board.p.rapidapi.com/new-board?diff=2&stype=list&solu=true', options);
    const data = await response.json();
    puzzle = data["response"]["unsolved-sudoku"];
    console.log(puzzle);
}

// function getPuzzle() {
//     fetch('https://sudoku-board.p.rapidapi.com/new-board?diff=2&stype=list&solu=true', options)
//         .then(response => response.json())
//         .then(data => puzzle = data["response"]["unsolved-sudoku"])
//         .then(console.log(puzzle))
//         .catch(err => console.error(err));

// }

function conCatData(){
    puzzle = puzzle[0].concat(puzzle[1],puzzle[2],puzzle[3],puzzle[4],puzzle[5],puzzle[6],puzzle[7],puzzle[8])
}

function writeSudoku() {
    
    const grid = document.getElementById("grid");

    for(let i=0; i<=81; i++){
        
        let tile = grid.children[i];

        tile.innerText = puzzle[i];

        if(tile.innerText == 0) tile.innerText= "";
    }

}


getButton.addEventListener("click", async () => {
    await getPuzzle();
    conCatData();
    writeSudoku();
})
