import "./style.css";

// -- Variables -- //
const app: HTMLDivElement = document.querySelector("#app")!;
const header = document.createElement("h1");
const gameName = "Money Maker";
const button = document.createElement("button");
button.className = "main-button"; // Add CSS class to main button
const purchaseItems = [
  { name: 'Investment', cost: 10, rate: 0.1, count: 0, priceIncreaseFactor: 1.15, description: 'Invest to earn more money' },
  { name: 'Small Business', cost: 100, rate: 2.0, count: 0, priceIncreaseFactor: 1.15, description: 'Run a small business to earn even more money' },
  { name: 'Corporation', cost: 1000, rate: 50.0, count: 0, priceIncreaseFactor: 1.15, description: 'Run a corporation to earn a lot of money' },
  { name: 'Bank', cost: 10000, rate: 500.0, count: 0, priceIncreaseFactor: 1.15, description: 'Own a bank to earn a huge amount of money' },
  { name: 'Country', cost: 100000, rate: 5000.0, count: 0, priceIncreaseFactor: 1.15, description: 'Own a country to earn an enormous amount of money' },
];
let counter: number = 0;
let growthRate: number = 0;
const counterDisplay = document.querySelector('#counter-display') as HTMLDivElement;
const growthRateDisplay = document.createElement('div');

// -- Set HTML Element Properties -- //
header.innerHTML = gameName;
button.innerHTML = "Click the Bank 💰";

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
  counterDisplay.textContent = `${counter.toFixed(2)} dollars 💰`; // Display the updated counter with 2 decimal places
  growthRateDisplay.textContent = `${growthRate.toFixed(2)} dollars/sec`;
  purchaseItems.forEach((item) => {
    const button = document.querySelector(`button[data-name="${item.name}"]`) as HTMLButtonElement;
    const itemCountDisplay = document.querySelector(`div[data-name="${item.name}"]`) as HTMLDivElement;
    button.disabled = counter < item.cost; // Disable the purchase button if the counter is less than the cost
    button.innerHTML = `Purchase ${item.name} for ${item.cost.toFixed(2)} dollars`; // Update the button text with the new cost
    itemCountDisplay.textContent = `[${item.name}: ${item.count}]`;
  });
}

// Add event listener to the button, updates the counter in HTML
button.addEventListener('click', updateCounter);

// Create purchase buttons and add event listeners
purchaseItems.forEach((item) => {
  const purchaseButton = document.createElement("button");
  purchaseButton.innerHTML = `Purchase ${item.name} for ${item.cost} dollars`;
  purchaseButton.dataset.name = item.name;
  purchaseButton.className = "purchase-button"; // Add CSS class to purchase buttons
  app.append(purchaseButton);

  const itemDescription = document.createElement('div');
  itemDescription.textContent = item.description;
  app.append(itemDescription);

  const itemCountDisplay = document.createElement('div');
  itemCountDisplay.dataset.name = item.name;
  app.append(itemCountDisplay);

  purchaseButton.addEventListener('click', () => {
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
let lastTime = performance.now();

function incrementCounter(time: number): void {
    const deltaTime = time - lastTime;
    counter += (deltaTime / 1000) * growthRate; // Increment by the fraction of a second that has passed, multiplied by the growth rate
    updateDisplay();
    lastTime = time;
    requestAnimationFrame(incrementCounter);
}

requestAnimationFrame(incrementCounter);