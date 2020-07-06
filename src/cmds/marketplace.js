const discord = require('discord.js');

module.exports = {
    name: "marketplace",
    description: "Its the marketplace!\nArguments:\n`buy <count> <item id>` - Buys things. Leave empty for the list of items.\n`sell <count> <item id>` - Sells things. Refer to `p/inventory` for item ids.",
    altNames:['shop', 'market'],
    /**
     * @param {*} args 
     * @param {discord.Message} msg 
     */
    execute(args, msg) {
        // Buying.
        if (args[0] == "buy") {
            // Buying code
            msg.channel.send(`Work in progress`);
        }
        // Selling
        else if (args[0] == "sell") {
            //
        }
        else {
            msg.channel.send(`You don't have any arguments. Its \`sell\` or \`buy\``);
        }
    },
};
