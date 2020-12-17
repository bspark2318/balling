const nba = require('nba.js').default;

nba.stats.allPlayers(function(err, res) {
    if (err) {
      console.error(err);
      return;
    }
  
    console.log(res);
  });