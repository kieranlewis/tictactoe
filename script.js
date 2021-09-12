const gameBoard = (() => {
    const board = [['','',''],['','',''],['','','']]; //empty board
    const render = () => {
        console.log('rendering board');
    };

    return {
        render,
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
        init
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
