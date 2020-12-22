alert("hello");


// var playerNames = [
//     'Kawhi Leonard',      'Giannis Antetokounmpo', 'Stephen Curry',
//     'LeBron James',       'James Harden',          'Nikola Jokic',
//     'Joel Embiid',        'Damian Lillard',        'Anthony Davis',
//     'Paul George',        'Rudy Gobert',           'Kyrie Irving',
//     'Draymond Green',     'Jimmy Butler',          'Karl-Anthony Towns',
//     'Russell Westbrook',  'Blake Griffin',         'LaMarcus Aldridge',
//     'Bradley Beal',       'Ben Simmons',           'Chris Paul',
//     'Pascal Siakam',      'Jrue Holiday',          'Al Horford',
//     'Kemba Walker',       'Khris Middleton',       'CJ McCollum',
//     'Luka Doncic',        'Kyle Lowry',            'Mike Conley',
//     'Nikola Vucevic',     'Clint Capela',          'Donovan Mitchell',
//     'DeMar DeRozan',      'Andre Drummond',        "De'Aaron Fox",
//     'Kristaps Porzingis', 'Victor Oladipo',        'Devin Booker',
//     'Kevin Love',         'Danilo Gallinari',      'Jamal Murray',
//     'Tobias Harris',      'Myles Turner',          'Steven Adams',
//     'Jayson Tatum',       'Buddy Hield',           'Otto Porter Jr.',
//     'Montrezl Harrell',   'Paul Millsap',          'John Collins',
//     'Lou Williams',       'Eric Bledsoe',          "D'Angelo Russell",
//     'Brook Lopez',        'Marc Gasol',            'Domantas Sabonis',
//     'Trae Young',         'Jaylen Brown',          'Klay Thompson',
//     'Lauri Markkanen',    'Serge Ibaka',           'Bojan Bogdanovic',
//     'Josh Richardson',    'Eric Gordon',           'Malcolm Brogdon',
//     'Derrick Favors',     'Gordon Hayward',        'Julius Randle',
//     'Robert Covington',   'Gary Harris',           'Zach LaVine',
//     'Brandon Ingram',     'P.J. Tucker',           'Thaddeus Young',
//     'Aaron Gordon',       'JJ Redick',             'Joe Ingles',
//     'Andrew Wiggins',     'Dejounte Murray',       'Spencer Dinwiddie',
//     'Jaren Jackson Jr.',  'Caris LeVert',          'Jonas Valanciunas',
//     'Deandre Ayton',      'Justise Winslow',       'Joe Harris',
//     'Harrison Barnes',    'Ricky Rubio',           'Reggie Jackson',
//     'Jusuf Nurkic',       'Danny Green',           'Jeremy Lamb',
//     'Patrick Beverley',   'Kyle Kuzma',            'Marcus Smart',
//     'Rudy Gay',           'Jeff Teague',           'Derrick White',
//     'Marvin Bagley III'];
  


// function autocomplete(inp, arr){
//     var currentFocus;
//     inp.addEventListener("input", function(e) {
//         var divA, divB, i, val = this.value;
//         closeAllLists();
//         if (!val) { return false; }
//         currentFocus = -1;
//         divA = document.createElement("DIV");
//         divA.setAttribute("id", this.id + "autocomplete-list");
//         divA.setAttribute("class", "autocomplete-items");
//         this.parentNode.appendChild(div);

//         for(i = 0; i < arr.length; i++) {
//             if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
//                 divB = document.createElement("DIV");
//                 divB.innerHTML = "<strong>" arr[i].substr(0, val.length) + "</strong>";
//                 divB.innerHTML += arr[i].substr(val.length);
//                 divB.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
//                     divB.addEventListener("click", function(e) {
//                         inp.value = this.getElementsByTagName("input")[0].value;
//                         closeAllLists();
//                     });
//                     divA.appendChild(divB);
//             }
//         }

//     });
    
//     inp.addEventListener("keydown", function(e) {
//         let x = document.getElementById(this.id + "autocomplete-list");
//         if (x) x = x.getElementsByTagName("div");
//         if (e.keyCode == 40) {
//             currentFocus++;
//             addActive(x);
//         } else if (e.keyCode == 38) {
//             currentFocus--;
//             addActive(x);
//         } else if (e.keyCode == 13) {
//             e.preventDefault();
//             if (currentFocus > -1) {
//                 if (x) x[currentFocus].click();
//             }
//         }
//     });

//     function addActive(x) {
//         if (!x) return false;

//         removeActive(x);
        
//         if (currentFocus >= x.length ) currentFocus = 0 ;
//         if (currentFocus < 0) currentFocus = (x.length - 1);
//         x[currentFocus].classList.add("autocomplete-active");
//     }

//     function removeActive(x) { 
//         for (var i = 0; i < x.length; i++) {
//             x[i].classList.remove("autocomplete-active");
//         }
//     }

//     function closeAllLists(element) {
//         var x = document.getElementsByClassName("autocomplete-items");
//         for (var i= 0 ; i < x.length ; i++) {
//             if (element != x[i] && element != inp) {
//                 x[i].parentNode.removeChild(x[i]);
//             }
//         }
//     }

// document.addEventListener("click", function(e) {
//     closeAllLists(e.target);
// });
// }

// alert("hello world");
// alert("hello world");
// alert("hello world");
// alert("hello world");
// alert("hello world");
// alert("hello world");
// alert("hello world");
// alert("hello world");
// alert("hello world");
// alert("hello world");
// alert("hello world");
// alert("hello world");
// alert("hello world");