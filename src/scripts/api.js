const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': 'sudoku-board.p.rapidapi.com',
        'X-RapidAPI-Key': '5ab38a79c4mshbc78b0c078b897ap1a1767jsn0586e66df467'
    }
};

let fetchedPuzzle;
let fetchedSolvedPuzzle;

export default async function getPuzzle() {
    const response = await fetch('https://sudoku-board.p.rapidapi.com/new-board?diff=1&stype=list&solu=true', options);
    const data = await response.json();
    fetchedPuzzle = data["response"]["unsolved-sudoku"];
    fetchedSolvedPuzzle = data["response"]["solution"];
}

export {fetchedPuzzle, fetchedSolvedPuzzle, getPuzzle}