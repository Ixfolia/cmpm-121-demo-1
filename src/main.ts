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