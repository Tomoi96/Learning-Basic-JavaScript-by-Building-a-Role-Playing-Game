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
    {                                               /*One object is everything inside '{}' brackets.*/
        name: "town square",
        "button text": ["Go to store", "Go to cave", "Fight dragon"],
        "button functions": [goStore, goCave, fightDragon],                         
        text: "You are in the town square. You see a sign that says \"Store\"."
    },
    {
        name: "store",
        "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
        "button functions": [buyHealth, buyWeapon, goTown],
        text: "You enter the store."
    },
    {
        name: "cave",
        "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
        "button functions": [fightSlime, fightBeast, goTown],
        text: "You enter the cave. You see some monsters."
      },
];
// initialize buttons
/*button1 represents your first button element. These elements have a special property called onclick, which you can use to determine what happens when 
someone clicks that button.*/
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;
/*Functions are special tools that allow you to run sections of code at specific times. You can declare functions using the 'function' keyword. 
Here is an example of a function called 'functionName' - note the opening and closing curly braces. These indicate the section of code that is within the function.*/
function update(location) { /*data is used from array 'const locations'*/
    button1.innerText = location["button text"][0]; 
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    text.innerText = location.text;
}
function goTown() {
    update(locations[0]); /*using 'update'call to use 'locations' array data. '[0]' is to  use first object, location "town square" from 'const locations' array.*/
  }
function goStore() {
    update(locations[1]);
}
function goCave() {
    update(locations[2]);
}
function fightDragon() {
    console.log("Fighting dragon.")
}
function buyHealth() {
    gold -= 10;             /**shorthand way to add or subtract from a variable called compound assignment. For example, changing gold = gold - 10 to compound assignment would look like gold -= 10. */
    health += 10;
}
function buyWeapon() {

}
function fightSlime() {

}
function fightBeast() {
  
}