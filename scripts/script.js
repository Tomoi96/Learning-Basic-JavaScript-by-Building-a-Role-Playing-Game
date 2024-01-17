//adding variables and their values. 'let' variables can be reassigned.
let camperbot;
let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];
/*variable that is not going to be reassigned. If you are not going to assign a new value to a variable, 
it is best practice to use the 'const' keyword to declare it instead of the 'let' keyword.*/
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xptext");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
//adding array
const locations = [
    {
        name: "town square",
        "button text": ["Go to store", "Go to cave", "Fight dragon"],
        "button functions": [goStore, goCave, fightDragon]
    }
];
// initialize buttons
/*button1 represents your first button element. These elements have a special property called onclick, which you can use to determine what happens when 
someone clicks that button.*/
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;
/*Functions are special tools that allow you to run sections of code at specific times. You can declare functions using the 'function' keyword. 
Here is an example of a function called 'functionName' - note the opening and closing curly braces. These indicate the section of code that is within the function.*/
function update(location) {

}
function goTown() {
    button1.innerText = "Go to store";
    button2.innerText = "Go to cave";
    button3.innerText = "Fight dragon";
    button1.onclick = goStore;
    button2.onclick = goCave;
    button3.onclick = fightDragon;
    text.innerText = "You are in the town square. You see a sign that says \"Store\".";
  }
function goStore() {
    button1.innerText = "Buy 10 health (10 gold)";
    button2.innerText = "Buy weapon (30 gold)"
    button3.innerText = "Go to town square"
    button1.onclick = buyHealth;
    button2.onclick = buyWeapon;
    button3.onclick = goTown;
    text.innerText = "You enter the store.";
}
function goCave() {
    console.log("Going to cave.")
}
function fightDragon() {
    console.log("Fighting dragon.")
}
function buyHealth() {

}
function buyWeapon() {

}