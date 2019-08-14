const express = require('express');
const router = express.Router();
const Card = require('../models/card')
const Wonder = require('../models/wonder')
const Player = require('../models/player')
const Game = require('../models/game')
const asyncMiddleware = require('../utils/asyncMiddleware');
let game = null

router.get('/',(req, res, next) => {
  if (game) {
    res.json(game)
  }
})

router.post('/init', asyncMiddleware(async (req, res, next) => {
  const players = req.body.players
  game = new Game()

  if (game) {
    
    game.wonders = await Wonder.find()
    
    if (game.wonders.length > 0) {
      const gameInit = game.initGame(players)

      return res.json(true)
    }

    res.json(false)
  }
}))

module.exports = router