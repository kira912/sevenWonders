const express = require('express');
const router = express.Router();
const Card = require('../models/card')
const Wonder = require('../models/wonder')
const Player = require('../models/player')
const Game = require('../models/game')
const asyncMiddleware = require('../utils/asyncMiddleware');
let game = null

router.get('/',(req, res, next) => {
  return game ? res.json(game) : res.json(false)
})

router.post('/init', asyncMiddleware(async (req, res, next) => {
  const players = req.body.players
  game = new Game()

  if (game) {
    
    game.wonders = await Wonder.find()
    
    if (game.wonders.length > 0) {
      let gameInit = await game.initGame(players)

      
      return gameInit ? res.json(true) : res.json(false)
    }
  }
  return res.json(false)
}))

// router.get('/players', asyncMiddleware(async (req, res, next) => {
//   res.json(game.players)
// }))

module.exports = router