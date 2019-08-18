const Game = require('../models/game')
const Player = require('../models/player')
const gameTest = new Game()
const wonderTest = {
  name: "Wonder Test",
  defaultResource: 4,
  faceA: {
    stepOne: {
      built: false,
      price: {
        2: 2
      },
      value: {
        addScore: {
          isActive: true,
          data: 3
        }
      }
    },
    stepTwo: {
      price: {
        1: 3
      },
      value: {
        specialStep: {
          isActive: true,
          data: {
            militaryScore: 2
          }
        }
      }
    },
    stepThree: {
      price: {
        4: 4
      },
      value: {
        addScore: {
          isActive: true,
          data: 7
        }
      }
    }
  }
}

// test('Init game', () => {
  //     expect(gameTest.initGame(['player1', 'player2']))
  // })
  
  test('player build card not free', () => {
  let playerTest = new Player('player1', wonderTest)
  const card1 = { numberPlayer: 3, name: "Card1", age: 1, data: { 1: 1, 3: 1 }, price: { 1: 1, 3: 1, 4: 1 }, color: 1 }

  for (prop in playerTest.resources) {
    playerTest.resources[prop] = 3
  }
  
  playerTest.deck.push(card1)
  let cardsBuiltExpected = {
    civilsBuildings: [],
    scientificBuildings: [],
    commercialBuildings: [],
    militaryBuildings: [],
    rawMaterials: [card1],
    manufactures: [],
    guilds: []
  }
  
  // expect(playerTest.buildCard(freeCard)).toBe(true)
  expect(playerTest.buildCard(card1)).toBe(true)
  expect(playerTest.cardsBuilt).toEqual(cardsBuiltExpected)
})

  
test('player build card not free and cost only gold', () => {
  let playerTest = new Player('player1', wonderTest)
  const card1 = { numberPlayer: 3, name: "Card1", age: 1, data: { 1: 1, 3: 1 }, price: { 8: 2 }, color: 1 }

  for (prop in playerTest.resources) {
    playerTest.resources[prop] = 3
  }
  
  playerTest.deck.push(card1)

  let cardsBuiltExpected = {
    civilsBuildings: [],
    scientificBuildings: [],
    commercialBuildings: [],
    militaryBuildings: [],
    rawMaterials: [card1],
    manufactures: [],
    guilds: []
  }
  
  expect(playerTest.buildCard(card1)).toBe(true)
  expect(playerTest.cardsBuilt).toEqual(cardsBuiltExpected)
  expect(playerTest.gold).toBe(1)
})

test('player build free card', () => {
  const freeCard = { numberPlayer: 3, name: "Card3", age: 1, data: { 1: 1, 3: 1 }, price: { free: true }, color: 1 }
  let playerTest = new Player('player1', wonderTest)
  let cardsBuiltExpected = {
    civilsBuildings: [],
    scientificBuildings: [],
    commercialBuildings: [],
    militaryBuildings: [],
    rawMaterials: [freeCard],
    manufactures: [],
    guilds: []
  }

  playerTest.deck.push(freeCard)

  expect(playerTest.buildCard(freeCard)).toBe(true)
  expect(playerTest.cardsBuilt).toEqual(cardsBuiltExpected)
})

test('Player build card not possible', () => {
  let playerTest = new Player('player1', wonderTest)
  const card1 = { numberPlayer: 3, name: "Card1", age: 1, data: { 1: 1, 3: 1 }, price: { 1: 8, 3: 1, 4: 1 }, color: 1 }

  playerTest.deck.push(card1)

  expect(playerTest.buildCard(card1)).toBe(false)
})

test('Player build step wonder', () => {
  let playerTest = new Player('player1', wonderTest)
  const trashCard = { numberPlayer: 3, name: "Card1", age: 1, data: { 1: 1, 3: 1 }, price: { 1: 8, 3: 1, 4: 1 }, color: 1 }
  const trashCardExpected = [trashCard]

  for (prop in playerTest.resources) {
    playerTest.resources[prop] = 3
  }

  playerTest.deck.push(trashCard)

  expect(playerTest.buildWonderStep(trashCard,"faceA", "stepOne", gameTest)).toBe(true)
  expect(gameTest.trashCards).toEqual(trashCardExpected)
})