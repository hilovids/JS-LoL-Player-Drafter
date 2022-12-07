const pool = document.getElementById("playerPool");
let currentPlayer;
//load this from json file later
let players = [
    {
        "name": "Davis",
        "username": "hilovids",
        "roles": [
            "Jungle"
        ],
        "champs": [
            "nunu",
            "skarner"
        ],
        "emote": "nun.png",
        "icon": "wll.webp"
    },
    {
        "name": "Ethan",
        "username": "Governor021",
        "roles": [
            "Mid",
            "ADC"
        ],
        "champs": [
            "lux",
            "ahri"
        ],
        "emote": "lux.png",
        "icon": "ahri.jpg"
    },
    {
        "name": "Riley",
        "username": "Rilesman725",
        "roles": [
            "Fill"
        ],
        "champs": [
            "warwick",
            "swain"
        ],
        "emote": "warwick.png",
        "icon": "warwick.webp"
    },
    {
        "name": "Lucas",
        "username": "Bluedog0159",
        "roles": [
            "Jungle",
            "Mid",
            "Sup"
        ],
        "champs": [
            "zac"
        ],
        "emote": "zac.webp",
        "icon": "karthas.webp"
    },
    {
        "name": "Joel",
        "username": "ResidentAndrood",
        "roles": [
            "Top",
            "ADC",
            "Jungle"
        ],
        "champs": [
            "irelia",
            "teemo"
        ],
        "emote": "pendab.png",
        "icon": "irelia.webp"
    },
    {
        "name": "Brooks",
        "username": "EndlessMigration",
        "roles": [
            "ADC",
            "Mid"
        ],
        "champs": [
            "tristana",
            "vayne"
        ],
        "emote": "vayne.png",
        "icon": "vay.webp"
    },
    {
        "name": "Breezy",
        "username": "Breezycloud",
        "roles": [
            "ADC",
            "Mid"
        ],
        "champs": [
            "zeri",
            "twitch"
        ],
        "emote": "fidpog.png",
        "icon": "zeri.webp"
    },
    {
        "name": "Billy",
        "username": "The_Lazy_Gam3r",
        "roles": [
            "Fill"
        ],
        "champs": [
            "veigar",
            "seraphine"
        ],
        "emote": "bee.webp",
        "icon": "seraphine.webp"
    },
    {
        "name": "Austin",
        "username": "Mirundaal",
        "roles": [
            "Fill"
        ],
        "champs": [
            "shen",
            "aurelion"
        ],
        "emote": "amumu.webp",
        "icon": "shen.webp"
    },
    {
        "name": "Adam",
        "username": "ProjectPickle",
        "roles": [
            "Fill"
        ],
        "champs": [
            "lux"
        ],
        "emote": "lux.png",
        "icon": "lux.webp"
    }
];

function populatePlayerPool(){
    for(let i = 0; i < players.length; i++){
        let p = document.createElement("div");
        let img = document.createElement("img");
        img.src = `champs/${players[i].icon}`
        img.classList.add("icon");
        p.append(img);
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
        let targetX = getOffset( event.target ).left + (event.target.offsetWidth / 2)
        let targetY = getOffset( event.target ).top + (event.target.offsetHeight / 2)
        spawnParticles(5, targetX, targetY, player.emote)
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

const emoteImage = new Image();
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
let particleArray = [];
const maxSize = 100;
let xOffset = 300;
let yOffset = 50;

class Particle {
    constructor(x,y,emote){
        this.x = x + (Math.random() - .5) * xOffset;
        this.y = y + (Math.random() * yOffset) - (yOffset / 2);
        this.xMomentum = Math.random() * 1.2 - .6;
        this.yMomentum = .5; //Math.random() * 2 - 1;
        this.size = 1 + .5 * Math.random();
        this.opacity = 1;
        this.src = emote;
    }

    draw(){
        context.save();
        context.globalAlpha = this.opacity;
        context.translate(this.x,this.y);
        emoteImage.src = `emotes/${this.src}`;
        context.drawImage(emoteImage, (-emoteImage.width / 4) * this.size, (-emoteImage.height / 4) * this.size, (emoteImage.width / 2) * this.size, (emoteImage.height / 2) * this.size);
        context.restore();
    }

    update(){
        this.opacity -= 0.01;
        this.size -= 0.01;
        this.x += this.xMomentum;
        this.y += this.yMomentum;
    }
}

function spawnParticles(n,x,y,emote){
    console.log(emote);
    console.log(x);
    console.log(y);
    for(let i = 0; i < n; i++){
        particleArray.push(new Particle(x,y,emote));
    }
    console.log(particleArray);
}

function animate(){
    requestAnimationFrame(animate);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context.clearRect(0,0,canvas.width, canvas.height);
    particleArray.forEach(function(particle){
        particle.update();
        particle.draw();
    });
    particleArray = particleArray.filter(function(particle){
        return particle.opacity >= 0.05 && particle.size >= .15;
    })
}

function init(){
    particleArray = [];
}

function getOffset( el ) {
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
          _x += el.offsetLeft - el.scrollLeft;
          _y += el.offsetTop - el.scrollTop;
          el = el.offsetParent;
    }
    return { top: _y, left: _x };
}

init();
animate();

function openCoinFlip(){
    document.getElementById("coinModal").style.display = "block";
    let coin = document.getElementById("coin");
    coin.style.animation = "none";
}

function closeCoinFlip(){
    document.getElementById("coinModal").style.display = "none";
}

function flipCoin(){
    let coin = document.getElementById("coin");
    let p = Math.random();

    coin.style.animation = "none";

    if(p > .5){
        setTimeout(() => {
            coin.style.animation = "spin-heads 3s forwards"
        }, 100);
    }
    else {
        setTimeout(() => {
            coin.style.animation = "spin-tails 3s forwards"
        }, 100);
    }
    disableButton();
}
function disableButton(){
    let flipBtn = document.getElementById("flipButton");
    flipBtn.disabled = true;
    setTimeout(() => {
        flipBtn.disabled = false;
    },3000);
}
