const Card = require('../models/card')
const Wonder = require('../models/wonder')
const mongoose = require('mongoose')

let cardsAge1 = [
  { numberPlayer: 3, name: "Lumber Yard", age: 1, data: { 2: 1 }, price: {}, color: 1 },
  { numberPlayer: 4, name: "Lumber Yard", age: 1, data: { 2: 1 }, price: {}, color: 1 },
  { numberPlayer: 3, name: "Ore Vein", age: 1, data: { 4: 1 }, price: {free: true}, color: 1 },
  { numberPlayer: 4, name: "Ore Vein", age: 1, data: { 4: 1 }, price: {free: true}, color: 1 },
  { numberPlayer: 3, name: "Clay pool", age: 1, data: { 1: 1 }, price: {free: true}, color: 1 },
  { numberPlayer: 5, name: "Clay pool", age: 1, data: { 1: 1 }, price: {free: true}, color: 1 },
  { numberPlayer: 3, name: "Stone pit", age: 1, data: { 3: 1 }, price: {free: true}, color: 1 },
  { numberPlayer: 5, name: "Stone pit", age: 1, data: { 3: 1 }, price: {free: true}, color: 1 },
  { numberPlayer: 3, name: "Timber yard", age: 1, data: { 3: 1, 2: 1 }, price: { 8: 1 }, color: 1 },
  { numberPlayer: 3, name: "Clay pit", age: 1, data: { 1: 1, 3: 1 }, price: { 8: 1 }, color: 1 },
  { numberPlayer: 4, name: "Excavation", age: 1, data: { 3: 1, 1: 1 }, price: { 8: 1 }, color: 1 },
  { numberPlayer: 5, name: "Forest cave", age: 1, data: { 2: 1, 4: 1 }, price: { 8: 1 }, color: 1 },
  { numberPlayer: 6, name: "Tree fram", age: 1, data: { 1: 1, 2: 1 }, price: { 8: 1 }, color: 1 },
  { numberPlayer: 6, name: "Mine", age: 1, data: { 3: 1, 4: 1 }, price: { 8: 1 }, color: 1 },
  { numberPlayer: 3, name: "Loom", age: 1, data: { 6: 1 }, price: {free: true}, color: 2 },
  { numberPlayer: 6, name: "Loom", age: 1, data: { 6: 1 }, price: {free: true}, color: 2 },
  { numberPlayer: 3, name: "Glassworks", age: 1, data: { 5: 1 }, price: {free: true}, color: 2 },
  { numberPlayer: 6, name: "Glassworks", age: 1, data: { 5: 1 }, price: {free: true}, color: 2 },
  { numberPlayer: 3, name: "Press", age: 1, data: { 7: 1 }, price: {free: true}, color: 2},
  { numberPlayer: 6, name: "Press", age: 1, data: { 7: 1 }, price: {free: true}, color: 2 },
  { numberPlayer: 3, name: "Est Trading Post", age: 1, data: { 1: 1, 2: 1, 3: 1, 4: 1, left: false, right: true, onlyOnce: false }, price: {free: true}, color: 4 },
  { numberPlayer: 7, name: "Est Trading Post", age: 1, data: { 1: 1, 2: 1, 3: 1, 4: 1, left: false, right: true, onlyOnce: false }, price: {free: true}, color: 4 },
  { numberPlayer: 3, name: "West Trading Post", age: 1, data: { 1: 1, 2: 1, 3: 1, 4: 1, left: true, right: false, onlyOnce: false }, price: {free: true}, color: 4 },
  { numberPlayer: 7, name: "West Trading Post", age: 1, data: { 1: 1, 2: 1, 3: 1, 4: 1, left: true, right: false, onlyOnce: false }, price: {free: true}, color: 4 },
  { numberPlayer: 3, name: "Marketplace", age: 1, data: { 1: 1, 2: 1, 3: 1, 4: 1, left: true, right: false, onlyOnce: false }, price: {free: true}, color: 4 },
  { numberPlayer: 6, name: "Marketplace", age: 1, data: { 1: 1, 2: 1, 3: 1, 4: 1, left: true, right: false, onlyOnce: false }, price: {free: true}, color: 4 },
  { numberPlayer: 4, name: "Tavern", age: 1, data: { 8: 5, onlyOnce: true }, price: {free: true}, color: 4 },
  { numberPlayer: 5, name: "Tavern", age: 1, data: { 8: 5, onlyOnce: true }, price: {free: true}, color: 4 },
  { numberPlayer: 7, name: "Tavern3", age: 1, data: { 8: 5, onlyOnce: true }, price: {free: true}, color: 4 },
  { numberPlayer: 3, name: "Alter", age: 1, data: { score: 2 }, price: {free: true}, color: 3 },
  { numberPlayer: 5, name: "Alter", age: 1, data: { score: 2 }, price: {free: true}, color: 3 },
  { numberPlayer: 3, name: "Theatre", age: 1, data: { score: 2 }, price: {free: true}, color: 3 },
  { numberPlayer: 6, name: "Theatre", age: 1, data: { score: 2 }, price: {free: true}, color: 3 },
  { numberPlayer: 3, name: "Baths", age: 1, data: { score: 3 }, price: { 3: 1 }, color: 3 },
  { numberPlayer: 7, name: "Baths", age: 1, data: { score: 3 }, price: { 3: 1 }, color: 3 },
  { numberPlayer: 4, name: "Pawnshop", age: 1, data: { score: 3 }, price: {free: true}, color: 3 },
  { numberPlayer: 7, name: "Pawnshop", age: 1, data: { score: 3 }, price: {free: true}, color: 3 },
  { numberPlayer: 3, name: "Stockade", age: 1, data: { shield: 1 }, price: { 2: 1 }, color: 5 },
  { numberPlayer: 7, name: "Stockade", age: 1, data: { shield: 1 }, price: { 2: 1 }, color: 5 },
  { numberPlayer: 3, name: "Barracks", age: 1, data: { shield: 1 }, price: { 4: 1 }, color: 5 },
  { numberPlayer: 5, name: "Barracks", age: 1, data: { shield: 1 }, price: { 4: 1 }, color: 5 },
  { numberPlayer: 3, name: "Guard Tower", age: 1, data: { shield: 1 }, price: { 1: 1 }, color: 5 },
  { numberPlayer: 4, name: "Guard Tower", age: 1, data: { shield: 1 }, price: { 1: 1 }, color: 5 },
  { numberPlayer: 3, name: "Apothecary", age: 1, data: { symbol: 1 }, price: { 6: 1 }, color: 6 },
  { numberPlayer: 5, name: "Apothecary", age: 1, data: { symbol: 1 }, price: { 6: 1 }, color: 6 },
  { numberPlayer: 3, name: "Workshop", age: 1, data: { symbol: 2 }, price: { 5: 1 }, color: 6 },
  { numberPlayer: 7, name: "Workshop", age: 1, data: { symbol: 2 }, price: { 5: 1 }, color: 6 },
  { numberPlayer: 3, name: "Scriptorium", age: 1, data: { symbol: 3 }, price: { 7: 1 }, color: 6 },
  { numberPlayer: 4, name: "Scriptorium", age: 1, data: { symbol: 3 }, price: { 7: 1 }, color: 6 }
]

const cardsAge2 = [
  { numberPlayer: 3, name: "Sawmill", age: 2, data: { 2: 2 }, price: { 8: 1 }, color: 1 },
  { numberPlayer: 4, name: "Sawmill", age: 2, data: { 2: 2 }, price: { 8: 1 }, color: 1 },
  { numberPlayer: 3, name: "Quarry", age: 2, data: { 3: 2 }, price: { 8: 1 }, color: 1 },
  { numberPlayer: 4, name: "Quarry", age: 2, data: { 3: 2 }, price: { 8: 1 }, color: 1 },
  { numberPlayer: 3, name: "Brickyard", age: 2, data: { 1: 2 }, price: { 8: 1 }, color: 1 },
  { numberPlayer: 4, name: "Brickyard", age: 2, data: { 1: 2 }, price: { 8: 1 }, color: 1 },
  { numberPlayer: 3, name: "Foundry", age: 2, data: { 4: 2 }, price: { 8: 1 }, color: 1 },
  { numberPlayer: 4, name: "Foundry", age: 2, data: { 4: 2 }, price: { 8: 1 }, color: 1 },
  { numberPlayer: 3, name: "Loom", age: 2, data: { 6: 1 }, price: { free: true }, color: 2 },
  { numberPlayer: 5, name: "Loom", age: 2, data: { 6: 1 }, price: { free: true }, color: 2 },
  { numberPlayer: 3, name: "Glassworks", age: 2, data: { 5: 1 }, price: { free: true }, color: 2 },
  { numberPlayer: 5, name: "Glassworks", age: 2, data: { 5: 1 }, price: { free: true }, color: 2 },
  { numberPlayer: 3, name: "Press", age: 2, data: { 7: 1 }, price: { free: true }, color: 2 },
  { numberPlayer: 5, name: "Press", age: 2, data: { 7: 1 }, price: { free: true }, color: 2 },
  { numberPlayer: 3, name: "Aqueduct", age: 2, data: { score: 5 }, price: { 3: 3 }, color: 3 },
  { numberPlayer: 7, name: "Aqueduct", age: 2, data: { score: 5 }, price: { 3: 3 }, color: 3 },
  { numberPlayer: 3, name: "Temple", age: 2, data: { score: 3 }, price: { 3: 3 }, color: 3 },
  { numberPlayer: 6, name: "Temple", age: 2, data: { score: 3 }, price: { 3: 3 }, color: 3 },
  { numberPlayer: 3, name: "Statue", age: 2, data: { score: 4 }, price: { 3: 3 }, color: 3 },
  { numberPlayer: 7, name: "Statue", age: 2, data: { score: 4 }, price: { 3: 3 }, color: 3 },
  { numberPlayer: 3, name: "Courthouse", age: 2, data: { score: 4 }, price: { 3: 3 }, color: 3 },
  { numberPlayer: 5, name: "Courthouse", age: 2, data: { score: 4 }, price: { 3: 3 }, color: 3 },
  { numberPlayer: 3, name: "Forum", age: 2, data: { 5: 1, 6: 1, 7: 1 }, price: { 1: 2 }, color: 4 },
  { numberPlayer: 6, name: "Forum", age: 2, data: { 5: 1, 6: 1, 7: 1 }, price: { 1: 2 }, color: 4 },
  { numberPlayer: 7, name: "Forum", age: 2, data: { 5: 1, 6: 1, 7: 1 }, price: { 1: 2 }, color: 4 },
  { numberPlayer: 3, name: "Caravansery", age: 2, data: { 1: 1, 2: 1, 3: 1, 4: 1 }, price: { 2: 2 }, color: 4 },
  { numberPlayer: 5, name: "Caravansery", age: 2, data: { 1: 1, 2: 1, 3: 1, 4: 1 }, price: { 2: 2 }, color: 4 },
  { numberPlayer: 6, name: "Caravansery", age: 2, data: { 1: 1, 2: 1, 3: 1, 4: 1 }, price: { 2: 2 }, color: 4 },
  { numberPlayer: 3, name: "Vineyard", age: 2, data: { isSpecial: true, forColor: 1, in: 3, gain: { 8: 1} }, price: { 2: 2 }, color: 4 },
  { numberPlayer: 6, name: "Vineyard", age: 2, data: { isSpecial: true, forColor: 1, in: 3, gain: { 8: 1} }, price: { free: true }, color: 4 },
  { numberPlayer: 4, name: "Bazar", age: 2, data: { isSpecial: true, forColor: 2, in: 3, gain: { 8: 2} }, price: { free: true }, color: 4 },
  { numberPlayer: 7, name: "Bazar", age: 2, data: { isSpecial: true, forColor: 2, in: 3, gain: { 8: 2} }, price: { free: true }, color: 4 },
  { numberPlayer: 3, name: "Walls", age: 2, data: { shield: 2 }, price: { 3: 3 }, color: 5 },
  { numberPlayer: 7, name: "Walls", age: 2, data: { shield: 2 }, price: { 3: 3 }, color: 5 },
  { numberPlayer: 4, name: "Training Ground", age: 2, data: { shield: 2 }, price: { 2: 1, 4: 2 }, color: 5 },
  { numberPlayer: 6, name: "Training Ground", age: 2, data: { shield: 2 }, price: { 2: 1, 4: 2 }, color: 5 },
  { numberPlayer: 7, name: "Training Ground", age: 2, data: { shield: 2 }, price: { 2: 1, 4: 2 }, color: 5 },
  { numberPlayer: 3, name: "Stables", age: 2, data: { shield: 2 }, price: { 1: 1, 2: 1, 4: 1 }, color: 5 },
  { numberPlayer: 5, name: "Stables", age: 2, data: { shield: 2 }, price: { 1: 1, 2: 1, 4: 1 }, color: 5 },
  { numberPlayer: 3, name: "Archery Range", age: 2, data: { shield: 2 }, price: {  2: 2, 4: 1 }, color: 5 },
  { numberPlayer: 6, name: "Archery Range", age: 2, data: { shield: 2 }, price: {  2: 2, 4: 1 }, color: 5 },
  { numberPlayer: 3, name: "Dispensary", age: 2, data: { symbol: 1 }, price: { 4: 2, 5: 1 }, color: 6 },
  { numberPlayer: 4, name: "Dispensary", age: 2, data: { symbol: 1 }, price: { 4: 2, 5: 1 }, color: 6 },
  { numberPlayer: 3, name: "Laboratory", age: 2, data: { symbol: 2 }, price: { 1: 2, 7: 1 }, color: 6 },
  { numberPlayer: 5, name: "Laboratory", age: 2, data: { symbol: 2 }, price: { 1: 2, 7: 1 }, color: 6 },
  { numberPlayer: 3, name: "Library", age: 2, data: { symbol: 3 }, price: { 2: 2, 6: 1 }, color: 6 },
  { numberPlayer: 6, name: "Library", age: 2, data: { symbol: 3 }, price: { 2: 2, 6: 1 }, color: 6 },
  { numberPlayer: 3, name: "School", age: 2, data: { symbol: 3 }, price: { 2: 1, 7: 1 }, color: 6 },
  { numberPlayer: 7, name: "School", age: 2, data: { symbol: 3 }, price: { 2: 1, 7: 1 }, color: 6 },
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

async function seedsCards1() {
  const cards = await Card.create(cardsAge1)

  return {
    cardsAgeOne: cards
  }
}

async function seedsCards2() {
  const cards = await Card.create(cardsAge2)

  return {
    cardsAgeTwo: cards
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
  // useCreateIndex: true,
  useNewUrlParser: true
})
.then(cleanup)
.then(seedsCards1)
.then(seedsCards2)
.then(seedsWonders)
.catch(err => {
  console.log(err)
})
.then(disconnect)