// declared up here to to js hoisting
import Queen from './queen.js';
import Position from './position.js';
var QUEEN_COUNT = 4, board, queens = new Array(4);


if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
} else {
    setup();
}

async function setup() {
    generateBoard();
    board = new Array(QUEEN_COUNT);
    for(let i = 0; i < QUEEN_COUNT; i++) {
        board[i] = new Array(QUEEN_COUNT).fill('0');
    }
    let solved = await solveQueens(QUEEN_COUNT, 0, board);
    situation.innerText = solved ? 'Solved' : 'Unsolved';
}

/**
 * @method generateBoard
 * @description Creates the queen board
 */
function generateBoard() {
    let boardContainer = document.querySelector('#board');
    for(let i = 0; i < QUEEN_COUNT; i++) {
        let row = document.createElement('div');
        row.className = 'row';
        for(let j = 0; j < QUEEN_COUNT; j++) {
            let div = document.createElement('div');
            div.className = 'cell open';
            div.dataset.rowId = i;
            div.dataset.colId = j;
            row.append(div);
        }
        boardContainer.append(row)
    }
}

/** 
 * @method solveQueens
 * @param {Number} count
 * @param {Number} row 
 * @description Solves the eight queens problem */
async function solveQueens(count, row, board) {
    if(count === row) return true;
    for(let col = 0; col < board[row].length; col++) {
        let safe = true;
        if(!isSafe(board, row, col)) safe = false;
        if(safe) {
            await setKillZones(row, col, board);
            if(await solveQueens(count, row + 1, board)) return true;
            await unKill(row, board);
        }
    }
    return false;
}

/** 
 * @method isSafe
 * x represents killzone 
 * 1 represents queen placement
 * 0 represents safe spot 
 * @return true if safe, false otherwise */ 
function isSafe(board, row, col) {
    return board[row][col] === '0';
}

/** 
 * @setKillZones
 * @param {Number} row
 * @param {Number} col
 * @param {Character[][]} board
 * @param {Queens[]} queens The queen collection that we are handling
 */
async function setKillZones(row, col, board) {
    situation.innerText = `Setting deadly zones at board[${row}][${col}]`;
    let killCollection = [];
    document.querySelector(`[data-row-id='${row}'][data-col-id='${col}']`).className = 'cell closed';
    queens[row] = new Queen(new Position(row, col), killCollection);
    board[row][col] = '1';

    // set row
    for(let i = 0; i < board[row].length; i++) {
        let deadAlready = document.querySelector(`[data-row-id='${row}'][data-col-id='${i}']`).className.includes('deadly')
        if(i !== col && !deadAlready) {
            killCollection.push(new Position(row, i));
            document.querySelector(`[data-row-id='${row}'][data-col-id='${i}']`).className = 'cell deadly';
            board[row][i] = 'x';
        }
        await sleep(2);

    }

    // set col
    for(let i = 0; i < board.length; i++) {
        let deadAlready = document.querySelector(`[data-row-id='${i}'][data-col-id='${col}']`).className.includes('deadly')
        if(i !== row && !deadAlready) {
            document.querySelector(`[data-row-id='${i}'][data-col-id='${col}']`).className = 'cell deadly';
            killCollection.push(new Position(i, col));
            board[i][col] = 'x';
        }
        await sleep(2);

    }

    // set bl --> tr
    let i = row-1, j = col+1;
    while(i >= 0 && j < board[row].length) {
        let deadAlready = document.querySelector(`[data-row-id='${i}'][data-col-id='${j}']`).className.includes('deadly')
        if(i !== row && j !== col && !deadAlready) {
            document.querySelector(`[data-row-id='${i}'][data-col-id='${j}']`).className = 'cell deadly';
            killCollection.push(new Position(i, j));
            board[i][j] = 'x';
        }
        i--;
        j++;
        await sleep(2);
    }

    i = row+1, j = col-1;
    while(i < board.length && j >=0 ) {
        let deadAlready = document.querySelector(`[data-row-id='${i}'][data-col-id='${j}']`).className.includes('deadly')
        if(i !== row && j !== col && !deadAlready) {
            document.querySelector(`[data-row-id='${i}'][data-col-id='${j}']`).className = 'cell deadly';
            killCollection.push(new Position(i, j));
            board[i][j] = 'x';
        }
        i++;
        j--;
        await sleep(2);
    }

    // set tl --> br
    i = row-1, j = col-1;
    while(i >= 0 && j >=0) {
        let deadAlready = document.querySelector(`[data-row-id='${i}'][data-col-id='${j}']`).className.includes('deadly')
        if(i !== row && j !== col && !deadAlready) {
            document.querySelector(`[data-row-id='${i}'][data-col-id='${j}']`).className = 'cell deadly';
            killCollection.push(new Position(i, j));
            board[i][j] = 'x';
        }
        i--;
        j--;
        await sleep(2);
    }

    i = row+1, j = col+1;
    while(i < board.length && j < board[row].length) {
        let deadAlready = document.querySelector(`[data-row-id='${i}'][data-col-id='${j}']`).className.includes('deadly')
        if(i !== row && j !== col && !deadAlready) {
            document.querySelector(`[data-row-id='${i}'][data-col-id='${j}']`).className = 'cell deadly';
            killCollection.push(new Position(i, j));
            board[i][j] = 'x';
        }
        i++;
        j++;
        await sleep(2);
    }
}

/**
 * 
 * @param {Number} queen 
 * @param {Character[][]} board 
 */
async function unKill(i, board) {
    let row = queens[i].position.row, col = queens[i].position.col;
    situation.innerText = `Undoing deadly zones at board[${row}][${col}]`;
    for(let kill of queens[i].killZones) {
        document.querySelector(`[data-row-id='${kill.row}'][data-col-id='${kill.col}']`).className = 'cell open';
        board[kill.row][kill.col] = '0';
        await sleep(2);
    }
    await sleep(2);

    document.querySelector(`[data-row-id='${row}'][data-col-id='${col}']`).className = 'cell open';
    board[row][col] = '0';
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}