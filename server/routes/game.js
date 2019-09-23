const express = require('express');
const router = express.Router();
const Card = require('../models/card')
const wonders = require('../bin/wonders.json')
const Player = require('../models/player')
const Game = require('../models/game')
const asyncMiddleware = require('../utils/asyncMiddleware');
let game = null

router.get('/',(req, res, next) => {
  return game 
    ? res.json(game) 
    : res.json(false)
})

router.post('/init', asyncMiddleware(async (req, res, next) => {
  const players = req.body.players
  game = new Game()

  if (game) {
    
    game.wonders = wonders
    
    if (game.wonders.length > 0) {
      let gameInit = await game.initGame(players)
      
      return gameInit
        ? res.json(true)
        : res.json(false)
    }
  }
  return res.json(false)
}))

router.post('/player/buildCard', asyncMiddleware(async (req, res, next) => {
  let player = game.players.find(player => player.name == req.body.playerName)

  if (player) {
    let card = player.deck.find(card => card._id == req.body.cardId)

    if (card) {
      player.buildCard(card)
      // console.log(player)
    }
  }
  return player
}))

module.exports = router