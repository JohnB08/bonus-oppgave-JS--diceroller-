//her henter jeg inn alle element fra html jeg trenger.
const inputDice = document.querySelector("#dice");
const inputFaces = document.querySelector("#sides");
const diceContainer = document.querySelector("#dicecontainer");
const diceLabel = document.querySelector("#dicelabel");
const faceLabel = document.querySelector("#facelabel");
//bruker bare en knapp, så henter bare en generell button
const btn = document.querySelector("button");

//hentet og modifiserte diceRoller funksjonen min fra oppgave tre.
function diceRoller(dice, sides) {
  //legger til to "guardian clauses" for å passe på at de to inputene ikke blir for stor
  if (inputDice.value < 1 || inputDice.value > 100) {
    diceLabel.textContent = "Vennligst velg antall mellom 1 og 100 ";
    diceLabel.style.color = "red";
    return;
  } else if (inputFaces.value < 1 || inputFaces.value > 100) {
    faceLabel.textContent = "Vennligst velg sider mellom 1 og 100";
    faceLabel.style.color = "red";
    return;
  }
  //fjerner evt. gamle terninger og summ fra dicecontainer ved en lett loop
  let currentDice = document.querySelectorAll(".dice");
  let currentSum = document.querySelector(".sum");
  if (currentSum) {
    currentSum.remove();
  }
  for (let oneDice of currentDice) {
    oneDice.remove();
  }
  //rolledDice er der kun for kontroll via console.log
  const rolledDice = [];
  for (let i = 0; i < dice; i++) {
    let rollDice = Math.ceil(Math.random() * sides);
    let dice = document.createElement("div");
    dice.classList.add("dice");
    dice.textContent = rollDice;
    diceContainer.appendChild(dice);
    rolledDice.push(rollDice);
  }
  //just in case så endrer eg tilbake label som det var orginalt.
  faceLabel.textContent = "Velg antall sider!";
  faceLabel.style.color = "black";
  diceLabel.textContent = "Velg antall terninger!";
  diceLabel.style.color = "black";
  console.log(rolledDice);
  //her bruker eg rolledDice arrayet for å summere sammen verdien av alle terningene.
  let totalRoll = 0;
  for (let singleDice of rolledDice) {
    totalRoll += singleDice;
  }
  //lager en <p> i bunn av terninglisten og printer summen ut her.
  let sum = document.createElement("p");
  sum.classList.add("sum");
  sum.textContent = `Sum av alle terninger er ${totalRoll}`;
  diceContainer.appendChild(sum);
}
//her hører eg etter click events på knappen.
btn.addEventListener("click", (event) => {
  diceRoller(inputDice.value, inputFaces.value);
});
