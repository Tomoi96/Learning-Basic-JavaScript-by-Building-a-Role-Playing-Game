//adding variables and their values. 'let' variables can be reassigned.
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
const xpText = document.querySelector("#xpText");
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
    },
    {
        name: "kill monster",   /**object for monster kill. */
        "button text": ["Go to town square", "Go to town square", "Go to town square"],
        "button functions": [goTown, goTown, easterEgg],
        text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
    },
    {
        name: "lose",   /**Object for game lost. */
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions": [restart, restart, restart],
        text: "You die. ☠️"
    },
    {
        name: "win",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions": [restart, restart, restart],
        text: "You defeat the dragon! YOU WIN THE GAME! 🎉"
    },
    {
        name: "easter egg",
        "button text": ["2", "8", "Go to town square?"],
        "button functions": [pickTwo, pickEight, goTown],
        text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
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
    monsterStats.style.display = "none";    /**After a monster is defeated, the monster's stat box should no longer display. */
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
    health -= getMonsterAttackValue(monsters[fighting].level); /**Set 'health' to equal 'health' minus the monster's level. Remember you can get this from the 'monsters[fighting].level' property. */
    /**Inside your attack function, change your "health -= monsters[fighting].level;"" line to "health -= getMonsterAttackValue(monsters[fighting].level);"". This sets 'health' equal to 'health' minus the return value of the 'getMonsterAttackValue' function, and passes the level of the monster as an argument. */
    if (isMonsterHit()) {
        monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1; /**Set 'monsterHealth' to 'monsterHealth' minus the power of the player's current weapon. Remember you have the 'currentWeapon' variable and the power property. */
        /**The 'Math' object in JavaScript contains static properties and methods for mathematical constants and functions. One of those is 'Math.random()', which generates a random number from 0 (inclusive) to 1 (exclusive). Another is 'Math.floor()', which rounds a given number down to the nearest integer.
     Using these, you can generate a random number within a range. For example, this generates a random number between 1 and 5: Math.floor(Math.random() * 5) + 1;.
     Following this pattern, we use the addition operator (+) to add a random number between 1 and the value of xp to our "monsterHealth -= weapons[currentWeapon].power."" */
    } else {
        text.innerText += " You miss.";
      }
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth; /**Update 'healthText.innerText' and 'monsterHealthText.innerText' to equal 'health' and 'monsterHealth'. */
    if (health <= 0) {      /**'if' statement to check if health is less than or equal to 0. If it is, call the 'lose' function. */
        lose();
      } else if (monsterHealth <= 0) {  /**At the end of your 'if' statement, add an 'else if' statement to check if 'monsterHealth' is less than or equal to 0. In your 'else if', call the 'defeatMonster' function. */
      fighting === 2 ? winGame() : defeatMonster();   /**Inside the else if block, create another if and else statement. If the player is fighting the dragon (fighting would be 2), call the 'winGame' function. Move the defeatMonster() call to the else block. For this step, you will need to use the strict equality (===) operator to check if fighting is equal to 2. The strict equality operator will check if the values are equal and if they are the same data type. */
    } /**'if-else' changed to ternary operator - JavaScript has a conditional operator called the ternary operator. This can be used as a one-line if-else statement. The syntax is: condition ? true : false. */
    if (Math.random() <= .1 && inventory.length !== 1) {  /**On every attack, there should be a chance that the player's weapon breaks. Use the logical AND operator && to add a second condition to your if statement. The player's weapon should only break if 'inventory.length' does not equal (!==) 1. */
        text.innerText += " Your " + inventory.pop() + " breaks."; /**Use the '+=' operator to add Your <weapon> breaks., with a space in front of "Your", to the end of text.innerText. Replace <weapon> with the last item in the inventory array using inventory.pop(), which will remove the last item in the array AND return it so it appears in your string. */
        currentWeapon--; /**Increment operator ++ can be used to increase a variable's value by 1. There is also a decrement operator -- that can be used to decrease a variable's value by 1. Decrement the value of 'currentWeapon' in your if statement, after you update the text. */
    }
}
function getMonsterAttackValue(level) {
    const hit = (level * 5) - (Math.floor(Math.random() * xp)); /**This will set the monster's attack to five times their level minus a random number between 0 and the player's xp. */
    console.log(hit); /**Log the value of hit to the console to use in debugging. Remember that you can do this with console.log(). */
    return hit > 0 ? hit : 0;  /**Functions run specific blocks of code when they are called, but they can also return a value. This value can be assigned to a variable and used elsewhere in your code. Use the return keyword to return the value of hit at the end of the function. In 'getMonsterAttackValue', change 'return hit' to a ternary operator that returns 'hit' if hit is greater than 0, or returns 0 if it is not. */
}
function isMonsterHit () {
    return Math.random() > .2 || health < 20  /**This will return a boolean value (true or false) to be used in your if statement. Return the result of the comparison "Math.random() > .2." */
}                                              /**The player should hit if either Math.random() > .2 or if the player's health is less than 20. At the end of your return statement, use the logical or operator || and check if health is less than 20. The logical or operator will use the first value if it is truthy – that is, anything apart from NaN, null, undefined, 0, -0, 0n, "", and false. Otherwise, it will use the second value. For example: num < 10 || num > 20. */
function dodge() {
    text.innerText = "You dodge the attack from the " + monsters[fighting].name;
}
function defeatMonster() {
    gold += Math.floor(monsters[fighting].level * 6.7); /**Set 'gold' equal to 'gold' plus the monster's level times 6.7. You can get the monster's level with the 'level' property. */
    xp += monsters[fighting].level;  /**Set 'xp' to 'xp' plus the monster's level. */
    goldText.innerText = gold;  /**Update 'goldText' and 'xpText' to display the updated values. */
    xpText.innerText = xp;
    update(locations[4]); /**Finish the 'defeatMonster' function by calling the update function with 'locations[4]' as the argument. */
}
function lose() {
    update(locations[5]);
}
function winGame() {
    update(locations[6]);
  }
function restart() {
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    inventory = ["stick"];
    goldText.innerText = gold;
    healthText.innerText = health;
    xpText.innerText = xp;
    goTown();
    }
function easterEgg () {
  update(locations[7]);
}
function pickTwo() {
 pick(2);
}
function pickEight() {
  pick(8);
}
function pick (guess) {
    const numbers = [];
    while (numbers.length < 10) {   /**A 'while' loop accepts a condition, and will run the code in the block until the condition is no longer true. This while loop should run while numbers.length is less than 10. */
        numbers.push(Math.floor(Math.random() * 11));
        }  /**Inside your 'while' loop, push a random number between 0 and 10 to the end of the numbers array. You can create this random number with 'Math.floor(Math.random() * 11)'. */
        text.innerText = "You picked " + guess + ". Here are the random numbers:\n";  /** '\n' will cause the next part you add to text.innerText to appear on a new line. */
        for (let i = 0; i < 10; i++) {    /**A 'for' loop runs for a specific number of times. 'for' loops are declared with three expressions separated by semicolons. for (a; b; c), where 'a' is the initialization expression, 'b' is the condition, and 'c' is the final expression. Many 'for' loops use 'i' as the counter and start from 0, so 'let i = 0;' */
            text.innerText += numbers[i] + "\n";  /**Write the logic to run in the loop. Inside your for loop, use the '+=' operator to add to the end of 'text.innerText'. Add the number at index 'i' of the numbers array, using 'numbers[i]'. Then add a new line, using the escape sequence you used earlier. */
        }
        if (numbers.includes(guess)) {  /**The '.includes()' method determines if an array contains an element and will return either true or false. Here is an example of the .includes() syntax: "const numbersArray = [1, 2, 3, 4, 5] const number = 3 if (numbersArray.includes(number)) {console.log("The number is in the array.") }" After your 'for' loop, add an 'if' statement to check if the guess is in the numbers array. You can use the '.includes()' method to check 'if' the array contains the guess. */
            text.innerText += "Right! You win 20 gold!"     /**Inside the 'if' statement, add the string Right! You win 20 gold! to the end of 'text.innerText'. Also, add 20 to the value of gold and update the 'goldText.innerText'. */
            gold += 20;
            goldText.innerText = gold;
        }   else {
            text.innerText += "Wrong! You lose 10 health!";        /**When you use the '=' assignment operator, it replaces the current value with the new one. If you set text.innerText to a new value using '=', the previous content is permanently replaced. When you use the += compound assignment operator, it appends the new content to the existing content. This means you are adding to the current value without completely replacing it. It's a way to concatenate or add onto the existing string.*/
            health -= 10;
            healthText.innerText = health;
            if (health <= 0) {
                lose();
              }
          }
    }

