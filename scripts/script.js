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
const weapons = [
    {                                               
        name: "stick",                        
        power: 5,
    },
    {                                               
        name: "dagger",                        
        power: 30,
    },
    {                                               
        name: "claw hammer",                        
        power: 50,
    },
    {                                               
        name: "sword",                        
        power: 100,
    },
];
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
        if (gold >= 10) {           /**if statement condition to check if gold is greater than or equal to 10.*/
            gold -= 10;             /**shorthand way to add or subtract from a variable called compound assignment. For example, changing gold = gold - 10 to compound assignment would look like gold -= 10. */
            health += 10;
            goldText.innerText = gold;
            healthText.innerText = health;
        } else {
            text.innerText = "You do not have enough gold to buy health."
        }
}
function buyWeapon() {
if (currentWeapon < 3) { /**Once a player has the best weapon, they cannot buy another one. Wraping all of the code in your 'buyWeapon' function inside another if statement. The condition should check if 'currentWeapon' is less than 3 - the index of the last weapon. */
    if (gold >= 30) {
        gold -= 30;
        currentWeapon++; 
        /**The value of the currentWeapon variable corresponds to an index in the weapons array. The player starts with a stick, since currentWeapon starts at 0 
         * and weapons[0] is the stick weapon.In the buyWeapon function, use compound assignment to add 1 to currentWeapon - the user is buying the next weapon 
         * in the weapons array. (currentWeapon += 1;) - changed with increment '++' to increase number from default 0 to 1.*/
        goldText.innerText = gold;
        let newWeapon = weapons[currentWeapon].name; /**Bracket notation to access an object within the weapons array and assign it to your newWeapon variable.
        weapons[currentWeapon] is an object. Use dot notation to get the name property of that object. */
        text.innerText = "You now have a " + newWeapon + "."; /**update the goldText element to display the new value of gold, and update the text element to display You now have a new weapon. You can insert variables into a string with the concatenation operator '+'.*/
        inventory.push(newWeapon); /**Add the 'newWeapon' to the end of the 'inventory' array using the 'push()' method. */
        text.innerText += " In your inventory you have: "
        text.innerText += " In your inventory you have: " + inventory; /**Using concatenation, '+' operator to add the contents of 'inventory' to the string. */
    } else {
        text.innerText = "You do not have enough gold to buy a weapon."
    }
}
}

function fightSlime() {

}
function fightBeast() {
  
}