const discord = require('discord.js');
const mongoose = require('mongoose');
const Money = require('../models/money.js');
const Inventory = require('../models/inventory.js');
const dbManager = require('../utils/dbManager');
const { Message } = require('discord.js');
const pbMath = require('../utils/pbMath');

module.exports = {
    name: "search",
    description: "Search for items and money.",
    cooldown: 15,
    cdResponse: `Don't oversearch, wait for a while so they can restock on their things.`,
    /**
     * @param {*} args 
     * @param {Message} msg 
     */
    execute(args, msg) {
        // Did you get anything from the search?
        let items_taken = false;
        let money_taken = false;
        // The response:
        let item_data = "";
        let money_data = null;
        // Items part:
        // See if you get items
        if (pbMath.randomChance(40)) {
            const itemRandomizer = pbMath.getRandomInt(0, 100);
            // White crystals?
            if (itemRandomizer <= 70) {
                let wAmount = pbMath.getRandomInt(2, 5);
                dbManager.addItem(msg.author.id, 0, wAmount);
                item_data = `${wAmount} White Crystals`;
            }
            // Blue Crystals?
            else if (itemRandomizer >= 70 && itemRandomizer <= 85) {
                let bAmount = pbMath.getRandomInt(1, 3);
                dbManager.addItem(msg.author.id, 1, bAmount);
                item_data = `${bAmount} Blue Crystal(s)`;
            } 
            // Purple Crystals?
            else if (itemRandomizer >= 85 && itemRandomizer <= 95) {
                let pAmount = pbMath.getRandomInt(1, 2);
                dbManager.addItem(msg.author.id, 2, pAmount);
                item_data = `${pAmount} Purple Crystal(s)`;
            } 
            // Orange Crystals?
            else if (itemRandomizer >= 95 && itemRandomizer <= 100) {
                dbManager.addItem(msg.author.id, 3, 1);
                item_data = `1 Orange Crystal`;
            }
            items_taken = true;
        }
        // Money part:
        if (pbMath.randomChance(50)) {
            const moneyRandomizer = pbMath.getRandomInt(10, 50);
            dbManager.addMoney(msg.author.id, moneyRandomizer);
            money_taken = true;
            money_data = moneyRandomizer;
        }
        
        if (items_taken && money_taken) {
            return msg.channel.send(`You have founed ${item_data} and ${pbMath.moneyToCoins(money_data)} coins.`);
        }
        else if (items_taken) {
            return msg.channel.send(`You have found ${item_data}.`);
        }
        else if (money_taken) {
            return msg.channel.send(`You have found ${pbMath.moneyToCoins(money_data)} coins.`);
        }
        
        msg.channel.send(`Unfortunately, during the search, you didn't find anything at all.`);
    },
};