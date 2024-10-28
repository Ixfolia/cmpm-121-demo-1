"use strict";

// -- Variables -- //
var app = document.querySelector("#app");
var header = document.createElement("h1");
var gameName = "Money Maker";
var button = document.createElement("button");
button.className = "main-button"; // Add CSS class to main button
var purchaseItems = [
    {
        name: "Investment",
        cost: 10,
        rate: 0.1,
        count: 0,
        priceIncreaseFactor: 1.15,
        description: "Invest to earn more money",
    },
    {
        name: "Small Business",
        cost: 100,
        rate: 2.0,
        count: 0,
        priceIncreaseFactor: 1.15,
        description: "Run a small business to earn even more money",
    },
    {
        name: "Corporation",
        cost: 1000,
        rate: 50.0,
        count: 0,
        priceIncreaseFactor: 1.15,
        description: "Run a corporation to earn a lot of money",
    },
    {
        name: "Bank",
        cost: 10000,
        rate: 500.0,
        count: 0,
        priceIncreaseFactor: 1.15,
        description: "Own a bank to earn a huge amount of money",
    },
    {
        name: "Country",
        cost: 100000,
        rate: 5000.0,
        count: 0,
        priceIncreaseFactor: 1.15,
        description: "Own a country to earn an enormous amount of money",
    },
];
var counter = 0;
var growthRate = 0;
var counterDisplay = document.querySelector("#counter-display");
var growthRateDisplay = document.createElement("div");
// -- Set HTML Element Properties -- //
header.innerHTML = gameName;
button.innerHTML = "Click the Bank 💰";
// Title
document.title = gameName;
// -- Functions -- //
app.append(header);
app.append(button);
app.append(growthRateDisplay);
function updateCounter() {
    counter++;
    updateDisplay();
}
function updateDisplay() {
    counterDisplay.textContent = "".concat(counter.toFixed(2), " dollars \uD83D\uDCB0"); // Display the updated counter with 2 decimal places
    growthRateDisplay.textContent = "".concat(growthRate.toFixed(2), " dollars/sec");
    purchaseItems.forEach(function (item) {
        var button = document.querySelector("button[data-name=\"".concat(item.name, "\"]"));
        var itemCountDisplay = document.querySelector("div[data-name=\"".concat(item.name, "\"]"));
        button.disabled = counter < item.cost; // Disable the purchase button if the counter is less than the cost
        button.innerHTML = "Purchase ".concat(item.name, " for ").concat(item.cost.toFixed(2), " dollars"); // Update the button text with the new cost
        itemCountDisplay.textContent = "[".concat(item.name, ": ").concat(item.count, "]");
    });
}
// Add event listener to the button, updates the counter in HTML
button.addEventListener("click", updateCounter);
// Create purchase buttons and add event listeners
purchaseItems.forEach(function (item) {
    var purchaseButton = document.createElement("button");
    purchaseButton.innerHTML = "Purchase ".concat(item.name, " for ").concat(item.cost, " dollars");
    purchaseButton.dataset.name = item.name;
    purchaseButton.className = "purchase-button"; // Add CSS class to purchase buttons
    app.append(purchaseButton);
    var itemDescription = document.createElement("div");
    itemDescription.textContent = item.description;
    app.append(itemDescription);
    var itemCountDisplay = document.createElement("div");
    itemCountDisplay.dataset.name = item.name;
    app.append(itemCountDisplay);
    purchaseButton.addEventListener("click", function () {
        if (counter >= item.cost) {
            counter -= item.cost;
            growthRate += item.rate;
            item.count++;
            item.cost *= item.priceIncreaseFactor; // Increase the cost of the item
            updateDisplay();
        }
    });
});
// Increment the counter based on time elapsed
var lastTime = performance.now();
function incrementCounter(time) {
    var deltaTime = time - lastTime;
    counter += (deltaTime / 1000) * growthRate; // Increment by the fraction of a second that has passed, multiplied by the growth rate
    updateDisplay();
    lastTime = time;
    requestAnimationFrame(incrementCounter);
}
requestAnimationFrame(incrementCounter);
