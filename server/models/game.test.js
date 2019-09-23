const Game = require('../models/game')
const Player = require('../models/player')
const Card = require('../models/card')
let cardsAge1 = require('../bin/cards1.json')
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

test('player build card not free', () => {
  let playerTest = new Player('player1', wonderTest)
  const card1 = { _id: 1, numberPlayer: 3, name: "Card1", age: 1, data: { 1: 1, 3: 1 }, price: { 1: 1, 3: 1, 4: 1 }, color: 1 }
  const card2 = {_id: 2}
  const card3 = {_id: 3}

  for (prop in playerTest.resources) {
    playerTest.resources[prop] = 3
  }
  
  let cardsBuiltExpected = {
    civilsBuildings: [],
    scientificBuildings: [],
    commercialBuildings: [],
    militaryBuildings: [],
    rawMaterials: [card1],
    manufactures: [],
    guilds: []
  }

  playerTest.deck.push(card1, card2, card3)
  
  expect(playerTest.buildCard(card1)).toBe(true)
  expect(playerTest.cardsBuilt).toEqual(cardsBuiltExpected)
  expect(playerTest.deck).toEqual([card2, card3])
})

  
test('player build card not free and cost only gold', () => {
  let playerTest = new Player('player1', wonderTest)
  const card1 = { _id: 1, numberPlayer: 3, name: "Card1", age: 1, data: { 1: 1, 3: 1 }, price: { 8: 2 }, color: 1 }

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
  expect(playerTest.deck).toEqual([])
})

test('player build free card', () => {
  const freeCard = { _id: 1, numberPlayer: 3, name: "Card3", age: 1, data: { 1: 1, 3: 1 }, price: { free: true }, color: 1 }
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
  expect(playerTest.deck).toEqual([])
})

test('Player build card not possible', () => {
  let playerTest = new Player('player1', wonderTest)
  const card1 = { _id: 1, numberPlayer: 3, name: "Card1", age: 1, data: { 1: 1, 3: 1 }, price: { 1: 8, 3: 1, 4: 1 }, color: 1 }

  playerTest.deck.push(card1)

  expect(playerTest.buildCard(card1)).toBe(false)
})

test('Player build step wonder', () => {
  let game = new Game()
  let playerTest = new Player('player1', wonderTest)
  const trashCard = { _id: 1, numberPlayer: 3, name: "Card1", age: 1, data: { 1: 1, 3: 1 }, price: { 1: 8, 3: 1, 4: 1 }, color: 1 }
  const trashCardExpected = [trashCard]

  for (prop in playerTest.resources) {
    playerTest.resources[prop] = 3
  }

  playerTest.deck.push(trashCard)

  expect(playerTest.buildWonderStep(trashCard,"faceA", "stepOne", game)).toBe(true)
  expect(game.trashCards).toEqual(trashCardExpected)
  expect(playerTest.deck).toEqual([])
})

test('Age 1 next round, switch decks between players', () => {
  let game = new Game()
  const deck1 = [{ id: 1, name: "Card1" }, { id: 2, name: "Card2" }, { id: 3, name: "Card3" }, { id: 4, name: "Card4" }, { id: 5, name: "Card5" }, { id: 6, name: "Card6" }, { id: 7, name: "Card7" }]
  const deck2 = [{ id: 8, name: "Card8" }, { id: 9, name: "Card9" }, { id: 10, name: "Card10" }, { id: 11, name: "Card11" }, { id: 12, name: "Card12" }, { id: 13, name: "Card13" }, { id: 14, name: "Card14" }]
  const deck3 = [{ id: 15, name: "Card15" }, { id: 16, name: "Card16" }, { id: 17, name: "Card17" }, { id: 18, name: "Card18" }, { id: 19, name: "Card19" }, { id: 20, name: "Card20" }, { id: 21, name: "Card21" }]
  let player1 = new Player('Player1', {})
  player1.deck = deck1
  let player2 = new Player('Player2', {})
  player2.deck = deck2
  let player3 = new Player('Player3', {})
  player3.deck = deck3

  game.players.push(player1, player2, player3)
  game.switchDeck(1)

  expect(player1.deck).toBe(deck3)
  expect(player2.deck).toBe(deck1)
  expect(player3.deck).toBe(deck2)
  
})

test('Age 2 next round, switch decks between players', () => {
  let game = new Game()
  const deck1 = [{ id: 1, name: "Card1" }, { id: 2, name: "Card2" }, { id: 3, name: "Card3" }, { id: 4, name: "Card4" }, { id: 5, name: "Card5" }, { id: 6, name: "Card6" }, { id: 7, name: "Card7" }]
  const deck2 = [{ id: 8, name: "Card8" }, { id: 9, name: "Card9" }, { id: 10, name: "Card10" }, { id: 11, name: "Card11" }, { id: 12, name: "Card12" }, { id: 13, name: "Card13" }, { id: 14, name: "Card14" }]
  const deck3 = [{ id: 15, name: "Card15" }, { id: 16, name: "Card16" }, { id: 17, name: "Card17" }, { id: 18, name: "Card18" }, { id: 19, name: "Card19" }, { id: 20, name: "Card20" }, { id: 21, name: "Card21" }]
  let player1 = new Player('Player1', {})
  player1.deck = deck1
  let player2 = new Player('Player2', {})
  player2.deck = deck2
  let player3 = new Player('Player3', {})
  player3.deck = deck3

  game.players.push(player1, player2, player3)
  game.switchDeck(2)

  expect(player1.deck).toBe(deck2)
  expect(player2.deck).toBe(deck3)
  expect(player3.deck).toBe(deck1)
  
})

test('Age 3 next round, switch decks between players', () => {
  let game = new Game()
  const deck1 = [{ id: 1, name: "Card1" }, { id: 2, name: "Card2" }, { id: 3, name: "Card3" }, { id: 4, name: "Card4" }, { id: 5, name: "Card5" }, { id: 6, name: "Card6" }, { id: 7, name: "Card7" }]
  const deck2 = [{ id: 8, name: "Card8" }, { id: 9, name: "Card9" }, { id: 10, name: "Card10" }, { id: 11, name: "Card11" }, { id: 12, name: "Card12" }, { id: 13, name: "Card13" }, { id: 14, name: "Card14" }]
  const deck3 = [{ id: 15, name: "Card15" }, { id: 16, name: "Card16" }, { id: 17, name: "Card17" }, { id: 18, name: "Card18" }, { id: 19, name: "Card19" }, { id: 20, name: "Card20" }, { id: 21, name: "Card21" }]
  let player1 = new Player('Player1', {})
  player1.deck = deck1
  let player2 = new Player('Player2', {})
  player2.deck = deck2
  let player3 = new Player('Player3', {})
  player3.deck = deck3

  game.players.push(player1, player2, player3)
  game.switchDeck(3)

  expect(player1.deck).toBe(deck3)
  expect(player2.deck).toBe(deck1)
  expect(player3.deck).toBe(deck2)
  
})

test('Test end age 1 make war', () => {
  let game = new Game()
  let player1 = new Player('Player1', {})
  player1.cardsBuilt.militaryBuildings = [{ _id: 1, numberPlayer: 3, name: "CardWar", age: 1, data: { shield: 1 }, price: { 1: 1 }, color: 5 }, { _id: 2, numberPlayer: 3, name: "CardWar", age: 1, data: { shield: 2 }, price: { 1: 1 }, color: 5 }]
  let player2 = new Player('Player2', {})
  let player3 = new Player('Player3', {})

  game.players.push(player1, player2, player3)
  game.endAgeMakeWar(1)

  expect(player1.militaryScore).toBe(2)
  expect(player2.militaryScore).toBe(-1)
  expect(player3.militaryScore).toBe(-1)
})

test('Test end age 2 make war', () => {
  let game = new Game()
  let player1 = new Player('Player1', wonderTest)
  player1.cardsBuilt.militaryBuildings = [{ _id: 1, numberPlayer: 3, name: "CardWar", age: 1, data: { shield: 1 }, price: { 1: 1 }, color: 5 }, { _id: 2, numberPlayer: 3, name: "CardWar", age: 1, data: { shield: 2 }, price: { 1: 1 }, color: 5 }]
  let player2 = new Player('Player2', {})
  let player3 = new Player('Player3', {})

  game.players.push(player1, player2, player3)
  game.endAgeMakeWar(2)

  expect(player1.militaryScore).toBe(6)
  expect(player2.militaryScore).toBe(-1)
  expect(player3.militaryScore).toBe(-1)
})

test('Test end age 3 make war', () => {
  let game = new Game()
  let player1 = new Player('Player1', wonderTest)
  player1.cardsBuilt.militaryBuildings = [{ _id: 1, numberPlayer: 3, name: "CardWar", age: 1, data: { shield: 1 }, price: { 1: 1 }, color: 5 }, { _id: 2, numberPlayer: 3, name: "CardWar", age: 1, data: { shield: 2 }, price: { 1: 1 }, color: 5 }]
  let player2 = new Player('Player2', {})
  let player3 = new Player('Player3', {})

  game.players.push(player1, player2, player3)
  game.endAgeMakeWar(3)

  expect(player1.militaryScore).toBe(10)
  expect(player2.militaryScore).toBe(-1)
  expect(player3.militaryScore).toBe(-1)
})

test('Test end age 3 make war. Nobody have shields', () => {
  let game = new Game()
  let player1 = new Player('Player1', wonderTest)
  let player2 = new Player('Player2', {})
  let player3 = new Player('Player3', {})

  game.players.push(player1, player2, player3)
  game.endAgeMakeWar(3)

  expect(player1.militaryScore).toBe(0)
  expect(player2.militaryScore).toBe(0)
  expect(player3.militaryScore).toBe(0)
})

test('Init Age 1 with 3 players', () => {
  let game = new Game()
  let player1 = new Player('Player1', {})
  let player2 = new Player('Player2', {})
  let player3 = new Player('Player3', {})

  game.cards.age1 = cardsAge1
  game.players.push(player1, player2, player3)
  game.initAge(1)

  expect(player1.deck.length).toBe(7)
  expect(player2.deck.length).toBe(7)
  expect(player3.deck.length).toBe(7)
})


test('Init Age 1 with 7 players', () => {
  let game = new Game()
  let player1 = new Player('Player1', {})
  let player2 = new Player('Player2', {})
  let player3 = new Player('Player3', {})
  let player4 = new Player('player4', {})
  let player5 = new Player('player5', {})
  let player6 = new Player('player6', {})
  let player7 = new Player('player7', {})

  game.cards.age1 = cardsAge1
  game.players.push(player1, player2, player3, player4, player5, player6, player7)
  game.initAge(1)

  expect(player1.deck.length).toBe(7)
  expect(player2.deck.length).toBe(7)
  expect(player3.deck.length).toBe(7)
  expect(player4.deck.length).toBe(7)
  expect(player5.deck.length).toBe(7)
  expect(player6.deck.length).toBe(7)
  expect(player7.deck.length).toBe(7)
})