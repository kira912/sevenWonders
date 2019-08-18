const Wonder = require('../models/wonder')
const Player = require('../models/player')
const Card = require('../models/card')

class Game {
  constructor() {
    this.gold = 200
    this.tokenConflicts = 50
    this.players = []
    this.isInit = false
    this.cards = {
      age1: [],
      age2: [],
      age3: []
    }
    this.trashCards = []
  }

  async initGame(playersNameList, params = {}) {
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

    return false
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