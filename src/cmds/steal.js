const discord = require('discord.js');
const Money = require('../models/money');
const userManager = require('../utils/userManager');
const dbManager = require('../utils/dbManager');
const logs = require('../utils/logging');
const pbMath = require('../utils/pbMath');

module.exports = {
    name: "steal",
    description: "Steal coins from someone.",
    /**
     * @param {*} args 
     * @param {discord.Message} msg 
     */
    async execute(args, msg) {
        const stealVictim = userManager.getUserFromMention(args[0]);
        if (!stealVictim) return msg.channel.send(`You didn't mention someone. baka.`);
        Money.findOne({ userID: msg.author.id }, (err, money) => {
            if (err) logs.errorLog(`Something wrong happened in finding database in MongoDB:\n\`\`\`${err}\`\`\``);
            if (!money) return msg.channel.send(`You need at least 5 silver coins to steal.`);
            if (money.balance < 500) return msg.channel.send(`You need at least 5 silver coins to steal.`); 

            Money.findOne({ userID: stealVictim.id }, (err, victimMoney) => {
                if (err) logs.errorLog(`Something wrong happened in finding database in MongoDB:\n\`\`\`${err}\`\`\``);
                if (!victimMoney) {
                    return msg.channel.send(`Why are you trying to steal from a person who doesn't even have money <@${msg.author.id}>? Greedy.`);
                }
                if (pbMath.randomChance(40)) {
                    const stolenMoney = pbMath.getRandomInt(0, (victimMoney.balance / 2));

                    dbManager.subtractItem(stealVictim.id, stolenMoney);
                    dbManager.addMoney(msg.author.id, stolenMoney);

                    msg.channel.send(`You have successfully stolen ${pbMath.moneyToCoins(stolenMoney)} from ${stealVictim.username}.`);
                }
                else {
                    const stealFines = pbMath.getRandomInt(500, (500 * (money.balance / 500)));
                    dbManager.subtractMoney(msg.author.id, stealFines);
                    dbManager.addMoney(stealVictim.id, (Math.floor(stealFines / 2)));   

                    msg.channel.send(`You have failed the steal, costing you around ${pbMath.moneyToCoins(stealFines)} half of which went to the person you tried to steal from.`);
                }
            });
        });
    },
};
