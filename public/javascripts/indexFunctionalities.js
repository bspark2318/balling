var managerPlayersMap = {"bumsu" : ["Ja Morant", "Jrue Holiday", "Kevin Durant", "Brandon Ingram", "Nikola Jokic", "D'Angelo Russel", "Blake Griffin", "Julius Randle", "Kevin Love", "Buddy Hield", "Gordon Hayward", "Tyler Herro", "DeMarcus Cousin"], 
                        "anthony" : [], 
                        "darren" : [], 
                        "matt" : [],
                        "robin" : [], 
                        "julien" : ["Damian Lillard", "Shai Gilgeous-Alexander", "Jason Taytum", "Giannis Antetokounmpo", "Deandre Ayton", "Ben Simmons", "K OUbre Jr.", "Nikola Vucevic", "Malcom Brogdon", "Duncan Robinson", "TJ Warren", "Hassan Whiteside", "Joe Harris"],
                        "" : ["", "","","","","","","","","","","","",""], 
};


// Autocomplete Forms
    $(document).on("focus", ".playerNameInput", (e) => {
        let targetId = e.target.id;
        let targetElement = document.getElementById(targetId);
        autocomplete(targetElement, playerNames);
      }) 
  
      // Autocomplete Forms
      $(document).on("focus", ".managerNameInput", (e) => {
        let targetId = e.target.id;
        let targetElement = document.getElementById(targetId);
        autocomplete(targetElement, managerNames);
      }) 
  
      //Auto-fill Teams
      $(document).on("change", ".managerNameInput", (e) => {
        let targetId = e.target.id;
        let $target = $("#" + targetId);
        let affiliatedTeam = $target.attr("affiliatedTeam");
        let managerName = $target.val().toLowerCase();
        
        let $playerInputs = $("." + affiliatedTeam);
        
        // If the name is not included, turn everything to blank
        if (!(managerName in managerPlayersMap)) {
            managerName = "";
        }

        let inputValues = managerPlayersMap[managerName];
        let playerName;

        $playerInputs.each((index, inputField) => {
            playerName = inputValues[index];
            inputField.value = playerName;
        })

     });
  