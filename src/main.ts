import "./style.css";

// -- Variables -- //
const app: HTMLDivElement = document.querySelector("#app")!;
const header = document.createElement("h1");
const gameName = "Cool Game 1";
const button = document.createElement("button");
const purchaseButton = document.createElement("button");
let counter: number = 0;
let growthRate: number = 0;
const counterDisplay = document.querySelector('#counter-display') as HTMLDivElement;

// -- Set HTML Element Properties -- //
header.innerHTML = gameName;
button.innerHTML = "Click me 🤑";
purchaseButton.innerHTML = "Purchase Upgrade";

// Title
document.title = gameName;

// -- Functions -- //
app.append(header);
app.append(button);
app.append(purchaseButton);

function updateCounter(): void {
    counter++;
    updateDisplay();
}

function updateDisplay(): void {
    counterDisplay.textContent = `${Math.floor(counter)} dollars 💰`; // Display the updated counter
    purchaseButton.disabled = counter < 10; // Disable the purchase button if the counter is less than 10
}

// Add event listener to the button, updates the counter in HTML
button.addEventListener('click', updateCounter);

// Add event listener to the purchase button
purchaseButton.addEventListener('click', () => {
    if (counter >= 10) {
        counter -= 10;
        growthRate++;
        updateDisplay();
    }
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