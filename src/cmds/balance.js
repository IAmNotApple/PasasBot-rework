const discord = require('discord.js');
const Money = require('../models/money');
const pbMath = require('../utils/pbMath.js');
const logs = require('../utils/logging');
const rgbtohex = require(`../utils/rgbtohex`);
const dbManager = require('../utils/dbManager');

module.exports = {
    name: "balance",
    description: "Shows your current balance.",
    altNames: [`bal`, `money`, `coins`],
    /**
     * 
     * @param {*} args 
     * @param {discord.Message} msg
     */
    execute(args, msg) {
        Money.findOne({ userID: msg.author.id }, (err, money) => {
            if (err) logs.errorLog(`Something wrong happened in finding database in MongoDB:\n\`\`\`${err}\`\`\``);
            let uMoney = null;
            if (!money) {
                uMoney = 0;
                dbManager.resetMoney(msg.author.id);
            }
            else {
                uMoney = money.balance;
            }
            const moneyEmbed = {
                color: rgbtohex.fullColorHex(0, 128, 0),
                title: `Your balance`,
                fields:
                [
                    {
                        name: `Amount of coins:`,
                        value: `${pbMath.moneyToCoins(uMoney)} coins`,
                    },
                ],
            };
    
            msg.channel.send({ embed: moneyEmbed });
        });
    },
};