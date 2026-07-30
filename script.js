let coins = 0;
let coinsPerClick = 1;
let coinsPerSecond = 0;

// Costs
let clickCost = 10;
let workerCost = 50;
let farmCost = 200;
let factoryCost = 1000;

// Owned counters
let betterDogeOwned = 0;
let workersOwned = 0;
let farmsOwned = 0;
let factoriesOwned = 0;

// Elements
const coinCount = document.getElementById("coinCount");
const dogeButton = document.getElementById("dogeButton");

const clickUpgrade = document.getElementById("clickUpgrade");
const workerUpgrade = document.getElementById("workerUpgrade");
const farmUpgrade = document.getElementById("farmUpgrade");
const factoryUpgrade = document.getElementById("factoryUpgrade");

const perClick = document.getElementById("perClick");
const perSecond = document.getElementById("perSecond");

function updateDisplay() {
    coinCount.textContent = Math.floor(coins);

    perClick.textContent = coinsPerClick;
    perSecond.textContent = coinsPerSecond;

    clickUpgrade.textContent =
        `Better Doge (+1 click) (Owned: ${betterDogeOwned}) Cost: ${clickCost}`;

    workerUpgrade.textContent =
        `Doge Worker (+1/sec) (Owned: ${workersOwned}) Cost: ${workerCost}`;

    farmUpgrade.textContent =
        `Doge Farm (+5/sec) (Owned: ${farmsOwned}) Cost: ${farmCost}`;

    factoryUpgrade.textContent =
        `Doge Factory (+20/sec) (Owned: ${factoriesOwned}) Cost: ${factoryCost}`;
}

// Click Doge
dogeButton.addEventListener("click", (event) => {
    coins += coinsPerClick;
    updateDisplay();
    createFloatingCoin(event.clientX, event.clientY);
});

// Better Doge
clickUpgrade.addEventListener("click", () => {
    if (coins >= clickCost) {
        coins -= clickCost;
        coinsPerClick += 1;
        betterDogeOwned++;
        clickCost = Math.floor(clickCost * 1.8);
        updateDisplay();
    }
});

// Worker
workerUpgrade.addEventListener("click", () => {
    if (coins >= workerCost) {
        coins -= workerCost;
        coinsPerSecond += 1;
        workersOwned++;
        workerCost = Math.floor(workerCost * 1.9);
        updateDisplay();
    }
});

// Farm
farmUpgrade.addEventListener("click", () => {
    if (coins >= farmCost) {
        coins -= farmCost;
        coinsPerSecond += 5;
        farmsOwned++;
        farmCost = Math.floor(farmCost * 2);
        updateDisplay();
    }
});

// Factory
factoryUpgrade.addEventListener("click", () => {
    if (coins >= factoryCost) {
        coins -= factoryCost;
        coinsPerSecond += 20;
        factoriesOwned++;
        factoryCost = Math.floor(factoryCost * 2.2);
        updateDisplay();
    }
});

// Passive income
setInterval(() => {
    coins += coinsPerSecond;
    updateDisplay();
}, 1000);

// Floating +coin text
function createFloatingCoin(x, y) {
    const coin = document.createElement("div");

    coin.className = "floatingCoin";
    coin.textContent = `+${coinsPerClick}`;

    coin.style.left = x + "px";
    coin.style.top = y + "px";

    document.body.appendChild(coin);

    setTimeout(() => coin.remove(), 1000);
}

// Save
function saveGame() {
    localStorage.setItem("dogeCoins", coins);
    localStorage.setItem("dogePerClick", coinsPerClick);
    localStorage.setItem("dogePerSecond", coinsPerSecond);

    localStorage.setItem("clickCost", clickCost);
    localStorage.setItem("workerCost", workerCost);
    localStorage.setItem("farmCost", farmCost);
    localStorage.setItem("factoryCost", factoryCost);

    localStorage.setItem("betterDogeOwned", betterDogeOwned);
    localStorage.setItem("workersOwned", workersOwned);
    localStorage.setItem("farmsOwned", farmsOwned);
    localStorage.setItem("factoriesOwned", factoriesOwned);
}

// Load
function loadGame() {
    coins = Number(localStorage.getItem("dogeCoins")) || 0;
    coinsPerClick = Number(localStorage.getItem("dogePerClick")) || 1;
    coinsPerSecond = Number(localStorage.getItem("dogePerSecond")) || 0;

    clickCost = Number(localStorage.getItem("clickCost")) || 10;
    workerCost = Number(localStorage.getItem("workerCost")) || 50;
    farmCost = Number(localStorage.getItem("farmCost")) || 200;
    factoryCost = Number(localStorage.getItem("factoryCost")) || 1000;

    betterDogeOwned = Number(localStorage.getItem("betterDogeOwned")) || 0;
    workersOwned = Number(localStorage.getItem("workersOwned")) || 0;
    farmsOwned = Number(localStorage.getItem("farmsOwned")) || 0;
    factoriesOwned = Number(localStorage.getItem("factoriesOwned")) || 0;

    updateDisplay();
}

setInterval(saveGame, 1000);

loadGame();// WOW Coin System
const wowCoin = document.getElementById("wowCoin");
const wowText = document.getElementById("wowText");
const wowSound = document.getElementById("wowSound");

let wowVisible = false;

function spawnWowCoin() {
    if (wowVisible) return;

    wowVisible = true;

    const x = Math.random() * (window.innerWidth - 100);
    const y = Math.random() * (window.innerHeight - 100);

    wowCoin.style.left = x + "px";
    wowCoin.style.top = y + "px";
    wowCoin.style.display = "block";

    setTimeout(() => {
        wowCoin.style.display = "none";
        wowVisible = false;
    }, 5000);
}

wowCoin.addEventListener("click", () => {
    coins += 100;
    updateDisplay();

    wowCoin.style.display = "none";
    wowVisible = false;

    wowText.style.display = "block";

    if (wowSound) {
        wowSound.currentTime = 0;
        wowSound.play();
    }

    setTimeout(() => {
        wowText.style.display = "none";
    }, 1000);
});

function scheduleWowCoin() {
    const delay = Math.random() * 25000 + 20000;

    setTimeout(() => {
        spawnWowCoin();
        scheduleWowCoin();
    }, delay);
}

scheduleWowCoin();