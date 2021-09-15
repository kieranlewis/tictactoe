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
                _setBorder(div, i, j);

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
    const _setBorder = (div, row, col) => {
        if(row == 1 && col == 1) div.style.border = '4px solid white';
        else if(row == 0 && col == 1 || row == 2 && col == 1) {
            div.style.borderLeft = '4px solid white';
            div.style.borderRight = '4px solid white';
        }
        else if(row == 1 && col == 0 || row == 1 && col == 2) {
            div.style.borderTop = '4px solid white';
            div.style.borderBottom = '4px solid white';
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

const Player = (name, token, wins) => {
    const getName = () => _name;
    const getToken = () => _token;
    const getWins = () => _wins;
    const setName = (name) => _name = name;
    const incrementWin = () => _wins++;

    let _name = name;
    const _token = name;
    let _wins = wins;

    return {
        getName,
        getToken,
        getWins,
        setName,
        incrementWin
    };
};

const game = (() => {
    const init = () => {
        player1.setName(player1Name.value || 'Player 1');
        player2.setName(player2Name.value || 'Player 2');
        player1Name.readOnly = true;
        player2Name.readOnly = true;
        player1Score.textContent = player1.getWins();
        player2Score.textContent = player2.getWins();
        ties.textContent = tieScore;

        gameBoard.clearBoard();
        gameBoard.render();
        player1Turn = true;
    };
    const checkLegalMove = (e) => {
        const index = e.target.getAttribute('data-index').split(',');
        const currentToken = gameBoard.getBoard()[index[0]][index[1]];

        if(currentToken === '') {
            if(player1Turn) gameBoard.addMove('X', index);
            else gameBoard.addMove('O', index);

            const check = _checkWin();
            if(check) {
                if(_checkWin() == 'tie') {
                    tieScore++;
                } 
                else if(_checkWin() == 'X') player1.incrementWin();
                else if(_checkWin() == 'O') player2.incrementWin();
                player1Score.textContent = player1.getWins();
                player2Score.textContent = player2.getWins();
                ties.textContent = tieScore;

                player1Name.readOnly = false;
                player2Name.readOnly = false;
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

    const player1 = Player('p1', 'X', 0);
    const player2 = Player('p2', 'O', 0);
    let player1Turn = true;
    let tieScore = 0;

    const player1Name = document.querySelector('[name="player1Name"]');
    const player2Name = document.querySelector('[name="player2Name"]');

    const startButton = document.querySelector('.btn-start');
    startButton.addEventListener('click', init);

    const player1Score = document.querySelector('#player1-score');
    const player2Score = document.querySelector('#player2-score');
    const ties = document.querySelector('#number-of-ties');

    return {
        init,
        checkLegalMove
    };
})();

game.init();