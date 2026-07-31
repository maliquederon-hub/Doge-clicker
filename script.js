let coins = 0;
let totalCoins = 0;

let coinsPerClick = 1;
let coinsPerSecond = 0;

// Costs
let clickCost = 10;
let workerCost = 50;
let farmCost = 200;
let factoryCost = 1000;
let bankCost = 5000;

// Owned
let betterDogeOwned = 0;
let workersOwned = 0;
let farmsOwned = 0;
let factoriesOwned = 0;
let banksOwned = 0;

// Elements
const coinCount = document.getElementById("coinCount");
const dogeButton = document.getElementById("dogeButton");

const clickUpgrade = document.getElementById("clickUpgrade");
const workerUpgrade = document.getElementById("workerUpgrade");
const farmUpgrade = document.getElementById("farmUpgrade");
const factoryUpgrade = document.getElementById("factoryUpgrade");
const bankUpgrade = document.getElementById("bankUpgrade");

const perClick = document.getElementById("perClick");
const perSecond = document.getElementById("perSecond");

const levelText = document.getElementById("level");
const progressBar = document.getElementById("progressBar");

function formatNumber(num) {
    if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + "B";
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
    return Math.floor(num);
}

function getLevel() {
    return Math.floor(totalCoins / 1000) + 1;
}

function updateDisplay() {
    coinCount.textContent = formatNumber(coins);

    perClick.textContent = coinsPerClick;
    perSecond.textContent = coinsPerSecond;

    clickUpgrade.textContent =
        `Better Doge (+1 click) (Owned: ${betterDogeOwned}) Cost: ${formatNumber(clickCost)}`;

    workerUpgrade.textContent =
        `Doge Worker (+1/sec) (Owned: ${workersOwned}) Cost: ${formatNumber(workerCost)}`;

    farmUpgrade.textContent =
        `Doge Farm (+5/sec) (Owned: ${farmsOwned}) Cost: ${formatNumber(farmCost)}`;

    factoryUpgrade.textContent =
        `Doge Factory (+20/sec) (Owned: ${factoriesOwned}) Cost: ${formatNumber(factoryCost)}`;

    bankUpgrade.textContent =
        `Doge Bank (+100/sec) (Owned: ${banksOwned}) Cost: ${formatNumber(bankCost)}`;

    const level = getLevel();
    levelText.textContent = level;

    const progress = (totalCoins % 1000) / 1000;
    progressBar.style.width = (progress * 100) + "%";
}

function earnCoins(amount) {
    coins += amount;
    totalCoins += amount;
    updateDisplay();
}

dogeButton.addEventListener("click", (event) => {
    earnCoins(coinsPerClick);
    createFloatingCoin(event.clientX, event.clientY);
});

clickUpgrade.addEventListener("click", () => {
    if (coins >= clickCost) {
        coins -= clickCost;
        coinsPerClick += 1;
        betterDogeOwned++;
        clickCost = Math.floor(clickCost * 1.8);
        updateDisplay();
    }
});

workerUpgrade.addEventListener("click", () => {
    if (coins >= workerCost) {
        coins -= workerCost;
        coinsPerSecond += 1;
        workersOwned++;
        workerCost = Math.floor(workerCost * 1.9);
        updateDisplay();
    }
});

farmUpgrade.addEventListener("click", () => {
    if (coins >= farmCost) {
        coins -= farmCost;
        coinsPerSecond += 5;
        farmsOwned++;
        farmCost = Math.floor(farmCost * 2);
        updateDisplay();
    }
});

factoryUpgrade.addEventListener("click", () => {
    if (coins >= factoryCost) {
        coins -= factoryCost;
        coinsPerSecond += 20;
        factoriesOwned++;
        factoryCost = Math.floor(factoryCost * 2.2);
        updateDisplay();
    }
});

bankUpgrade.addEventListener("click", () => {
    if (coins >= bankCost) {
        coins -= bankCost;
        coinsPerSecond += 100;
        banksOwned++;
        bankCost = Math.floor(bankCost * 2.5);
        updateDisplay();
    }
});

setInterval(() => {
    earnCoins(coinsPerSecond);
}, 1000);

function createFloatingCoin(x, y) {
    const coin = document.createElement("div");
    coin.className = "floatingCoin";
    coin.textContent = `+${coinsPerClick}`;
    coin.style.left = x + "px";
    coin.style.top = y + "px";
    document.body.appendChild(coin);
    setTimeout(() => coin.remove(), 1000);
}

updateDisplay();