const express = require('express');
const router = express.Router();
const Wonder = require('../models/wonder')
const asyncMiddleware = require('../utils/asyncMiddleware');

/* GET home page. */
router.get('/', asyncMiddleware(async (req, res, next) => {
  const wonders = await Wonder.find()

  res.json(wonders)
}));

module.exports = router;
