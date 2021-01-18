const {Builder, By, Key, until, WebDriver} = require("selenium-webdriver");
const chrome = require('selenium-webdriver/chrome');
const _ = require('lodash');
const axios = require('axios');
const cheerio = require('cheerio');
const { sortedLastIndexOf } = require("lodash");

async function runStatDriver (teams) {
    let driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().headless()).build();
    // For testing purposes
    //let driver = await new Builder().forBrowser('chrome').build();
    let dataDict; 
    let playerList; 
    let result = [];
  
    await driver.get('https://www.basketball-reference.com/');
    for (i =0 ; i < teams.length ; i ++ ) {
            dataDict = {'trb_per_g' : 0, 'ast_per_g' : 0, 'blk_per_g' : 0, 'stl_per_g' : 0, 'fg3_per_g' : 0, 'fg_per_g' : 0,'fga_per_g' : 0, 'ft_per_g' : 0,'fta_per_g' : 0, 'pts_per_g': 0};
            playerList = teams[i];
            dataDict = await runForLoop(dataDict, driver, playerList);
            // dataDict = await calculateStats(dataDict);
            dataDict = calculateStats(dataDict);
            result.push(dataDict);
    }
    await driver.quit();
    return result;
}  

// Synchronous Asynchronous for loop for reading players' stats
async function runForLoop(dataDict, driver, playerList) {
    for (let i = 0; i < playerList.length; i++) {
      let player = playerList[i];
      await driver.findElement(By.name('search')).sendKeys(player, Key.RETURN);
        let xpath = "//div[@class='search-item-name']/strong/a";

        await driver.wait(until.elementLocated(By.name('search')));

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
    }
    return dataDict;
}


async function crawlStats(url, dataDict){
    console.log("=======================================");
    console.log("Currently crwaling the url of " + url);
    console.log("=======================================");
    const html = await axios.get(url);
        let $ = cheerio.load(html.data);
        let $dataTable = $("#per_game");
        let gamesPlayed = 0;
        let dataYear = 2021;

        while (gamesPlayed <= 10) {
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



async function getWeeklySchedule (teams) {
    let url = 'https://www.espn.com/nba/schedule';    
    const html = await axios.get(url);
    let $ = cheerio.load(html.data);
    let dates = [];
    let weeklySchedule = [];
    let $dates = $(".table-caption");
    for (i = 0 ; i < $dates.length ; i++ ) {   
        $date = $($dates[i]);
        dates.push($date.text());
        
        scheduleContainer = $date.next();
        
        teamName = $date
        
    }
    $day = $($dates[0]);
    console.log($day.next());
    
}




getWeeklySchedule([]);




exports.runStatDriver = runStatDriver;




{/* <div class="lr-imso-scroll GVj7ae imso-medium-font qJnhT imso-ani" aria-level="3" role="heading" jsname="sT19N" style="">내일</div>
<div aria-level="3" role="heading" jsname="sT19N" class="GVj7ae imso-medium-font qJnhT imso-ani" style="">1. 19. (화)</div>







body table class KAIX8d
team     but not td         /m/0jmgb    
date <div class="imspo_mt__pm-inf imspo_mt__pm-infc imspo_mt__date imso-medium-font">내일</div>     imspo_mt__date
 */}

