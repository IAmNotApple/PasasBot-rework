const discord = require("discord.js");
const dbManager = require('../utils/dbManager.js');
const logs = require('../utils/logging');
const Money = require('../models/money');
const { Message } = require('discord.js');
const pbMath = require('../utils/pbMath.js');

module.exports = {
    name: "work",
    description: "Work for money!",
    cooldown: 30,
    cdResponse: `Dude, don't overwork yourself. Take a rest kudasaii`,
    /**
     * @param {*} args
     * @param {Message} msg
     */
    async execute(args, msg) {
        let workEarn = pbMath.getRandomInt(500, 1000);
        await dbManager.addMoney(msg.author.id, workEarn);
        Money.findOne({ userID: msg.author.id }, (err, money) => {
            if (err) logs.errorLog(`Something wrong happened in finding database in MongoDB:\n\`\`\`${err}\`\`\``);
            msg.channel.send(`You have earned ${pbMath.moneyToCoins(workEarn)} coins from your hard work.`);
        });
    },
};
