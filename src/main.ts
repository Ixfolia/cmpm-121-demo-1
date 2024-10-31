import "./style.css";

// -- Variables -- //
const app: HTMLDivElement = document.querySelector("#app")!;
const header = document.createElement("h1");
const gameName = "Money Maker";
const button = document.createElement("button");
button.className = "main-button"; // Add CSS class to main button
const priceIncreaseFactor = 1.25;
const purchaseItems = [
  {
    name: "Investment",
    cost: 10,
    rate: 0.1,
    count: 0,
    priceIncreaseFactor,
    description: "Invest to earn more money",
  },
  {
    name: "Small Business",
    cost: 100,
    rate: 2.0,
    count: 0,
    priceIncreaseFactor,
    description: "Run a small business to earn even more money",
  },
  {
    name: "Corporation",
    cost: 1000,
    rate: 50.0,
    count: 0,
    priceIncreaseFactor,
    description: "Run a corporation to earn a lot of money",
  },
  {
    name: "Bank",
    cost: 10000,
    rate: 500.0,
    count: 0,
    priceIncreaseFactor,
    description: "Own a bank to earn a huge amount of money",
  },
  {
    name: "Country",
    cost: 100000,
    rate: 5000.0,
    count: 0,
    priceIncreaseFactor,
    description: "Own a country to earn an enormous amount of money",
  },
];
let counter: number = 0;
let growthRate: number = 0;
const counterDisplay = document.querySelector(
  "#counter-display",
) as HTMLDivElement;
const growthRateDisplay = document.createElement("div");

// -- Set HTML Element Properties -- //
header.innerHTML = gameName;
button.innerHTML = '<img src="src/img/bankpng.png" alt="Bank Icon" title="Click the Bank" />';

// Title
document.title = gameName;

// -- Functions -- //
app.append(header);
app.append(button);
app.append(growthRateDisplay);

function updateCounter(): void {
  counter++;
  updateDisplay();
}

function updateDisplay(): void {
  updateCounterDisplay();
  updateGrowthRateDisplay();
  updatePurchaseButtons();
}

function updateCounterDisplay(): void {
  counterDisplay.textContent = `${counter.toFixed(2)} dollars 💰`;
}

function updateGrowthRateDisplay(): void {
  growthRateDisplay.textContent = `${growthRate.toFixed(2)} dollars/sec`;
}



// Add event listener to the button, updates the counter in HTML
button.addEventListener("click", updateCounter);

// ------- Items ------- //

interface PurchaseItem {
  name: string;
  cost: number;
  rate: number;
  count: number;
  priceIncreaseFactor: number;
  description: string;
}

// Creating Purchase Button
function createPurchaseButton(item: PurchaseItem): HTMLButtonElement {
  const purchaseButton = document.createElement("button");
  purchaseButton.innerHTML = `Purchase ${item.name} for ${item.cost} dollars`;
  purchaseButton.dataset.name = item.name;
  purchaseButton.className = "purchase-button";

  purchaseButton.addEventListener("click", () => {
    attemptToPurchase(item);
  });

  return purchaseButton;
}

// Attempt to purchase an item
function attemptToPurchase(item: PurchaseItem): void {
  if (counter >= item.cost) {
    counter -= item.cost;
    growthRate += item.rate;
    item.count++;
    item.cost *= item.priceIncreaseFactor;
    updateDisplay();
  }
}

function updatePurchaseButtons(): void {
    purchaseItems.forEach((item) => {
        const button = document.querySelector(`button[data-name="${item.name}"]`) as HTMLButtonElement;

        // Check if the button was successfully found
        if (button) {
            if (counter >= item.cost) {
                button.classList.add('can-purchase'); // Use 'button', not 'purchaseButton'
            } else {
                button.classList.remove('can-purchase');
            }

            button.disabled = counter < item.cost;
            button.innerHTML = `Purchase ${item.name} for ${item.cost.toFixed(2)} dollars`;
        }

        const itemCountDisplay = document.querySelector(`div[data-name="${item.name}"]`) as HTMLDivElement;
        if (itemCountDisplay) {
            itemCountDisplay.textContent = `[${item.name}: ${item.count}]`;
        }
    });
}

// Loop through each purchaseItem and append the created button
purchaseItems.forEach((item) => {
  const purchaseButton = createPurchaseButton(item); // Call the function to create a button
  app.append(purchaseButton);

  const itemDescription = document.createElement("div");
  itemDescription.textContent = item.description;
  app.append(itemDescription);

  const itemCountDisplay = document.createElement("div");
  itemCountDisplay.dataset.name = item.name;
  app.append(itemCountDisplay);
});

// Increment the counter based on time elapsed
let lastTime = performance.now();

function incrementCounter(time: number): void {
  const deltaTime = time - lastTime;
  counter += (deltaTime / 1000) * growthRate; // Increment by the fraction of a second that has passed, multiplied by the growth rate
  updateDisplay();
  lastTime = time;
  requestAnimationFrame(incrementCounter);
}

requestAnimationFrame(incrementCounter);
