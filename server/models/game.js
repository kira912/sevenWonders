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
  }

  initGame(playersNameList, params = {}) {
    playersNameList.find((name) => {
      const randomWonder = this.wonders[Math.floor(Math.random() * this.wonders.length)]
      let newPlayer = new Player(name, randomWonder)

      this.players.push(newPlayer)
    })

    const cards = Card.find()
    .then((cardsList) => {
      let filterCardsNumberPlayers = cardsList.filter((card) => {
        return card.numberPlayer.includes(this.players.length)
      })

      console.log(filterCardsNumberPlayers.length)
      // cardsList.find((card) => {
      //   if (card.age == 1) {
      //     const max = Math.max(card.numberPlayer)
      //     const numberPlayers = this.players.length 

      //     if (max > numberPlayers) {
      //       console.log(card.numberPlayer)
      //       // continue
      //     }

          
      //     let filter = card.numberPlayer.filter((value) => {
      //       return value <= numberPlayers
      //     })

      //     console.log(filter)
      //   }
      // })
    })

  }

  get wonders() {
    return this._wonders
  }

  set wonders(wonders) {
    this._wonders = wonders
  }
}

module.exports = Game