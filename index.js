//her henter jeg inn alle element fra html jeg trenger.
const inputDice = document.querySelector("#dice");
const inputFaces = document.querySelector("#sides");
const diceContainer = document.querySelector("#dicecontainer");
const diceLabel = document.querySelector("#dicelabel");
const faceLabel = document.querySelector("#facelabel");
//bruker bare en knapp, så henter bare en generell button
const btn = document.querySelector("button");
const labelArray = document.querySelectorAll("label");
const inputArray = document.querySelectorAll("input");
//Øver på å manipulere classlists via DOM
//adder standard styling for inputs
for (let input of inputArray) {
  input.classList.add("normal-input");
}

//adder standard styling for labels
for (let label of labelArray) {
  label.classList.add("normal-label");
}
//lager en loop som legger på en evenlistener for begge inputfieldsa.

for (let i = 0; i < inputArray.length; i++) {
  //focus betyr når den er blitt fokusert av brukeren, trykket eller tabbet innpå.
  inputArray[i].addEventListener("focus", (event) => {
    //legger til focused-label classen til labelet for å fyre av en animasjon!
    labelArray[i].classList.add("focused-label");
    //legger til focused input classen til input.
    inputArray[i].classList.add("focused-input");
  });
  //blur er når brukeren går vekk fra input igjen.
  inputArray[i].addEventListener("blur", (event) => {
    //if statementen her skjekker om input har fått en verdi, eller fremdeles er tom.
    if (inputArray[i].value === "") {
      //fjerner focused-label class.
      labelArray[i].classList.remove("focused-label");
      //fjerner focused input class.
      inputArray[i].classList.remove("focused-input");
    }
  });
}

//hentet og modifiserte diceRoller funksjonen min fra oppgave tre.
function diceRoller(dice, sides) {
  //legger til to "guardian clauses" for å passe på at de to inputene ikke blir for stor
  if (inputDice.value < 1 || inputDice.value > 100) {
    diceLabel.textContent = "Vennligst velg antall mellom 1 og 100 ";
    diceLabel.classList.add("red");
    inputDice.classList.add("focused-input-error");
    return;
  } else if (inputFaces.value < 1 || inputFaces.value > 100) {
    faceLabel.textContent = "Vennligst velg sider mellom 1 og 100";
    faceLabel.classList.add("red");
    inputFaces.classList.add("focused-input-error");
    return;
  } else {
    //korrigerer labels etter bruker har rettet
    for (let label of labelArray) {
      label.classList.remove("red");
    }
    for (let input of inputArray) {
      input.classList.remove("focused-input-error");
    }
    diceLabel.textContent = "Velg antall terninger!";
    faceLabel.textContent = "Velg antall sider!";
  }
  //fjerner evt. gamle terninger og summ fra dicecontainer ved en lett loop
  let currentDice = document.querySelectorAll(".dice");
  let currentSum = document.querySelector(".sum");
  //her ser eg om currentsum finnes, via truey falsey.
  if (currentSum) {
    currentSum.remove();
  }
  //her fjerner eg hvert terning element som evt allerede eksisterer.
  for (let oneDice of currentDice) {
    oneDice.remove();
  }
  //rolledDice var orginalt kun for kontroll via console.log, er nå og med å lage totalsum.
  const rolledDice = [];
  //Her resettes og rolledDice til et tomt array før loopen kjøres.
  for (let i = 0; i < dice; i++) {
    let rollDice = Math.ceil(Math.random() * sides);
    let dice = document.createElement("div");
    dice.classList.add("dice");
    dice.textContent = rollDice;
    diceContainer.appendChild(dice);
    //pusher her resulatet til rolled dice array.
    rolledDice.push(rollDice);
  }
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
