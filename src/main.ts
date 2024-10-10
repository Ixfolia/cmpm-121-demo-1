import "./style.css";

// -- Variables -- //
const app: HTMLDivElement = document.querySelector("#app")!;
const header = document.createElement("h1");
const gameName = "Cool Game 1";
const button = document.createElement("button");
const purchaseItems = [
  { name: 'A', cost: 10, rate: 0.1, count: 0 },
  { name: 'B', cost: 100, rate: 2.0, count: 0 },
  { name: 'C', cost: 1000, rate: 50.0, count: 0 },
];
const purchaseButtons = purchaseItems.map(item => {
  const button = document.createElement("button");
  button.innerHTML = `Purchase ${item.name}`;
  button.dataset.name = item.name;
  return button;
});
let counter: number = 0;
let growthRate: number = 0;
const counterDisplay = document.querySelector('#counter-display') as HTMLDivElement;
const growthRateDisplay = document.createElement('div');
const itemCountDisplays = purchaseButtons.map(button => {
  const div = document.createElement('div');
  div.dataset.name = button.dataset.name;
  return div;
});

// -- Set HTML Element Properties -- //
header.innerHTML = gameName;
button.innerHTML = "Click me 🤑";

// Title
document.title = gameName;

// -- Functions -- //
app.append(header);
app.append(button);
purchaseButtons.forEach(button => app.append(button));
app.append(growthRateDisplay);
itemCountDisplays.forEach(div => app.append(div));

function updateCounter(): void {
    counter++;
    updateDisplay();
}

function updateDisplay(): void {
    counterDisplay.textContent = `${Math.floor(counter)} dollars 💰`; // Display the updated counter
    growthRateDisplay.textContent = `${growthRate.toFixed(2)} dollars/sec`;
    purchaseButtons.forEach((button, index) => {
      button.disabled = counter < purchaseItems[index].cost; // Disable the purchase button if the counter is less than the cost
      itemCountDisplays[index].textContent = `Item ${button.dataset.name}: ${purchaseItems[index].count}`;
    });
}

// Add event listener to the button, updates the counter in HTML
button.addEventListener('click', updateCounter);

// Add event listener to the purchase buttons
purchaseButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    if (counter >= purchaseItems[index].cost) {
      counter -= purchaseItems[index].cost;
      growthRate += purchaseItems[index].rate;
      purchaseItems[index].count++;
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