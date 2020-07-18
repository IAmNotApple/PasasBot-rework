const index = require('../main.js');
const discord = require('discord.js');
const logs = require('../utils/logging.js');

module.exports = {
    name: 'reload',
    description: 'Reloads a command! Only my Creator can use this command!',
    /**
     * @param {discord.Message} msg 
     * @param {*} args 
     */
    execute(args, msg) {
        if (msg.author.id == '327750605324025856') {
            
            if (!args.length) return msg.channel.send(`Pasas? Wheres the command to reload?`);
            
            const commandName = args[0].toLowerCase();
            const command = msg.client.commands.get(commandName) || msg.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
           
            if (!command) return msg.channel.send(`Pasas? There is no such thing as \`${commandName}\`! Baka.`);
            
            delete require.cache[require.resolve(`./${commandName}.js`)];
            
            try {
                const newCommand = require(`./${commandName}.js`);
                msg.client.commands.set(commandName, newCommand);
                logs.normalLog(`Reloading the command \`${commandName}\` was successful!`);
                msg.channel.send(`Reloading the command \`${commandName}\` was successful!`);
            } 
            catch (error) {
                logs.errorLog(`An error with reloading happened! This is bad!\nThe Error:\n\`\`\`${error}\`\`\``);
                console.error(error);
                msg.channel.send(`Something bad happened! Pasas1345 I'm sorry for the inconvinence!`);
            }
        }
        else
            return msg.channel.send(`Only Pasas1345 can use this command. b-baka.`);
    },
};