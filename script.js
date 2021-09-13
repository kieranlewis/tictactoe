const gameBoard = (() => {
    const _board = [['','',''],
                    ['','',''],
                    ['','','']]; //empty board
    const _boardDiv = document.querySelector('.tictactoe-board');

    const getBoard = () => _board;
    const render = () => {
        _boardDiv.textContent = ''; //delete current board

        //loop through board and create div elements with the correct tokens
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                const div = document.createElement('div');
                div.textContent = _board[i][j];
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

    return {
        render,
        getBoard,
        addMove
    };
})();

const Player = (name, token) => {
    const getName = () => name;
    const getToken = () => token;

    return {
        getName,
        getToken
    };
};

const game = (() => {
    const player1 = Player('p1', 'X');
    const player2 = Player('p2', 'O');
    let player1Turn = true;

    const init = () => {
        gameBoard.render();
    };
    const checkLegalMove = (e) => {
        const index = e.target.getAttribute('data-index').split(',');
        const currentToken = gameBoard.getBoard()[index[0]][index[1]];

        if(currentToken === '') {
            if(player1Turn) gameBoard.addMove('X', index);
            else gameBoard.addMove('O', index);
            checkWin();
            player1Turn = !player1Turn;
        }
    };
    const checkWin = () => {
        const currentBoard = gameBoard.getBoard();
        const currentToken = player1Turn ? 'X' : 'O';

        //check across
        for (let row = 0; row < 3; row ++) {
            if(currentBoard[row][0] == currentToken &&
                currentBoard[row][1] == currentToken &&
                currentBoard[row][2] == currentToken) {
                console.log(`${currentToken} Wins!!!`);
            }
        }

        //check down
        for(let col = 0; col < 3; col++) {
            if(currentBoard[0][col] == currentToken &&
                currentBoard[1][col] == currentToken &&
                currentBoard[2][col] == currentToken) {
                console.log(`${currentToken} Wins!!!`);
            }
        }

        //check diagonals

        //check tie
    }  

    return {
        init,
        checkLegalMove, 
        checkWin
    };
})();

game.init();
