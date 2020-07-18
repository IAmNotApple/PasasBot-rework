const discord = require('discord.js');
const Inventory = require('../models/inventory');
const dbManager = require('../utils/dbManager');
const pbMath = require('../utils/pbMath');
const rgbToHex = require('../utils/rgbtohex');
const logs = require('../utils/logging');

module.exports = {
    name: "inventory",
    description: "Opens your inventory. The first value is the item id, next is the item name, last is the count",
    altNames: [`inv`],
    /**
     * @param {*} args 
     * @param {discord.Message} msg 
     */
    execute(args, msg) {
        Inventory.findOne({ userID: msg.author.id }, (err, inventory) => {
            if (err) logs.errorLog(`Something wrong happened in finding database in MongoDB:\n\`\`\`${err}\`\`\``);

            let inventoryContent = "";
            // Lul its mega spaghetti code, get ready
            if (inventory.item0Count > 0) 
                inventoryContent += `\`0\`: White Crystal -- ${inventory.item0Count}\n`;
            if (inventory.item1Count > 0) 
                inventoryContent += `\`1\`: Blue Crystal -- ${inventory.item1Count}\n`;
            if (inventory.item2Count > 0) 
                inventoryContent += `\`2\`: Purple Crystal -- ${inventory.item2Count}\n`;
            if (inventory.item3Count > 0) 
                inventoryContent += `\`3\`: Orange Crystal -- ${inventory.item3Count}`;
            
            if (inventoryContent == "") inventoryContent = "There is nothing in your inventory.";
            const invEmbed = new discord.MessageEmbed()
                .setAuthor(`${msg.author.username}'s inventory.`, msg.author.avatarURL)
                .setDescription(inventoryContent)
                .setColor(rgbToHex.fullColorHex(0, 128, 0));
            msg.channel.send(invEmbed);
        });
    },
};