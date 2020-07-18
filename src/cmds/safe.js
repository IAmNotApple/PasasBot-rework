const Safe = require('../models/safe');
const Money = require('../models/money');
const discord = require('discord.js');
const pbMath = require('../utils/pbMath');
const rgbToHex = require('../utils/rgbtohex');
const dbManager = require('../utils/dbManager');
const logs = require('../utils/logging');

module.exports = {
    name: "safe",
    description: "It's your safe! Arguments (Inputting an amount like 1 gold is `1 gold`, `1 g`, or `10000`):\n`deposit <amount>` - Deposits an amount of money, can be `all`, `half`, or `quarter`.\n`withdraw <amount>` - Withdraws an amount of money, can be `all`, `half`, or `quarter`.\n`upgrade` - Upgrade the safe. Starting costs is 1 gold, and per upgrade the costs increase by 1 gold.\nLeave empty to check the safe contents.",
    /**
     * @param {*} args
     * @param {discord.Message} msg
     */
    async execute(args, msg) {
        await dbManager.initSafe(msg.author.id);
        Money.findOne({ userID: msg.author.id }, (err, money) => {
            if (err) logs.errorLog(`Something wrong happened in finding database in MongoDB:\n\`\`\`${err}\`\`\``);
            let choice = args[0];
            let amount = args[1];
            let coinType = args[2];
            if (choice == 'd' || choice == 'deposit' || choice == 'dep') {
                if (amount == 'all') { amount = money.balance; }
                else if (amount == 'quarter') { amount = Math.floor(money.balance / 4); }
                else if (amount == 'half') { amount = Math.floor(money.balance / 2); }
            }
            Safe.findOne({ userID: msg.author.id }, (err, safe) => {
                if (err) logs.errorLog(`Something wrong happened in finding database in MongoDB:\n\`\`\`${err}\`\`\``);
                if (!coinType)
                    coinType = `copper`;
                else if (coinType)
                    amount = pbMath.parseCoinType(amount, coinType);
                if (choice == 'd' || choice == 'deposit' || choice == 'dep') {
                    if (safe.safeBalance >= safe.safeMaxBalance) return msg.channel.send(`Your safe is full! Upgrade it using \`p/safe upgrade\``);
                    if (amount > safe.safeMaxBalance) amount = safe.safeMaxBalance;

                    dbManager.addSafeMoney(msg.author.id, amount);
                    dbManager.subtractMoney(msg.author.id, amount);
                    msg.channel.send(`You have deposited ${pbMath.moneyToCoins(amount)} coins.`);
                }
                else if (choice == 'w' || choice == 'withdraw' || choice == 'with') {
                    if (safe.safeBalance <= 0) return msg.channel.send(`You don't have anything in your safe! Deposit some using \`p/safe deposit <amount>\``);
                    if (amount == 'all') { amount = Number.MAX_SAFE_INTEGER; }
                    else if (amount == 'half') { amount = Math.floor(safe.safeBalance / 2); }
                    else if (amount == 'quarter') { amount = Math.floor(safe.safeBalance / 4); }
                    if (amount > safe.safeBalance) amount = safe.safeBalance;

                    dbManager.subtractSafeMoney(msg.author.id, amount);
                    dbManager.addMoney(msg.author.id, amount);
                    msg.channel.send(`You have withdrawn ${pbMath.moneyToCoins(amount)} coins.`);
                }
                else if (choice == 'upgrade') {
                    let upgradeCost = (10000 * (safe.safeMaxBalance / 5000)); // -- starts at 1 gold then it keeps increasing by 1 gold each upgrade.
                    if (upgradeCost > money.balance) return msg.channel.send(`You don't have enough coins with you. It costs ${pbMath.moneyToCoins(upgradeCost)} coins when you have ${pbMath.moneyToCoins(money.balance)} coins!`);

                    dbManager.addSafeMaxMoney(msg.author.id, 5000);
                    dbManager.subtractMoney(msg.author.id, upgradeCost);

                    msg.channel.send(`Successfully upgraded your safe! (Level ${(safe.safeMaxBalance / 5000) + 1})`);
                }
                else if (choice) {
                    msg.channel.send(`You inputted a wrong argument. Usage: \`p/safe <deposit | withdraw | upgrade> <amount>\``);
                }
                else {
                    let safeEmbed = new discord.MessageEmbed()
                        .setAuthor(`${msg.author.username}'s safe (Level ${(safe.safeMaxBalance / 5000)})`, msg.author.avatarURL)
                        .addField(`Current Balance:`, `${pbMath.moneyToCoins(money.balance)}`, true)
                        .addField(`Safe Balance:`, `${pbMath.moneyToCoins(safe.safeBalance)}`, true)
                        .addField(`Current Safe Max Balance:`, `Capacity: ${pbMath.moneyToCoins(safe.safeMaxBalance)}`, true)
                        .setColor(rgbToHex.fullColorHex(0, 128, 0));
                    msg.channel.send(safeEmbed);
                }
            });
        });
    },
};
