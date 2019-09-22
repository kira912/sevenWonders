const Wonder = require('../models/wonder')
const Player = require('../models/player')
const Card = require('../models/card')
const cardsAge1 = require('../bin/cards1.json')
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

      let cardsAge1Filtered = cardsAge1.filter(card => card.age == 1 && card.numberPlayer <= this.players.length)
  
      if ((cardsAge1Filtered.length) % this.players.length === 0) {
  
        this.players.forEach((player) => {
          cardsAge1Filtered.sort(() => 0.5 - Math.random())
          player.addDeck(cardsAge1Filtered.splice(0, 7))
        })
        
        const distribSuccess = this.distribCardsSuccess(cardsAge1Filtered)
        
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
    let cards = this.cards[`age${age}`]

    let cardsFiltered = cards.filter(card => card.age == age && card.numberPlayer <= this.players.length)

    if ((cardsFiltered.length) % this.players.length === 0) {
      this.players.forEach((player) => {
        cardsFiltered.sort(() => 0.5 - Math.random())
        player.addDeck(cardsFiltered.splice(0, 7))
      })

      const distribSuccess = this.distribCardsSuccess(cards)

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
      
      player['tmpDeck'] = new Map()

      if (1 == age || 3 == age) {
        player.tmpDeck.set("oldDeck", player.deck)
        player.tmpDeck.set("newDeck", rightPlayer.deck)
        player.deck = rightPlayer.tmpDeck
          ? rightPlayer.tmpDeck.get("oldDeck")
          : rightPlayer.deck
      }
      
      if (2 == age) {
        player.tmpDeck.set("oldDeck", player.deck)
        player.tmpDeck.set("newDeck", leftPlayer.deck)
        player.deck = leftPlayer.tmpDeck
          ? leftPlayer.tmpDeck.get("oldDeck")
          : leftPlayer.deck
      }
    }

    this.clearTmpDecks()
  }

  clearTmpDecks() {
    for (let player of this.players) {
      player.clearTmpDeck()
    }
  }

  endAgeMakeWar(age) {

    const ageMilitaryPoints = { 1: 1, 2: 3, 3: 5 }

    for (let [i, player] of this.players.entries()) {

      let shields = player.getShieldsForWar()

      let leftPlayer = this.players[i + 1] 
        ? this.players[i + 1] 
        : this.players[0]

      let rightPlayer = this.players[i - 1] 
        ? this.players[i - 1] 
        : this.players[this.players.length - 1]

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

    mapDeckPlayers.forEach((deck) => {
      if (deck.length != (cards.length) / this.players.length) {
        badDistrib = true
      }
    })

    return !badDistrib 
      ? true 
      : false 
  }

  get wonders() {
    return this._wonders
  }

  set wonders(wonders) {
    this._wonders = wonders
  }
}

module.exports = Game