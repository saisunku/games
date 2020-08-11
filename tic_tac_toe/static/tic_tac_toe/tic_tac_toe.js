function setDefaultBoard(board) {
    // Reset the board
    for (let i = 0; i < board.rows.length; i++) {
        for (let j = 0; j < board.rows[i].cells.length; j++) {
            board.rows[i].cells[j].innerHTML = "<div class='content'>" + nbsp + "</div>";
        }
    }
}

function updatePlayer() {
    if (cur_player === 'X') {
        cur_player = 'O'
    } else {
        cur_player = 'X'
    };
    document.getElementById('game_status_display').textContent = "Current player " + cur_player;
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

    for (let i = 0; i < board.rows.length; i++) {
        for (let j = 0; j < board.rows[i].cells.length; j++) {
            board.rows[i].cells[j].innerHTML = "<div class='content'>" + array[i][j] + "</div>";;
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

function checkDrawOrWinner(board) {
    const winner = getWinner(board);
    const draw = isFull(board);

    if (winner) {
        // document.getElementById('from_server').textContent += cur_player + ' won!\n';
        document.getElementById('game_status_display').textContent = winner + " won! Press the reset button to play again."
        drawTree(null, svg);
        return true;
    } else if (draw) {
        // document.getElementById('from_server').textContent += 'Draw!\n';
        document.getElementById('game_status_display').textContent = "Draw! Press the reset button to play again."
        drawTree(null, svg);
        return true;
    }
    return false;
}

function getAIMove(ai, cur_board) {
    // Get the next move and the game tree from the server
    gameSocket.send(JSON.stringify({
        'cur_player': cur_player,
        'ai': ai,
        'cur_board': boardToArray(main_board),
        'tree_depth': document.getElementById('tree_depth_dropdown').value,
    }))
}
