function setDefaultBoard(board) {
    for (let i = 0; i < board.rows.length; i++) {
        for (let j = 0; j < board.rows[i].cells.length; j++) {
            board.rows[i].cells[j].textContent = nbsp;
        }
    }
}

function updatePlayer() {
    if (cur_player === 'X') {
        cur_player = 'O'
    } else {
        cur_player = 'X'
    };
    document.getElementById('game_status_display').innerHTML = "<h2> Current player " + cur_player + "</h2>"
}

function boardToArray(board) {
    // Converts the board which is a HTML table to a JavaScript array
    let boardArray = [];
    for (let i = 0; i < board.rows.length; i++) {
        let row = [];
        for (let j = 0; j < board.rows[i].cells.length; j++) {
            row.push(board.rows[i].cells[j].textContent)
        }
        boardArray.push(row);
    }
    return boardArray
}

function arrayToBoard(board, array) {
    // Writes a JavaScript array which contains a tic-tac-toe board position to a HTML board for display

    for (let i = 0; i < board.rows.length; i ++) {
        for (let j = 0; j < board.rows[i].cells.length; j++) {
            board.rows[i].cells[j].textContent = array[i][j];
        }
    }
}

function isFull(board) {
    let boardArray = boardToArray(board);
    return !boardArray.flat().includes(nbsp);
}

function getWinner(board) {
    function returnWinner(charArray) {
        let unique = [...new Set(charArray)]
        return (unique.length === 1 && unique[0] != nbsp ? charArray[0] : null);
    };

    boardArray = boardToArray(board);
    let possibleWinners = [];

    // Check horizontally
    for (let i = 0; i < boardArray.length; i++) {
        possibleWinners.push(boardArray[i]);
    }

    // Check vertically
    for (let i = 0; i < boardArray.length; i++) {
        let column = []
        for (let k = 0; k < boardArray.length; k++) {
            column.push(boardArray[k][i])
        }
        possibleWinners.push(column)
    }

    // Check main diagonal
    let diag = [];
    for (let i = 0; i < boardArray.length; i++) {
        diag.push(boardArray[i][i]);
    }
    possibleWinners.push(diag)

    // Check other diagonal
    diag = [];
    for (let i = 0; i < boardArray.length; i++) {
        diag.push(boardArray[i][boardArray.length - i - 1]);
    }
    possibleWinners.push(diag)

    for (let possibleWinner of possibleWinners) {
        const winner = returnWinner(possibleWinner);
        if (winner) {
            return winner;
        }
    }

    return null;
}