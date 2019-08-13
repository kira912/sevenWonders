const Card = require('../models/card')
const Wonder = require('../models/wonder')
const mongoose = require('mongoose')

let cardsAge1 = [{
    name: "Chantier",
    age: 1,
    value: {
      2: 1
    },
    price: {},
    cardColor: 1,
    numberPlayer: [3, 4]
  },
  {
    name: "Cavité",
    age: 1,
    value: {
      3: 1
    },
    price: {},
    cardColor: 1,
    numberPlayer: [3, 5]
  },
  {
    name: "Bassin Argileux",
    age: 1,
    value: {
      1: 1
    },
    price: {},
    cardColor: 1,
    numberPlayer: [3, 5]
  },
  {
    name: "Filon",
    age: 1,
    value: {
      4: 1
    },
    price: {},
    cardColor: 1,
    numberPlayer: [3, 4]
  },
  {
    name: "Friche",
    age: 1,
    value: {
      1: 1,
      2: 1
    },
    price: {
      "gold": 1
    },
    cardColor: 1,
    numberPlayer: [6]
  },
  {
    name: "Excavation",
    age: 1,
    value: {
      1: 1,
      3: 1
    },
    price: {
      "gold": 1
    },
    cardColor: 1,
    numberPlayer: [4]
  },
  {
    name: "Fosse Argileuse",
    age: 1,
    value: {
      1: 1,
      4: 1
    },
    price: {
      "gold": 1
    },
    cardColor: 1,
    numberPlayer: [3]
  },
  {
    name: "Exploitation Forestière",
    age: 1,
    value: {
      3: 1,
      2: 1
    },
    price: {
      "gold": 1
    },
    cardColor: 1,
    numberPlayer: [3]
  },
  {
    name: "Gisement",
    age: 1,
    value: {
      2: 1,
      4: 1
    },
    price: {
      "gold": 1
    },
    cardColor: 1,
    numberPlayer: [5]
  },
  {
    name: "Mine",
    age: 1,
    value: {
      4: 1,
      3: 1
    },
    price: {
      8: 1
    },
    cardColor: 1,
    numberPlayer: [6]
  },
  {
    name: "Metier à tisser",
    age: 1,
    value: {
      6: 1
    },
    price: {},
    cardColor: 2,
    numberPlayer: [3, 6]
  },
  {
    name: "Verrerie",
    age: 1,
    value: {
      5: 1
    },
    price: {},
    cardColor: 2,
    numberPlayer: [3, 6]
  },
  {
    name: "Presse",
    age: 1,
    value: {
      7: 1
    },
    price: {},
    cardColor: 2,
    numberPlayer: [3, 6]
  },
  {
    name: "Prêteur sur gages",
    age: 1,
    value: {
      7: 1
    },
    price: {},
    cardColor: 2,
    numberPlayer: [3, 6]
  },
  {
    name: "Prêteur sur gages",
    age: 1,
    value: 3,
    price: {},
    cardColor: 2,
    numberPlayer: [4, 7]
  },
  {
    name: "Bains",
    age: 1,
    value: 3,
    price: {
      3: 1
    },
    cardColor: 3,
    numberPlayer: [3, 7]
  },
  {
    name: "Autel",
    age: 1,
    value: 2,
    price: {},
    cardColor: 3,
    numberPlayer: [3, 5]
  },
  {
    name: "Theatre",
    age: 1,
    value: 2,
    price: {},
    cardColor: 3,
    numberPlayer: [3, 6]
  },
  {
    name: "Taverne",
    age: 1,
    value: {
      8: 5
    },
    price: {},
    cardColor: 4,
    numberPlayer: [4, 5, 7]
  },
  {
    name: "Comptoir Est",
    age: 1,
    value: {
      1: 1,
      3: 1,
      2: 1,
      4: 1,
      right: true,
      left: false
    },
    price: {},
    cardColor: 4,
    numberPlayer: [3, 7]
  },
  {
    name: "Comptoir Ouest",
    age: 1,
    value: {
      1: 1,
      3: 1,
      2: 1,
      4: 1,
      right: false,
      left: true
    },
    price: {},
    cardColor: 2,
    numberPlayer: [3, 7]
  },
  {
    name: "Marché",
    age: 1,
    value: {
      5: 1,
      6: 1,
      7: 1,
      right: true,
      left: true
    },
    price: {},
    cardColor: 4,
    numberPlayer: [3, 6]
  },
  {
    name: "Palissade",
    age: 1,
    value: 1,
    price: {
      2: 1
    },
    cardColor: 5,
    numberPlayer: [3, 7]
  },
  {
    name: "Caserne",
    age: 1,
    value: 1,
    price: {
      4: 1
    },
    cardColor: 5,
    numberPlayer: [3, 5]
  },
  {
    name: "Tour de Garde",
    age: 1,
    value: 1,
    price: {
      1: 1
    },
    cardColor: 5,
    numberPlayer: [3, 4]
  },
  {
    name: "Officine",
    age: 1,
    value: 1,
    price: {
      6: 1
    },
    cardColor: 6,
    numberPlayer: [3, 5]
  },
  {
    name: "Atelier",
    age: 1,
    value: 2,
    price: {
      5: 1
    },
    cardColor: 6,
    numberPlayer: [3, 5]
  },
  {
    name: "Scriptorium",
    age: 1,
    value: 2,
    price: {
      7: 1
    },
    cardColor: 6,
    numberPlayer: [3, 4]
  },
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