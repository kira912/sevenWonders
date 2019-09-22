const Wonder = require('../models/wonder')
const Player = require('../models/player')
const Card = require('../models/card')

class Game {
  constructor() {
    this.gold = 200
    this.tokenConflicts = 50
    this.players = []
    this.wonders = []
    this.isInit = false
    this.cards = {
      age1: [],
      age2: [],
      age3: []
    }
    this.trashCards = []
  }

  async initGame(playersNameList, params = {}) {
    try {
      playersNameList.forEach((name) => {
        const randomWonder = this.wonders[Math.floor(Math.random() * this.wonders.length)]
        let newPlayer = new Player(name, randomWonder)
  
        this.players.push(newPlayer)
      })
  
      this.cards.age1 = await Card.find({
        age: 1,
        numberPlayer: {
          $lte: this.players.length
        }
      })
  
      if ((this.cards.age1.length) % this.players.length === 0) {
  
        this.players.forEach((player) => {
          this.cards.age1.sort(() => 0.5 - Math.random())
          player.addDeck(this.cards.age1.splice(0, 7))
        })
        
        const distribSuccess = this.distribCardsSuccess(this.cards.age1)
        
        if (!distribSuccess) {
          return false
        }
  
        this.isInit = true
  
        return true
      }
    } catch (error) {
     
      console.log(error)
      return false
    }
  }

  initAge(age) {
    let cardsAge = this.cards["age" + age]
    Card.find({
      age: age,
      numberPlayer: {
        $lte: this.players.length
      }
    }).then((cards) => {
      cardsAge = cards
    })
    .catch((err) => {
      console.log(err)
    })

    if ((cardsAge.length) % this.players.length === 0) {
      this.players.forEach((player) => {
        cardsAge.sort(() => 0.5 - Math.random())
        player.addDeck(cardsAge.splice(0, 7))
      })

      const distribSuccess = this.distribCardsSuccess(cardsAge)

      if (!distribSuccess) {
        return false
      }

      return true
    }

    return false
  }

  switchDeck(age) {
    
    for (let [i, player] of this.players.entries()) {
      let rightPlayer = this.players[i - 1] 
        ? this.players[i - 1] 
        : this.players[this.players.length - 1]
  
      let leftPlayer = this.players[i + 1] 
        ? this.players[i + 1]
        : this.players[0]
  
      // console.log(player.name, player.deck, rightPlayer.tmpDeck, leftPlayer.tmpDeck)
      if (1 == age || 3 == age) {
        player.tmpDeck = new Map()
        player.tmpDeck.set("oldDeck", player.deck)
        player.tmpDeck.set("newDeck", rightPlayer.deck)
        player.deck = rightPlayer.tmpDeck
          ? rightPlayer.tmpDeck.get("oldDeck")
          : rightPlayer.deck
        // console.log("Deck player", player.name, player.tmpDeck)
      }
    }
  }

  endAgeMakeWar(age) {

    const ageMilitaryPoints = { 1: 1, 2: 3, 3: 5 }

    for (let [i, player] of this.players.entries()) {

      let shields = player.getShieldsForWar()

      let rightPlayer = this.players[i + 1] ? this.players[i + 1] : this.players[0]
      let leftPlayer = this.players[i - 1] ? this.players[i - 1] : this.players[this.players.length - 1]

      if (rightPlayer && leftPlayer) {
        if (shields > rightPlayer.getShieldsForWar() && shields > leftPlayer.getShieldsForWar()) {
          player.addMilitaryScore(ageMilitaryPoints[age] * 2)
        }

        if (shields < rightPlayer.getShieldsForWar() || shields < leftPlayer.getShieldsForWar()) {
          player.removeMilitaryScore(1)
        }

        if (shields == rightPlayer.getShieldsForWar() || shields == leftPlayer.getShieldsForWar()) {
          continue
        }
      }
    }
  }

  distribCardsSuccess(cards) {
    const mapDeckPlayers = this.players.map((player) => player.deck)
    let badDistrib = false

    // mapDeckPlayers[1] = []
    mapDeckPlayers.forEach((deck) => {
      if (deck.length != (cards.length) / this.players.length) {
        badDistrib = true
      }
    })

    return !badDistrib ? true : false 
  }

  get wonders() {
    return this._wonders
  }

  set wonders(wonders) {
    this._wonders = wonders
  }
}

module.exports = Game