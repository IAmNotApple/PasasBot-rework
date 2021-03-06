// Assign all databases here. (IF JSON)
const moneyJSON = require('../../database/money.json');
// Schemas go here
const Money = require(`../models/money.js`);
const Inventory = require('../models/inventory');
const Safe = require('../models/safe');
// Dependencies!
const fs = require('fs');
const logs = require('../utils/logging');
const main = require('../main.js');
const { User } = require('discord.js');

const mongoose = require('mongoose');

module.exports = {
    /*-----------------*
    *  Money Database *
    *-----------------*/
   /**
    * Adds money 
    * @param {User} user - userID of user
    * @param {number} bal - amount of money
    */
    addMoney: function(user, bal) {  
        Money.findOne({ userID: user }, (err, money) => {
            if (err) logs.errorLog(`Something wrong happened in finding database in MongoDB:\n\`\`\`${err}\`\`\``);
            if (!money) {
                const newMoney = new Money({
                    username: user.username,
                    userID: user,
                    balance: bal,
                });
                newMoney.save().catch(err => console.log(err));
            }
            else {
                money.balance = money.balance += bal;
                money.save().catch(err => console.log(err));
            }
        });
    },
    /**
     * Subtracts money
     * @param {User} user - userID of user
     * @param {number} bal - amount of money
     */
    subtractMoney: function(user, bal) {
        Money.findOne({ userID: user }, (err, money) => {
            if (err) logs.errorLog(`Something wrong happened in finding database in MongoDB:\n\`\`\`${err}\`\`\``);
            if (!money) {
                const newMoney = new Money({
                    username: user.username,
                    userID: user,
                    balance: 0,
                });
                newMoney.save().catch(err => console.log(err));
            }
            else {
                money.balance = money.balance -= bal;
                money.save().catch(err => console.log(err));
            }
        });
    },
    /**
     * Sets money
     * @param {User} user - userID of user
     * @param {number} bal - amount of Money
     */
    setMoney: function(user, bal) {
        Money.findOne({ userID: user }, (err, money) => {
            if (err) logs.errorLog(`Something wrong happened in finding database in MongoDB:\n\`\`\`${err}\`\`\``);
            if (!money) {
                const newMoney = new Money({
                    username: user.username,
                    userID: user,
                    balance: bal,
                });
                newMoney.save().catch(err => console.log(err));
            }
            else {
                money.balance = bal;
                money.save().catch(err => console.log(err));
            }
        });
    },
    /**
     * Resets money.
     * @param {User} user - userID of user
     */
    resetMoney: function(user) {
        Money.findOne({ userID: user }, (err, money) => {
            if (err) logs.errorLog(`Something wrong happened in finding database in MongoDB:\n\`\`\`${err}\`\`\``);
            if (!money) {
                const newMoney = new Money({
                    username: user.username,
                    userID: user,
                    balance: 0,
                });
                newMoney.save().catch(err => console.log(err));
            }
            else {
                money.balance = 0;
                money.save().catch(err => console.log(err));
            }
        });
    },
    /**
     * Gets the user's current money (Not working currently)
     * @param {User} user
     * @returns {Number} user's current money
     */
    getMoney: function(user) {
        Money.findOne({ userID: user }, (err, money) => {
            let m = null;
            if (err) logs.errorLog(`Something wrong happened in finding database in MongoDB:\n\`\`\`${err}\`\`\``);
            if (!money) {
                const newMoney = new Money({
                    username: user.username,
                    userID: user,
                    balance: 0,
                });
                newMoney.save().catch(err => console.log(err));

                m = 0;
            }
            else {
                m = money.balance;
            }
            money = m;
        });
    },
    /*---------------*
     * Safe Database *
     *---------------*/
    /**
     * Initializes the safe database of a user
     * @param {User} user 
     */
    initSafe: function(user) {
        Safe.findOne({ userID: user }, (err, safe) => {
            if (err) logs.errorLog(`Something wrong happened in finding database in MongoDB:\n\`\`\`${err}\`\`\``);
            if (!safe) {
                const newSafe = new Safe({
                    userID: user,
                    safeBalance: 0,
                    safeMaxBalance: 5000,
                });

                newSafe.save().catch(err => console.log(err));
            }
        });
    },
    /**
     * Adds money to the user's safe.
     * @param {User} user 
     * @param {Number} balance 
     */
    addSafeMoney: function(user, balance) {
        Safe.findOne({ userID: user }, (err, safe) => {
            if (err) logs.errorLog(`Something wrong happened in finding database in MongoDB:\n\`\`\`${err}\`\`\``);
            if (!safe) {
                const newSafe = new Safe({
                    userID: user,
                    safeBalance: balance,
                    safeMaxBalance: 5000,
                });

                newSafe.save().catch(err => console.log(err));
            }
            else {
                safe.safeBalance += balance;
                safe.save().catch(err => console.log(err));
            }
        });
    },
    /**
     * Subtracts money from the user's safe.
     * @param {User} user 
     * @param {Number} balance 
     */
    subtractSafeMoney: function(user, balance) {
        Safe.findOne({ userID: user }, (err, safe) => {
            if (err) logs.errorLog(`Something wrong happened in finding database in MongoDB:\n\`\`\`${err}\`\`\``);
            if (!safe) {
                const newSafe = new Safe({
                    userID: user,
                    safeBalance: 0,
                    safeMaxBalance: 5000,
                });

                newSafe.save().catch(err => console.log(err));
            }
            else {
                safe.safeBalance -= balance;
                safe.save().catch(err => console.log(err));
            }
        });

    },
    /**
     * Sets money in the user's safe.
     * @param {User} user 
     * @param {Number} balance 
     */
    setSafeMoney: function(user, balance) {
        Safe.findOne({ userID: user }, (err, safe) => {
            if (err) logs.errorLog(`Something wrong happened in finding database in MongoDB:\n\`\`\`${err}\`\`\``);
            if (!safe) {
                const newSafe = new Safe({
                    userID: user,
                    safeBalance: balance,
                    safeMaxBalance: 5000,
                });

                newSafe.save().catch(err => console.log(err));
            }
            else {
                safe.safeBalance = balance;
                safe.save().catch(err => console.log(err));
            }
        });
    },
    /**
     * Resets money in the user's safe.
     * @param {User} user  
     */
    resetSafeMoney: function(user) {
        Safe.findOne({ userID: user }, (err, safe) => {
            if (err) logs.errorLog(`Something wrong happened in finding database in MongoDB:\n\`\`\`${err}\`\`\``);
            if (!safe) {
                const newSafe = new Safe({
                    userID: user,
                    safeBalance: 0,
                    safeMaxBalance: 5000,
                });

                newSafe.save().catch(err => console.log(err));
            }
            else {
                safe.safeBalance = 0;
                safe.save().catch(err => console.log(err));
            }
        });
    },

    /**
     * Adds max money to the user's safe.
     * @param {User} user 
     * @param {Number} balance 
     */
    addSafeMaxMoney: function(user, balance) {
        Safe.findOne({ userID: user }, (err, safe) => {
            if (err) logs.errorLog(`Something wrong happened in finding database in MongoDB:\n\`\`\`${err}\`\`\``);
            if (!safe) {
                const newSafe = new Safe({
                    userID: user,
                    safeBalance: 0,
                    safeMaxBalance: balance,
                });

                newSafe.save().catch(err => console.log(err));
            }
            else {
                safe.safeMaxBalance += balance;
                safe.save().catch(err => console.log(err));
            }
        });
    },
    
    /**
     * Subtracts max money to the user's safe.
     * @param {User} user 
     * @param {Number} balance 
     */
    subtractSafeMaxMoney: function(user, balance) {
        Safe.findOne({ userID: user }, (err, safe) => {
            if (err) logs.errorLog(`Something wrong happened in finding database in MongoDB:\n\`\`\`${err}\`\`\``);
            if (!safe) {
                const newSafe = new Safe({
                    userID: user,
                    safeBalance: 0,
                    safeMaxBalance: 5000 - balance,
                });

                newSafe.save().catch(err => console.log(err));
            }
            else {
                safe.safeMaxBalance -= balance;
                safe.save().catch(err => console.log(err));
            }
        });
    },

    /*--------------------*
     * Inventory Database *
     *--------------------*/
    
    /**
     * Adds an item to a user's inventory.
     * @param {User} user - userID of the user
     * @param {Number} itemID - item ID (Refer to /src/models/inventory.js)
     * @param {Number} itemAmount - item amount (Optional.)
     */
    addItem: function(user, itemID, itemAmount) {
        itemAmount = itemAmount || 1;

        Inventory.findOne({ userID: user }, (err, inventory) => {
            if (err) logs.errorLog(`Something wrong happened in finding database in MongoDB:\n\`\`\`${err}\`\`\``);
            if (!inventory) {
                const newInventory = new Inventory({
                    userID: user,
                    item0Count: 0,
                    item1Count: 0,
                    item2Count: 0,
                    item3Count: 0,
                });

                switch (itemID) {
                    case 0:
                        newInventory.item0Count += itemAmount;
                    break;
                    case 1:
                        newInventory.item1Count += itemAmount;
                    break;
                    case 2:
                        newInventory.item2Count += itemAmount;
                    break;
                    case 3:
                        newInventory.item3Count += itemAmount;
                    break;
                    default:
                        return logs.errorLog(`addItem Function Error: ItemID doesnt exist.`);
                    break;
                }
                
                newInventory.save().catch(err => console.log(err));
            }
            else {
                switch (itemID) {
                    case 0:
                        inventory.item0Count += itemAmount;
                    break;
                    case 1:
                        inventory.item1Count += itemAmount;
                    break;
                    case 2:
                        inventory.item2Count += itemAmount;
                    break;
                    case 3:
                        inventory.item3Count += itemAmount;
                    break;
                    default:
                        return logs.errorLog(`addItem Function Error: ItemID doesnt exist.`);
                    break;
                }

                inventory.save().catch(err => console.log(err));
            }
        });
    },

    /**
     * Subtracts an item to a user's inventory.
     * @param {User} user - userID of the user
     * @param {Number} itemID - item ID (Refer to /src/models/inventory.js)
     * @param {Number} itemAmount - item amount (Optional.)
     */
    subtractItem: function(user, itemID, itemAmount) {
        itemAmount = itemAmount || 1;

        Inventory.findOne({ userID: user }, (err, inventory) => {
            if (err) logs.errorLog(`Something wrong happened in finding database in MongoDB:\n\`\`\`${err}\`\`\``);
            if (!inventory) {
                const newInventory = new Inventory({
                    userID: user,
                    item0Count: 0,
                    item1Count: 0,
                    item2Count: 0,
                    item3Count: 0,
                });

                switch (itemID) {
                    case 0:
                        newInventory.item0Count -= itemAmount;
                    break;
                    case 1:
                        newInventory.item1Count -= itemAmount;
                    break;
                    case 2:
                        newInventory.item2Count -= itemAmount;
                    break;
                    case 3:
                        newInventory.item3Count -= itemAmount;
                    break;
                    default:
                        return logs.errorLog(`subtractItem Function Error: ItemID doesnt exist.`);
                    break;
                }
                
                newInventory.save().catch(err => console.log(err));
            }
            else {
                switch (itemID) {
                    case 0:
                        inventory.item0Count -= itemAmount;
                    break;
                    case 1:
                        inventory.item1Count -= itemAmount;
                    break;
                    case 2:
                        inventory.item2Count -= itemAmount;
                    break;
                    case 3:
                        inventory.item3Count -= itemAmount;
                    break;
                    default:
                        return logs.errorLog(`subtractItem Function Error: ItemID doesnt exist.`);
                    break;
                }

                inventory.save().catch(err => console.log(err));
            }
        });

    },
};
