const express = require('express');
const { stat } = require('fs');
const { result } = require('lodash');
const url = require('url');

// Require the scaper to use in router
let statDriver = require('../public/javascripts/crawler');
var router = express.Router();
var numPlayers = 13;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'They See Me Balling', numPlayers: numPlayers});
});


router.post('/', function(req, res, next) {
  // Set up
  let players = req.body.playerName;
  let managers = req.body.managerName;
  let numberHalf = players.length / 2;
  let leftTeam = players.slice(0, numberHalf);
  let rightTeam = players.slice(numberHalf);
  let arg = [leftTeam, rightTeam];

  // Passing Session data
  let sessionData;
  sessionData = req.session;
  sessionData.arg = {arg};
  sessionData.managers = managers; 
  sessionData.redirectUrl = '/balling';
  
  res.redirect('/loading');
});


router.get('/loading', function(req, res) {
  res.render('loading');
})

let loadingPostArguments = {
  '/balling': statDriver.runStatDriver,
  '2': placeHolder,
};

function placeHolder (hello) {
  console.log("Nothing happens");
}

router.post('/loading', async function(req, res) {
  let arg = req.session.arg.arg;
  let redirectUrl = req.session.redirectUrl;
  let functionChoice = loadingPostArguments[redirectUrl];
  let resultStats = await functionChoice(arg);
  req.session.stats = resultStats;
  res.redirect(redirectUrl);
})

router.get('/balling', function(req, res) {
    // Set up
    let statMap = { "trb_per_g": "Rebounds", "ast_per_g": "Assists", "blk_per_g": "Blocks", "stl_per_g": "Steals", "fg3_per_g": "Three Pointers", "pts_per_g": "Points", "fg_percentage": "Field Goal %", "ft_percentage": "Free Throw %"};
    let resultStats = req.session.stats;
    let managers = req.session.managers;
    let leftManager = managers[0] === "" ? "Home Team" : managers[0] + "'s Team";
    let rightManager = managers[1] === "" ? "Away Team" : managers[1] + "'s Team";
    let statCategories = ["Points", "Assists", "Three Pointers", "Steals", "Free Throw %", "Rebounds", "Blocks", "Field Goal %" ];  
    let leftTeam = reMapStats(resultStats[0], statCategories, statMap);
    let rightTeam = reMapStats(resultStats[1], statCategories, statMap);
    let numCategories = statCategories.length;
    let context = {numCategories: numCategories, statCategories: statCategories, leftManager: leftManager, rightManager: rightManager, leftTeam: leftTeam, rightTeam:rightTeam};
    //let context = {numCategories: numCategories, statCategories: statCategories, leftManager: "leftManager", rightManager: "rightManager", leftTeam: [1,2,3,4,5,6,7,8], rightTeam: [0, 1,2,3,4,5,6,7]};
    res.render('balling', context);
})


function reMapStats(stats, statCategories, statMap) {
  let newStatMap = {};
  let newCat, newValue;
  
  for (const [key, value] of Object.entries(stats)) {
    newCat = statMap[key];
    newStatMap[newCat] = value;
  }

  let newStatList = [];
  
  statCategories.forEach( (item, index) => {
    newValue = Number(newStatMap[item]).toFixed(2);
    newStatList.push(newValue);
  }) 

  return newStatList;
}

module.exports = router;

