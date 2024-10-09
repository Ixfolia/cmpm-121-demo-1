import "./style.css";

// -- Variables -- //
const app: HTMLDivElement = document.querySelector("#app")!;
const header = document.createElement("h1");
const gameName = "Cool Game 1";
const button = document.createElement("button");

// - Set HTML Element Properties - //
header.innerHTML = gameName;
button.innerHTML = "Click me 🤑";

// Title
document.title = gameName;

// -- Functions -- //
app.append(header);
app.append(button);

