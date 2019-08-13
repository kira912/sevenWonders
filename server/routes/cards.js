const express = require('express');
const router = express.Router();
const Card = require('../models/card')
const asyncMiddleware = require('../utils/asyncMiddleware');

router.get('/age1', asyncMiddleware(async (req, res, next) => {
  const cardsAge1 = await Card.find({
    'age': 1
  })

  res.json(cardsAge1)
}));

module.exports = router;
