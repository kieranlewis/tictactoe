const gameBoard = (() => {
    const _board = [['','',''],['','',''],['','','']]; //empty board
    const _boardDiv = document.querySelector('.tictactoe-board');

    const getBoard = () => _board;
    const render = () => {
        console.log('rendering board');
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
            player1Turn = !player1Turn;
        }
    }    

    return {
        init,
        checkLegalMove
    };
})();

game.init();
