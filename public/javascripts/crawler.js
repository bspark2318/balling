const {Builder, By, Key, until, WebDriver} = require("selenium-webdriver");
const _ = require('lodash');
const axios = require('axios');
const cheerio = require('cheerio');
const { sortedLastIndexOf } = require("lodash");


async function enterWebsite() {
  let driver = await new Builder().forBrowser('chrome').build();
  let dataDict = {'trb_per_g' : 0, 'ast_per_g' : 0, 'blk_per_g' : 0, 'stl_per_g' : 0, 'fg3_per_g' : 0, 'fg_per_g' : 0,'fga_per_g' : 0, 'ft_per_g' : 0,'fta_per_g' : 0, 'pts_per_g': 0};
  let playerList = ['Lebron James', "Anthony Davis", "James Harden"]; 
  await driver.get('https://www.basketball-reference.com/');
  dataDict = await runForLoop(dataDict, driver, playerList);
  // dataDict = await calculateStats(dataDict);
  dataDict = await calculateStats(dataDict);
  console.log(dataDict);
  console.log("Did this run?");
  await driver.quit();
}

// Synchronous Asynchronous for loop for reading players' stats
async function runForLoop(dataDict, driver, playerList) {
    for (let i = 0; i < playerList.length; i++) {
      let player = playerList[i];
      await driver.findElement(By.name('search')).sendKeys(player, Key.RETURN);
        let xpath = "//div[@class='search-item-name']/strong/a";

        await driver.wait(until.elementLocated(By.name('search')));
        //await setTimeout(() => {console.log("clap")}, 2000);

        try { 
            let extraStep = await driver.findElement(By.xpath(xpath));
            await extraStep.click();
        }
        catch (e){
          console.log(e)
          console.log('Go direct to the page');
        }
        let currentURL = await driver.getCurrentUrl();
        
        await crawlStats(currentURL, dataDict);
        console.log(dataDict);
    }
    return dataDict;
}


async function crawlStats(url, dataDict){
  console.log(`Crawling stats of ${url}`);
    const html = await axios.get(url);
        let $ = cheerio.load(html.data);
        let $dataTable = $("#per_game");
        let gamesPlayed = 0;
        let dataYear = 2021;

        while (gamesPlayed <= 20) {
            dataYear -= 1; 
            dataRow = $dataTable.find(`tr[id="per_game.${dataYear}"]`);
            gamesPlayed = dataRow.find('td[data-stat="g"]').text();    
        }   
        
        let dataEntries = dataRow.children();
        gatherStats(dataEntries, dataDict);
}

function calculateStats(dataDict) {

    function calculatePercentage (arg1, arg2, newName, dataDict) {
        let statOne = dataDict[arg1];
        let statTwo = dataDict[arg2];

        delete dataDict[arg1];
        delete dataDict[arg2];

        let newStat = statOne / statTwo;
        dataDict[newName] = newStat;
    }
    calculatePercentage("fg_per_g", "fga_per_g", "fg_percentage", dataDict);
    calculatePercentage("ft_per_g", "fta_per_g", "ft_percentage", dataDict);
    
    return dataDict;
}

function gatherStats(entries, dataDict) {    
    let data, statCategory;
    // Gather Stats
    entries.each((index, entry) => {
        statCategory = entry.attribs['data-stat'];
        if (statCategory in dataDict) {
            data = (entry.children[0].data);
            if (data === undefined) {
                data = unravelChild(entry);
            }    
            data = Number(data);
            dataDict[statCategory] += data; 
        }
        });
    };


function unravelChild(parent) {
    return parent.children[0].children[0].data;
}


enterWebsite();