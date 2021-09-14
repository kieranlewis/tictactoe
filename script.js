const gameBoard = (() => {
    const getBoard = () => _board;
    const render = () => {
        _boardDiv.textContent = ''; //delete current board

        //loop through board and create div elements with the correct tokens
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                const div = document.createElement('div');
                div.innerHTML = `<span>${_board[i][j]}</span>`;
                div.setAttribute('class', 'grid-item');
                div.setAttribute('data-index', `${i},${j}`);
                div.addEventListener('click', game.checkLegalMove);

                _boardDiv.appendChild(div);
            }
        }
    }
    const addMove = (token, index) => {
        _board[index[0]][index[1]] = token;
        render();
    }
    const clearBoard = () => {
        _board = [['','',''],
                  ['','',''],
                  ['','','']];
    }
    const displayRow = (row) => {   
        for(let i = 0; i < 3; i++) {
            const rowDiv = document.querySelector(`[data-index='${row},${i}']`);
            rowDiv.classList.add('win');
        }
    }
    const displayDiag = (direction) => {
        let indicies;
        if(direction == 'back') {
            indicies = ['0,0', '1,1', '2,2'];
        } else {
            indicies = ['2,0', '1,1', '0,2'];
        }
        indicies.forEach(index => {
            const div = document.querySelector(`[data-index='${index.split(",")[0]},${index.split(",")[1]}']`);
            div.classList.add('win');
        })
    }
    const displayCol = (col) => {   
        for(let i = 0; i < 3; i++) {
            const colDiv = document.querySelector(`[data-index='${i},${col}']`);
            colDiv.classList.add('win');
        }
    }

    let _board = [['','',''],
                  ['','',''],
                  ['','','']]; //empty board
    const _boardDiv = document.querySelector('.tictactoe-board');

    return {
        render,
        getBoard,
        addMove,
        clearBoard,
        displayRow,
        displayCol,
        displayDiag
    };
})();

const Player = (name, token) => {
    const getName = () => _name;
    const getToken = () => _token;
    const setName = (name) => _name = name;

    let _name = name;
    const _token = name;

    return {
        getName,
        getToken,
        setName
    };
};

const game = (() => {
    const init = () => {
        player1.setName(player1Name.value || 'Player 1');
        player2.setName(player2Name.value || 'Player 2');
        player1Name.readOnly = true;
        player2Name.readOnly = true;

        gameBoard.clearBoard();
        gameBoard.render();
        player1Turn = true;
        congratulations.textContent = '';
    };
    const checkLegalMove = (e) => {
        const index = e.target.getAttribute('data-index').split(',');
        const currentToken = gameBoard.getBoard()[index[0]][index[1]];

        if(currentToken === '') {
            if(player1Turn) gameBoard.addMove('X', index);
            else gameBoard.addMove('O', index);

            const check = _checkWin();
            if(check) {
                const message = document.createElement('p');

                if(_checkWin() == 'tie') {
                    message.textContent = "TIE GAME!"
                } else if(_checkWin() == 'X') {
                    message.textContent = player1.getName() + ' WINS!';
                } else if(_checkWin() == 'O') {
                    message.textContent = player2.getName() + ' WINS!';
                }

                player1Name.readOnly = false;
                player2Name.readOnly = false;
                congratulations.appendChild(message);
                const divs = document.querySelectorAll('.grid-item');
                [...divs].forEach(div => div.removeEventListener('click', checkLegalMove));
            }

            player1Turn = !player1Turn;
        }
    };

    const _checkWin = () => {
        const currentBoard = gameBoard.getBoard();
        const currentToken = player1Turn ? 'X' : 'O';

        //check across
        for (let row = 0; row < 3; row ++) {
            if(currentBoard[row][0] == currentToken &&
                currentBoard[row][1] == currentToken &&
                currentBoard[row][2] == currentToken) {
                    gameBoard.displayRow(row);
                    return currentToken;
            }
        }

        //check down
        for(let col = 0; col < 3; col++) {
            if(currentBoard[0][col] == currentToken &&
                currentBoard[1][col] == currentToken &&
                currentBoard[2][col] == currentToken) {
                    gameBoard.displayCol(col);
                    return currentToken;
            }
        }

        //check left to right diagonal
        if(currentBoard[0][0] == currentToken &&
            currentBoard[1][1] == currentToken &&
            currentBoard[2][2] == currentToken) {
                gameBoard.displayDiag('back');
                return currentToken;
        }

        //check right to left diagonal
        if(currentBoard[2][0] == currentToken &&
            currentBoard[1][1] == currentToken &&
            currentBoard[0][2] == currentToken) {
                gameBoard.displayDiag('forward');
                return currentToken;
        }

        //check tie
        if(currentBoard[0].indexOf("") == -1 && 
            currentBoard[1].indexOf("") == -1 && 
            currentBoard[2].indexOf("") == -1) {
                return 'tie';
        }
    }  

    const player1 = Player('p1', 'X');
    const player2 = Player('p2', 'O');
    let player1Turn = true;

    const player1Name = document.querySelector('[name="player1Name"]');
    const player2Name = document.querySelector('[name="player2Name"]');

    const startButton = document.querySelector('.btn-start');
    startButton.addEventListener('click', init);

    const congratulations = document.querySelector('.congratulations');

    return {
        init,
        checkLegalMove
    };
})();
