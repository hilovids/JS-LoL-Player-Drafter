let answers = ["team fight dance", 
"deathless game", 
"missed wall flash", 
"invade kill", 
"nick doesn't pick rell", 
"solo baron", 
"sup beats adc for damage", 
"captains 1v1", 
"pentakill", 
"stolen pentakill",
"nunu and willump",
"stolen dragon",
"ethan ganks bot lane",
"brandon goes afk for work",
"pootis first draft",
"joel ping spike",
"unexpected champ pick",
"anyone is executed",
"someone forgets to buy",
"hook fail",
"jungle dies to jungle",
"winions take a tower or inhib",
"heated gamers",
"someone bans a one-trick",
"trolling",
"someone pauses the game",
"lean reference",
"ult misclick",
"misnaming a champion",
"stolen gromp"
];

function populateGrid(){
    let bingoGrid = document.getElementById("bingoGrid");
    for(let i = 0; i < 25; i++){
        let space = document.createElement("h2");
        space.classList.add("gridItem");
        space.addEventListener("click",() => {
            space.classList.toggle("filledSpace");
        })
        if(i == 12){
            space.innerText = "FREE SPACE";
            space.classList.add("filledSpace");
        } 
        else {
            let random = Math.floor(Math.random() * answers.length);
            let el = answers.splice(random, 1)[0];
            space.innerText = el;
        }
        bingoGrid.appendChild(space);
    }
}
populateGrid();