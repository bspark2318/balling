const express = require('express');
const { result } = require('lodash');
const url = require('url');

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

  let sessionData;
  sessionData = req.session;
  sessionData.teams = {teams};

  
  res.redirect('/loading');
});


router.get('/loading', function(req, res) {
  res.render('loading');
})

router.post('/loading', async function(req, res) {
  let teams = req.session.teams.teams;
  let resultStats = await statDriver.runStatDriver(teams);
  let sessionData = req.session;
  req.session.stats = resultStats;
  res.redirect("/balling");
})

router.get('/balling', function(req, res) {
  let resultStats = req.session.stats;
  console.log(resultStats);
  res.render('balling');
})

module.exports = router;

