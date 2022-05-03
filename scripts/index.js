const numberOfRows = 10;
const numberOfColumns = 20;

function generateGameBoard(lines, columns) {
    for (let col = 0; col < columns; col++) {
        const createCol = document.createElement("div");
        document.getElementById("board").appendChild(createCol);
        createCol.className = 'column';

        for (let row = 0; row < lines; row++) {
            const createRow = document.createElement("div");
            createRow.className = 'row dead';
            createRow.setAttribute('id', col + '-' + row)
            createCol.appendChild(createRow);
        }
    }
}

let board = new Array(numberOfRows).fill(0).map(() => new Array(numberOfColumns).fill(0));
let newBoard = new Array(numberOfRows).fill(0).map(() => new Array(numberOfColumns).fill(0));

generateGameBoard(numberOfRows, numberOfColumns);

//---------toggling cells on game Board---------------
const selectCells = document.querySelectorAll(".row");

selectCells.forEach(element => {
    element.addEventListener('click', () => {
        let loc = element.id.split("-");
        let row = Number(loc[1]);
        let col = Number(loc[0]);
        const result = element.classList.toggle("alive")

        if (result) {
            board[row][col] = 1;
        } else {
            board[row][col] = 0;
        }
        console.table(board);
        console.log(element)
    });
});


async function setSpeed(speed) {
    await timeout(speed);
}


//-------Buttons-------------

//-------start stop game button-------------


const startStopButton = document.querySelector('#start-stop-button');
startStopButton.addEventListener('click', () => {
    const initialText = 'Start';
    if (startStopButton.textContent.toLowerCase().includes(initialText.toLowerCase())) {
        startStopButton.textContent = 'Stop';
    } else {
        startStopButton.textContent = initialText;
    }
})

// while(playgame===true){
//     startGame();
// }
// async function startGame() {
//     createLogic();
//     updateBoard();
//     updateGameBoard();
//
//     await timeout(300);
// }

function stopGame() {
}

//-------clear board button----------
//TODO: fix clear button - add
const clearButton = document.querySelector('#clear-button');
clearButton.addEventListener('click', () => {
    clearBoard();
})

clearBoard = () => {
    selectCells.forEach(element => {
        if (element.classList.contains("alive")) {
            element.classList.remove('alive')
        }
    });
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            board[i][j] = 0;
        }
    }
}

//----------game logic----------------
    function findNeighbours(row, col) {
        let count = 0;
        let rowNumber = Number(row);
        let columnNumber = Number(col);

        if (rowNumber - 1 >= 0) {
            if (board[rowNumber - 1][columnNumber] === 1)
                count++;
        }
        if (rowNumber - 1 >= 0 && columnNumber - 1 >= 0) {
            if (board[rowNumber - 1][columnNumber - 1] === 1)
                count++;
        }
        if (rowNumber - 1 >= 0 && columnNumber + 1 < numberOfColumns) {
            if (board[rowNumber - 1][columnNumber + 1] === 1)
                count++;
        }
        if (columnNumber - 1 >= 0) {
            if (board[rowNumber][columnNumber - 1] === 1)
                count++;
        }
        if (columnNumber + 1 < numberOfColumns) {
            if (board[rowNumber][columnNumber + 1] === 1)
                count++;
        }
        if (rowNumber + 1 < numberOfRows && columnNumber - 1 >= 0) {
            if (board[rowNumber + 1][columnNumber - 1] === 1)
                count++;
        }
        if (rowNumber + 1 < numberOfRows && columnNumber + 1 < numberOfColumns) {
            if (board[rowNumber + 1][columnNumber + 1] === 1)
                count++;
        }
        if (rowNumber + 1 < numberOfRows) {
            if (board[rowNumber + 1][columnNumber] === 1)
                count++;
        }
        return count;
    }


    function gameLogic() {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                let neighbors = findNeighbours(i, j);
                if (board[i][j] === 1) {
                    if (neighbors < 2) {
                        newBoard[i][j] = 0;
                    } else if (neighbors === 2 || neighbors === 3) {
                        newBoard[i][j] = 1;
                    } else if (neighbors > 3) {
                        newBoard[i][j] = 0;
                    }
                } else if (board[i][j] === 0) {
                    if (neighbors === 3) {
                        newBoard[i][j] = 1;
                    }
                }
                //add here updateBoard?
            }
        }
    }

    function updateBoard() {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                board[i][j] = newBoard[i][j];
                newBoard[i][j] = 0;
            }
        }
    }

    function updateGameBoard() {
        let cell = '';
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                cell = document.getElementById(j + '-' + i);
                if (board[i][j] === 0) {
                    cell.setAttribute('class', 'row dead');
                } else {
                    cell.setAttribute('class', 'row alive');
                }
            }
        }
    }


    const timeout = async time => await new Promise(resolve => setTimeout(() => resolve(), time));