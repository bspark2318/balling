const _ = require('lodash');
const axios = require('axios');
const cheerio = require('cheerio');

async function crawlStats(){
    var names = [];  
    const html = await axios.get("https://www.washingtonpost.com/graphics/2019/sports/nba-top-100-players-2019/");
    let $ = cheerio.load(html.data);
    let $names = await $(".player-name");
    let nameLength = $names.length;
    console.log(nameLength);
    
    for (let i = 0; i < nameLength; i++) {
        let nameCapsule = $names[i];
        let name = nameCapsule.children[0].data;
        names.push(name); 
    }

    console.log(names);
  }

crawlStats()

