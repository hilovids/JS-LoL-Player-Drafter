const pool = document.getElementById("playerPool");
let currentPlayer;
let players = [
    {
        name: "Davis",
        username: "hilovids",
        roles: ["Jungle"],
        champs: ["nunu", "mundo"]
    },
    {
        name: "Ethan",
        username: "Governor021",
        roles: ["Mid", "ADC"],
        champs: ["lux", "ahri"]
    },
    {
        name: "Riley",
        username: "Rilesman725",
        roles: ["Fill"],
        champs: ["warwick", "swain"]
    },
    {
        name: "Woodz",
        username: "IIWoodzII",
        roles: ["Top"],
        champs: ["kayle", "darius"]
    },
    {
        name: "Pootis",
        username: "Pootis",
        roles: ["Sup", "Top"],
        champs: ["urgot", "nautilus"]
    },
    {
        name: "Nick",
        username: "birdwatcheryebo",
        roles: ["Sup"],
        champs: ["rell", "morgana"]
    },
    {
        name: "Lucas",
        username: "Bluedog0159",
        roles: ["Jungle"],
        champs: ["zac"]
    },
    {
        name: "Joel",
        username: "ResidentAndroid",
        roles: ["Top", "Jungle"],
        champs: ["irelia", "teemo"]
    },
    {
        name: "Chet",
        username: "ChetMcLovin",
        roles: ["ADC"],
        champs: ["tristana"]
    },
    {
        name: "Brooks",
        username: "Self and Sea",
        roles: ["ADC", "Mid"],
        champs: ["tristana", "vayne"]
    },
    {
        name: "Breezy",
        username: "Breezycloud",
        roles: ["ADC", "Mid"],
        champs: ["zeri", "twitch"]
    },
    {
        name: "Brandon",
        username: "Biotichazard",
        roles: ["Sup", "Top"],
        champs: ["soraka", "ornn"]
    },
    {
        name: "Billy",
        username: "The_Lazy_Gam3r",
        roles: ["Mid"],
        champs: ["veigar", "seraphine"]
    },
    {
        name: "Austin",
        username: "Mirundaal",
        roles: ["Fill"],
        champs: ["shen","aurelion"]
    },
];

function populatePlayerPool(){
    for(let i = 0; i < players.length; i++){
        let p = document.createElement("div");
        //players[i].champs.forEach(async (c) => {
        //    let img = document.createElement("img");
            //fetch(`https://league-of-legends-champions.p.rapidapi.com/champions/en-us?page=0&size=10&name=${c}`)
	        //    .then(response => response.json())
	        //    .then(response => {
            //        console.log(response);
            //        img.src = c[0].node.champion.profile_image.url;
            //    })
	        //    .catch(err => console.error(err));
        //    p.append(img)
        //});
        let par = document.createElement("par");
        p.append(par);
        par.innerText = players[i].name;
        p.id = players[i].name;
        p.classList.add("draftable");
        p.classList.add("draggable");
        p.draggable = true;
        p.addEventListener("drag", (event) => {
            console.log("hextech drag");
            currentPlayer = players[i];
        });
        pool.appendChild(p);
    }
}
populatePlayerPool();
const playerBoxes = Array.from(document.getElementsByClassName("playerBox"));
playerBoxes.forEach((b) => {
    b.addEventListener("dragover", (event) => {
        event.preventDefault();
    });
    b.addEventListener("drop", (event) => {
        event.preventDefault();
        let player = currentPlayer;
        let newElement = document.createElement("div");
        newElement.id = event.target.id;
        if(newElement.id == "red1"){
            newElement.classList.add("redCaptain");
        }
        else if (newElement.id == "blu1"){
            newElement.classList.add("blueCaptain");
        } 
        else {
            newElement.classList.add("filledPlayerBox");
        }
        newElement.innerHTML = createHTML(player);
        event.target.parentNode.replaceChild(newElement, event.target);
        document.getElementById(player.name).remove();
    });
});

function createHTML(player){
    console.log(player);
    return `
    <h2 class="playerName">
        ${player.name}
    </h2>
    <h3 class="username">
        ${player.username}
    </h3>
    <div class="roles">
        ${
            player.roles.map((r) => {
                switch(r){
                    case("ADC"):
                        return `<img src="img/i_bot.webp" class="roleIcon">`;
                    case("Sup"):
                        return `<img src="img/i_sup.webp" class="roleIcon">`;
                    case("Mid"):
                        return `<img src="img/i_mid.webp" class="roleIcon">`;
                    case("Jungle"):
                        return `<img src="img/i_jungle.png" class="roleIcon">`;
                    case("Top"):
                        return `<img src="img/i_top.webp" class="roleIcon">`;
                    case("Fill"):
                        return `<img src="img/i_fill.webp" class="roleIcon">`;
                    default:
                        return ``;
                }
            }).join('')
        }
    </div>
    <div class="champs">
    
    </div>
    `;
}