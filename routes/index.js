var express = require('express');

// Require the scaper to use in router
let statDriver = require('../public/javascripts/crawler');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'They See Me Balling', numPlayers: 13});
});


router.post('/', function(req, res, next) {
  // Set up
  let players = (req.body.playerName);
  let numberHalf = players.length / 2;
  let leftTeam = players.slice(0, numberHalf);
  let rightTeam = players.slice(numberHalf);
  let teams = [leftTeam, rightTeam];
  let stats;

  stats = statDriver.runStatDriver(teams);
  console.log(stats);

  res.render('index', { title: 'They See Me Balling', numPlayers: 13});
});


module.exports = router;

