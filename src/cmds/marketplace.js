const discord = require('discord.js');
const Inventory = require('../models/inventory');
const dbManager = require('../utils/dbManager');
const pbMath = require('../utils/pbMath');
const logs = require('../utils/logging');
const { moneyToCoins } = require('../utils/pbMath');

module.exports = {
    name: "marketplace",
    description: "Its the marketplace!\nArguments:\n`buy <count> <item id>` - Buys things. Leave empty for the list of items.\n`sell <count> <item id>` - Sells things. Refer to `p/inventory` for item ids.",
    altNames:['shop', 'market'],
    /**
     * @param {*} args
     * @param {discord.Message} msg
     */
    execute(args, msg) {
        const itemCosts =
        {
            // White Crystal
            item0: {
                buyPrice: 40,
                sellPrice: 20,
            },
            // Blue Crystal
            item1: {
                buyPrice: 2000,
                sellPrice: 1000,
            },
            // Purple Crystal
            item2: {
                buyPrice: 10000,
                sellPrice: 5000,
            },
            // Orange Crystal
            item3: {
                buyPrice: 100000,
                sellPrice: 50000,
            },
        };

        // Buying.
        if (args[0] == "buy") {
            // Buying code
            msg.channel.send(`Work in progress`);
        }
        // Selling
        else if (args[0] == "sell") {
            let sItemCount = args[1];
            let sItemID = args[2];
            if(isNaN(args[1])) return msg.channel.send(`Thats not a valid number.`);
            Inventory.findOne({ userID: msg.author.id }, (err, inventory) => {
                if (err) logs.errorLog(`Something wrong happened in finding database in MongoDB:\n\`\`\`${err}\`\`\``);
                let sellPrice = null;
                switch (sItemID) {
                    case "0":
                        if (isNaN(sItemCount)) return msg.channel.send(`Thats not a number.`);
                        if (inventory.item0Count <= 0) return msg.channel.send(`You don't have any White Crytals.`);
                        if (inventory.item0Count < sItemCount) sItemCount = inventory.item0Count;

                        sellPrice = itemCosts.item0.sellPrice * sItemCount;

                        dbManager.subtractItem(msg.author.id, 0, sItemCount);
                        dbManager.addMoney(msg.author.id, sellPrice);

                        msg.channel.send(`You have sold ${sItemCount} White Crystal(s) for ${moneyToCoins(sellPrice)} coins.`);
                    break;
                    case "1":
                        if (isNaN(sItemCount)) return msg.channel.send(`Thats not a number.`);
                        if (inventory.item1Count <= 0) return msg.channel.send(`You don't have any Blue Crytals.`);
                        if (inventory.item1Count < sItemCount) sItemCount = inventory.item1Count;

                        sellPrice = itemCosts.item1.sellPrice * sItemCount;

                        dbManager.subtractItem(msg.author.id, 1, sItemCount);
                        dbManager.addMoney(msg.author.id, sellPrice);

                        msg.channel.send(`You have sold ${sItemCount} Blue Crystal(s) for ${moneyToCoins(sellPrice)} coins.`);
                    break;
                    case "2":
                        if (isNaN(sItemCount)) return msg.channel.send(`Thats not a number.`);
                        if (inventory.item2Count <= 0) return msg.channel.send(`You don't have any Purple Crytals.`);
                        if (inventory.item2Count < sItemCount) sItemCount = inventory.item2Count;

                        sellPrice = itemCosts.item2.sellPrice * sItemCount;

                        dbManager.subtractItem(msg.author.id, 2, sItemCount);
                        dbManager.addMoney(msg.author.id, sellPrice);

                        msg.channel.send(`You have sold ${sItemCount} Purple Crystal(s) for ${moneyToCoins(sellPrice)} coins.`);
                    break;
                    case "3":
                        if (isNaN(sItemCount)) return msg.channel.send(`Thats not a number.`);
                        if (inventory.item3Count <= 0) return msg.channel.send(`You don't have any Orange Crytals.`);
                        if (inventory.item3Count < sItemCount) sItemCount = inventory.item3Count;

                        sellPrice = itemCosts.item3.sellPrice * sItemCount;

                        dbManager.subtractItem(msg.author.id, 3, sItemCount);
                        dbManager.addMoney(msg.author.id, sellPrice);

                        msg.channel.send(`You have sold ${sItemCount} Orange Crystal(s) for ${moneyToCoins(sellPrice)} coins.`);
                    break;
                    default:
                        return msg.channel.send(`Thats not a valid ItemID! Refer to \`p/inventory\` for the ItemIDs`);
                    break;
                }
            });
        }
        else {
            msg.channel.send(`You don't have any arguments. Its \`sell\` or \`buy\``);
        }
    },
};
