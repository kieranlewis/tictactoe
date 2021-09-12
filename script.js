const gameBoard = (() => {
    const getBoard = () => _board;
    const _board = [['X','O','X'],['O','X','O'],['X','O','X']]; //empty board

    const render = () => {
        const boardDiv = document.querySelector('.tictactoe-board');

        console.log('rendering board');
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                const div = document.createElement('div');
                div.textContent = _board[i][j];
                boardDiv.appendChild(div);
                //console.log(_board[i][j]);
            }
        }
    }

    return {
        render,
        getBoard
    };
})();

const game = (() => {
    const init = () => {
        console.log('initialising game');
        const board = gameBoard.getBoard();
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
