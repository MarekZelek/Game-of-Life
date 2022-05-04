const numberOfRows = 10;
const numberOfColumns = 20;
//TODO: take parameters from input
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

//TODO: Make gameBoard responsive
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
        // console.table(board);
        // console.log(element)
    });
});

//TODO: take arguments from select and pass to setSpeed function
async function setSpeed(speed) {
    await timeout(speed);
}


//-------Buttons-------------
//TODO: fix start stop game
//-------start stop game button-------------
let play = false;
const startStopButton = document.querySelector('#start-stop-button');

startStopButton.addEventListener('click', () => {
    const initialText = 'Start';
    if (startStopButton.textContent.toLowerCase().includes(initialText.toLowerCase())) {
      for(let i=0; i < 1000; i++) {
          setTimeout(() => { startGame(); }, 300);
          // console.log(i)
      }
        startStopButton.textContent = 'Stop';
    } else {
        startStopButton.textContent = initialText;
    }

})


function startGame() {
    gameLogic();
}

function stopGame() {
}

//-------clear board button----------
//TODO: debug clear button
const clearButton = document.querySelector('#clear-button');

clearButton.addEventListener('click', () => {
    clearBoard();
})

clearBoard = () => {
    selectCells.forEach(element => {
        if (element.classList.contains('alive')) {
            element.classList.remove('alive')
        }
    });
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            board[i][j] = 0;
            newBoard[i][j] = 0;
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

async function gameLogic() {
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


    updateBoard();
    updateGameBoard();
    await timeout(300);
}

async function updateBoard() {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            board[i][j] = newBoard[i][j];
            newBoard[i][j] = 0;
        }
    }
    await timeout(300);
}

async function updateGameBoard() {
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
    await timeout(300);

}


const timeout = async time => await new Promise(resolve => setTimeout(() => resolve(), time));