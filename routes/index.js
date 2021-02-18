const express = require('express');
const { stat } = require('fs');
const { result } = require('lodash');
const url = require('url');

// Require the scaper to use in router
let crawler = require('../public/javascripts/crawler');

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

router.get('/chat', function(req, res) {
  res.render('chat');
})


let loadingPostArguments = {
  '/balling': crawler.runStatDriver,
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


let allNBATeamsNames = ['Chicago','Houston','Atlanta','Philadelphia','Cleveland','Miami','Brooklyn','Indiana','Washington','New York','Utah','Golden State','LA','Sacramento','Denver','New Orleans','Toronto','Los Angeles','Portland','Boston','Memphis','Milwaukee','Minnesota','Oklahoma City','Phoenix','San Antonio','Detroit','Charlotte','Orlando','Dallas'].sort();
let allNBATeamsIndex = {"Atlanta": 0,  "Boston": 1,   "Brooklyn": 2, "Charlotte": 3,"Chicago": 4,  "Cleveland": 5,"Dallas": 6,"Denver": 7,"Detroit": 8,'Golden State': 9,"Houston": 10,"Indiana": 11,"LA": 12,'Los Angeles': 13,"Memphis": 14,"Miami": 15,"Milwaukee": 16,"Minnesota": 17,'New Orleans': 18,'New York': 19,'Oklahoma City': 20,"Orlando": 21,"Philadelphia": 22,"Phoenix": 23,"Portland": 24,"Sacramento": 25,'San Antonio': 26,"Toronto": 27,"Utah": 28,"Washington": 29};


// Routing for Scheduling
router.get('/schedule', async function(req, res) {
  crawlerResult = await crawler.getWeeklySchedule();
  dates = crawlerResult[0];
  newDates = [];
  dates.forEach((date) => {
    newDates.push(date.split(", "));
  });

  weekSchedule = crawlerResult[1];
  table = createTableStructure(weekSchedule);
  let context = {table: table, dates: newDates, teams: allNBATeamsNames};
  res.render('schedule', context);
})

async function hello () {
  crawlerResult = await crawler.getWeeklySchedule();
  dates = crawlerResult[0];
  newDates = [];
  dates.forEach((date) => {
    newDates.push(date.split(", "));
  });
  return newDates;
}

function createTableStructure (weekSchedule) {
  
  let table = [];
  for (i = 0 ; i <= 30 ; i ++) {
    table.push(Array.apply(null, new Array(7)).map(Number.prototype.valueOf,0));
  }

  let columnIndex = 0;
  weekSchedule.forEach((daySchedule) => {
    daySchedule.forEach(team => {
      rowIndex = allNBATeamsIndex[team] ;
      table[rowIndex][columnIndex] = 1;
    })
    columnIndex ++;
  })
  return table;
}

module.exports = router;

