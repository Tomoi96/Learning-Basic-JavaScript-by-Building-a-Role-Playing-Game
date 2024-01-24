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
const monsters = [      /**Monster stats array. */
    {
      name: "slime",
      level: 2,
      health: 15
    },
    {
      name: "fanged beast",
      level: 8,
      health: 60
    },
    {
      name: "dragon",
      level: 20,
      health: 300
    }
  ]
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
      {
        name: "fight",  /**object for monster fighting. */
        "button text": ["Attack", "Dodge", "Run"],
        "button functions": [attack, dodge, goTown],
        text: "You are fighting a monster."
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
if (currentWeapon < weapons.length - 1) { /**Once a player has the best weapon, they cannot buy another one. Wraping all of the code in your 'buyWeapon' function inside 
another if statement. The condition should check if 'currentWeapon' is less than 3 - the index of the last weapon. (Value < 3 changed to '.length' property) Arrays have a length property that returns the number of items in the array. 
You may want to add new values to the weapons array in the future. 
Error to fix. The 'currentWeapon' variable is the index of the weapons array, but array indexing starts at zero. The index of the last element in an array is one less than the length of the array.*/
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
} else {
    text.innerText = "You already have the most powerful weapon!"
    button2.innerText = "Sell weapon for 15 gold" /**Once a player has the most powerful weapon, give them the ability to sell their old weapons. In the outer else statement, set 'button2.innerText' to "Sell weapon for 15 gold". Also set 'button2.onclick' to the function name 'sellWeapon'. */
    button2.onclick = sellWeapon
  }
}
function sellWeapon() {
    if (inventory.length > 1) { /**Players should not be able to sell their only weapon. Inside the 'sellWeapon' function, adding an 'if' statement with a condition that checks if the length of the inventory array is greater than 1. */
        gold += 15;             /**Inside the if statement, set 'gold' equal to 15 more than its current value. Also updating 'goldText.innerText' to the new value. */
        goldText.innerText = gold;
        let currentWeapon = inventory.shift(); /**Notice that you already have a 'currentWeapon' variable elsewhere in your code. Since you are using the 'let' (reassignable variable) keyword instead of 'var', the new 'currentWeapon' is scoped only to this 'if' statement. At the close of the 'if' statement, the old currentWeapon will be used again. 
        The 'shift()' method on an array removes the first element in the array and returns it. Use this method to take the first element from the 'inventory' array and assign it to your 'currentWeapon' variable. */
        text.innerText = "You sold a " + currentWeapon + "." ;
        text.innerText += " In your inventory you have: " + inventory ;
    } else {
        text.innerText = "Don't sell your only weapon!";
      }                                       
}
function fightSlime() {
    fighting = 0;
    goFight();
}
function fightBeast() {
    fighting = 1;
    goFight();
}
function fightDragon() {
    fighting = 2;
    goFight();
}
function goFight() {
    update(locations[3]); /** Using object from 'locations' array, changes buttons text and text. */
    monsterHealth = monsters[fighting].health;  /**taking health property from 'monsters' array. */
    monsterStats.style.display = "block"; /**HTML element that shows the monster's stats has been hidden with CSS. Display the monsterStats element by updating the display property of the style property to block. */
    monsterName.innerText = monsters[fighting].name; /**Set the innerText property of monsterName to be the name property of the current monster. Same for monsterHealthText and the health property. */
    monsterHealthText.innerText = monsterHealth; 
}
function attack() {
    text.innerText = "The " + monsters[fighting].name + " attacks.";
    text.innerText += " You attack it with your " + weapons[currentWeapon].name + "."; /**adding the string You attack it with your <weapon>. to the text value, replacing <weapon> with the player's current weapon. */
    health = health -= monsters[fighting].level; /**Set 'health' to equal 'health' minus the monster's level. Remember you can get this from the 'monsters[fighting].level' property. */
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1; /**Set 'monsterHealth' to 'monsterHealth' minus the power of the player's current weapon. Remember you have the 'currentWeapon' variable and the power property. */
   /**The 'Math' object in JavaScript contains static properties and methods for mathematical constants and functions. One of those is 'Math.random()', which generates a random number from 0 (inclusive) to 1 (exclusive). Another is 'Math.floor()', which rounds a given number down to the nearest integer.
Using these, you can generate a random number within a range. For example, this generates a random number between 1 and 5: Math.floor(Math.random() * 5) + 1;.
Following this pattern, we use the addition operator (+) to add a random number between 1 and the value of xp to our "monsterHealth -= weapons[currentWeapon].power."" */
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth; /**Update 'healthText.innerText' and 'monsterHealthText.innerText' to equal 'health' and 'monsterHealth'. */
    if (health <= 0) {      /**'if' statement to check if health is less than or equal to 0. If it is, call the 'lose' function. */
        lose();
      } else if (monsterHealth <= 0) {  /**At the end of your 'if' statement, add an 'else if' statement to check if 'monsterHealth' is less than or equal to 0. In your 'else if', call the 'defeatMonster' function. */
        defeatMonster();
      }
}
function dodge() {
  
}
function defeatMonster() {

}
function lose() {
  
}