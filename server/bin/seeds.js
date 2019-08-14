const Card = require('../models/card')
const Wonder = require('../models/wonder')
const mongoose = require('mongoose')

let cardsAge1 = [
  { name: "Lumber Yard", age: 1, data: { 2: 1 }, price: {}, color: 1, numberPlayer: 3 },
  { name: "Lumber Yard", age: 1, data: { 2: 1 }, price: {}, color: 1, numberPlayer: 4 },
  { name: "Ore Vein", age: 1, data: { 4: 1 }, price: {}, color: 1, numberPlayer: 3 },
  { name: "Ore Vein", age: 1, data: { 4: 1 }, price: {}, color: 1, numberPlayer: 4 },
  { name: "Clay pool", age: 1, data: { 1: 1 }, price: {}, color: 1, numberPlayer: 3 },
  { name: "Clay pool", age: 1, data: { 1: 1 }, price: {}, color: 1, numberPlayer: 5 },
  { name: "Stone pit", age: 1, data: { 3: 1 }, price: {}, color: 1, numberPlayer: 3 },
  { name: "Stone pit", age: 1, data: { 3: 1 }, price: {}, color: 1, numberPlayer: 5 },
  { name: "Timber yard", age: 1, data: { 3: 1, 2: 1 }, price: { 8: 1 }, color: 1, numberPlayer: 3 },
  { name: "Clay pit", age: 1, data: { 1: 1, 3: 1 }, price: { 8: 1 }, color: 1, numberPlayer: 3 },
  { name: "Excavation", age: 1, data: { 3: 1, 1: 1 }, price: { 8: 1 }, color: 1, numberPlayer: 4 },
  { name: "Forest cave", age: 1, data: { 2: 1, 4: 1 }, price: { 8: 1 }, color: 1, numberPlayer: 5 },
  { name: "Tree fram", age: 1, data: { 1: 1, 2: 1 }, price: { 8: 1 }, color: 1, numberPlayer: 6 },
  { name: "Mine", age: 1, data: { 3: 1, 4: 1 }, price: { 8: 1 }, color: 1, numberPlayer: 6 },
  { name: "Loom", age: 1, data: { 6: 1 }, price: {}, color: 2, numberPlayer: 3 },
  { name: "Loom", age: 1, data: { 6: 1 }, price: {}, color: 2, numberPlayer: 6 },
  { name: "Glassworks", age: 1, data: { 5: 1 }, price: {}, color: 2, numberPlayer: 3 },
  { name: "Glassworks", age: 1, data: { 5: 1 }, price: {}, color: 2, numberPlayer: 6 },
  { name: "Press", age: 1, data: { 7: 1 }, price: {}, color: 2, numberPlayer: 3},
  { name: "Press", age: 1, data: { 7: 1 }, price: {}, color: 2, numberPlayer: 6 },
  { name: "Est Trading Post", age: 1, data: { 1: 1, 2: 1, 3: 1, 4: 1, left: false, right: true, onlyOnce: false }, price: {}, color: 4, numberPlayer: 3 },
  { name: "Est Trading Post", age: 1, data: { 1: 1, 2: 1, 3: 1, 4: 1, left: false, right: true, onlyOnce: false }, price: {}, color: 4, numberPlayer: 7 },
  { name: "West Trading Post", age: 1, data: { 1: 1, 2: 1, 3: 1, 4: 1, left: true, right: false, onlyOnce: false }, price: {}, color: 4, numberPlayer: 3 },
  { name: "West Trading Post", age: 1, data: { 1: 1, 2: 1, 3: 1, 4: 1, left: true, right: false, onlyOnce: false }, price: {}, color: 4, numberPlayer: 7 },
  { name: "Marketplace", age: 1, data: { 1: 1, 2: 1, 3: 1, 4: 1, left: true, right: false, onlyOnce: false }, price: {}, color: 4, numberPlayer: 3 },
  { name: "Marketplace", age: 1, data: { 1: 1, 2: 1, 3: 1, 4: 1, left: true, right: false, onlyOnce: false }, price: {}, color: 4, numberPlayer: 6 },
  { name: "Tavern", age: 1, data: { 8: 5, onlyOnce: true }, price: {}, color: 4, numberPlayer: 3 },
  { name: "Tavern", age: 1, data: { 8: 5, onlyOnce: true }, price: {}, color: 4, numberPlayer: 6 },
  { name: "Tavern", age: 1, data: { 8: 5, onlyOnce: true }, price: {}, color: 4, numberPlayer: 7 },
  { name: "Alter", age: 1, data: { score: 2 }, price: {}, color: 4, numberPlayer: 3 },
  { name: "Alter", age: 1, data: { score: 2 }, price: {}, color: 4, numberPlayer: 5 },
  { name: "Theatre", age: 1, data: { score: 2 }, price: {}, color: 4, numberPlayer: 3 },
  { name: "Theatre", age: 1, data: { score: 2 }, price: {}, color: 4, numberPlayer: 6 },
  { name: "Baths", age: 1, data: { score: 3 }, price: { 3: 1 }, color: 4, numberPlayer: 3 },
  { name: "Baths", age: 1, data: { score: 3 }, price: { 3: 1 }, color: 4, numberPlayer: 7 },
  { name: "Pawnshop", age: 1, data: { score: 3 }, price: {}, color: 4, numberPlayer: 4 },
  { name: "Pawnshop", age: 1, data: { score: 3 }, price: {}, color: 4, numberPlayer: 7 },
  { name: "Stockade", age: 1, data: { shield: 1 }, price: { 2: 1 }, color: 5, numberPlayer: 3 },
  { name: "Stockade", age: 1, data: { shield: 1 }, price: { 2: 1 }, color: 5, numberPlayer: 7 },
  { name: "Barracks", age: 1, data: { shield: 1 }, price: { 4: 1 }, color: 5, numberPlayer: 3 },
  { name: "Barracks", age: 1, data: { shield: 1 }, price: { 4: 1 }, color: 5, numberPlayer: 5 },
  { name: "Guard Tower", age: 1, data: { shield: 1 }, price: { 1: 1 }, color: 5, numberPlayer: 3 },
  { name: "Guard Tower", age: 1, data: { shield: 1 }, price: { 1: 1 }, color: 5, numberPlayer: 4 },
  { name: "Apothecary", age: 1, data: { symbol: 1 }, price: { 6: 1 }, color: 6, numberPlayer: 3 },
  { name: "Apothecary", age: 1, data: { symbol: 1 }, price: { 6: 1 }, color: 6, numberPlayer: 5 },
  { name: "Workshop", age: 1, data: { symbol: 2 }, price: { 5: 1 }, color: 6, numberPlayer: 3 },
  { name: "Workshop", age: 1, data: { symbol: 2 }, price: { 5: 1 }, color: 6, numberPlayer: 7 },
  { name: "Scriptorium", age: 1, data: { symbol: 3 }, price: { 7: 1 }, color: 6, numberPlayer: 3 },
  { name: "Scriptorium", age: 1, data: { symbol: 3 }, price: { 7: 1 }, color: 6, numberPlayer: 4 }
]

const wondersList = [
  {
    name: "Le Colosse de Rhodes",
    defaultResource: 4,
    faceA: {
      stepOne: {
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
  },
  {
    name: "Le phare d’Alexandrie",
    defaultResource: 5,
    faceA: {
      stepOne: {
        price: {
          3: 2
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
          4: 2
        },
        value: {
          addResources: {
            isActive: true,
            data: {
              1: 1,
              4: 1,
              2: 1,
              3: 1
            }
          }
        }
      },
      stepThree: {
        price: {
          5: 4
        },
        value: {
          addScore: {
            isActive: true,
            data: 7
          }
        }
      }
    }
  },
]

async function cleanup() {

  let cleanup = await Card.deleteMany({})
  cleanup = await Wonder.deleteMany({})

  return cleanup;
}

async function seedsCards() {
  const cards = await Card.create(cardsAge1)

  return {
    cardsAgeOne: cards
  }
}

async function seedsWonders() {
  const wonders = await Wonder.create(wondersList)

  return {
    wonders: wonders
  }
}

function disconnect() {
  return mongoose.connection.close()
}

mongoose.connect("mongodb://localhost/sevenWonders", {
    useNewUrlParser: true
  })
  .then(cleanup)
  .then(seedsCards)
  .then(seedsWonders)
  .catch(err => {
    console.log(err)
  })
  .then(disconnect)