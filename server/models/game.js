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

    const cardsAge1 = await Card.find({
      age: 1,
      numberPlayer: {
        $lte: this.players.length
      }
    })

    if ((cardsAge1.length - 1) % this.players.length === 0) {

      this.players.forEach((player) => {
        let shuffled = [...cardsAge1.sort(() => 0.5 - Math.random())]
        player.addDeck(shuffled.splice(0, 7))
      })
      
      const distribSuccess = this.distribCardsSuccess(cardsAge1)
      
      if (!distribSuccess) {
        return false
      }

      this.isInit = true

      return true
    }

    return false
  }

  distribCardsSuccess(cards) {
    const mapDeckPlayers = this.players.map((player) => player.deck)
    let badDistrib = false

    // mapDeckPlayers[1] = []
    mapDeckPlayers.forEach((deck) => {
      if (deck.length != (cards.length - 1) / this.players.length) {
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