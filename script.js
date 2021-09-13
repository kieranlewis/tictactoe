const gameBoard = (() => {
    const _board = [['','','X'],['','',''],['','','']]; //empty board
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
                div.addEventListener('click', _addMove);

                _boardDiv.appendChild(div);
            }
        }
    }

    const _addMove = (e) => {
        let index = e.target.getAttribute('data-index').split(',');
        const position = _board[index[0]][index[1]];
        _board[index[0]][index[1]] = 'X'
        console.log(_board);
        render();
    }

    return {
        render,
        getBoard
    };
})();

const game = (() => {
    const init = () => {
        console.log('initialising game');
        gameBoard.render();
        const player1 = Player('p1', 'X');
        const player2 = Player('p2', 'O');
    };

    return {
        init,
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

game.init();
