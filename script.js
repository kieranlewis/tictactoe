const gameBoard = (() => {
    const getBoard = () => _board;
    const _board = [['','',''],['','',''],['','','']]; //empty board

    return {
        getBoard
    };
})();

const game = (() => {
    const init = () => {
        console.log('initialising game');
        game.render();
        const player1 = Player('p1', 'X');
        const player2 = Player('p2', 'O');
        _cacheDom();
        _bindEvents();
    };
    const render = () => {

    };

    const _cacheDom = () => {
        const game = document.querySelector('.tictactoe-game');
        const board = game.querySelector('.tictactoe-board');

    };
    const _bindEvents = () => {
        console.log('binding events');
    };

    return {
        init,
        render
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
