import "./style.css";

// -- Variables -- //
const app: HTMLDivElement = document.querySelector("#app")!;
const header = document.createElement("h1");
const gameName = "Cool Game 1";
const button = document.createElement("button");
let counter: number = 0;
const counterDisplay = document.querySelector('#counter-display') as HTMLDivElement;

// -- Set HTML Element Properties -- //
header.innerHTML = gameName;
button.innerHTML = "Click me 🤑";

// Title
document.title = gameName;

// -- Functions -- //
app.append(header);
app.append(button);

function updateCounter(): void {
    counter++;
    counterDisplay.textContent = `${counter} dollars 💰`; // Display the updated counter
}

// Add event listener to the button, updates the counter in HTML
button.addEventListener('click', updateCounter);

// Increment the counter based on time elapsed
let lastTime = performance.now();

function incrementCounter(time: number): void {
    const deltaTime = time - lastTime;
    counter += deltaTime / 1000; // Increment by the fraction of a second that has passed
    counterDisplay.textContent = `${Math.floor(counter)} dollars 💰`; // Display the updated counter
    lastTime = time;
    requestAnimationFrame(incrementCounter);
}

requestAnimationFrame(incrementCounter);

