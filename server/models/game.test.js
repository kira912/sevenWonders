const Game = require('../models/game')
const Player = require('../models/player')
const gametest = new Game()

// test('Init game', () => {
//     expect(gametest.initGame(['player1', 'player2']))
// })

test('player build card', () => {
  let playerTest = new Player('player1', {})
  for (prop in playerTest.resources) {
    playerTest.resources[`${prop}`] = 3
  }

  const card1 = { numberPlayer: 3, name: "Card1", age: 1, data: { 1: 1, 3: 1 }, price: { 1: 1, 3: 1, 4: 1 }, color: 1 }
  const card2 = { numberPlayer: 3, name: "Card2", age: 1, data: { 1: 1, 3: 1 }, price: { 8: 1 }, color: 1 }
  const freeCard = { numberPlayer: 3, name: "Card2", age: 1, data: { 1: 1, 3: 1 }, price: { free: true }, color: 1 }

  let cardsBuiltExpected = {
    civilsBuildings: [],
    scientificBuildings: [],
    commercialBuildings: [],
    militaryBuildings: [],
    rawMaterials: [card1, card2, freeCard],
    manufactures: [],
    guilds: []
  }

  // expect(playerTest.buildCard(freeCard)).toBe(true)
  expect(playerTest.buildCard(card1)).toBe(true)
  expect(playerTest.cardsBuilt).toEqual(cardsBuiltExpected)
})