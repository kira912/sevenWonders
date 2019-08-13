const Game = require('../models/game')
const gametest = new Game()

console.log(gametest.wonders)
test('Init game', () => {
    expect(gametest.initGame(['player1', 'player2']))
})