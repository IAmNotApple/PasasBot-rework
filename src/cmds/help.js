const discord = require('discord.js');
const { prefix } = require('../../config.json');
const rgbToHex = require('../utils/rgbtohex');
const fs = require('fs');

module.exports = {
    name: "help",
    description: "Use this command to get the list of commands. Use `p/help <command_name>` to get more info about that command.",
    altNames: ['commands'],
    /**
     * @param {*} args
     * @param {discord.Message} msg
     */
    execute(args, msg) {
        const helpCmds = [];
        const { commands } = msg.client;

        if(!args.length) {
            let cmdsembed = new discord.MessageEmbed()
            .setDescription('The Commands for this bot!')
            .setColor(rgbToHex.fullColorHex(0, 128, 0));

            helpCmds.push(commands.map(command => {
                if (!command.hidden)
                    return command.name;
                else
                    return "~~secretcommand~~";
            }).join('\n'));

            cmdsembed.addField(`All the current commands, type \`${prefix}help <insert Command Name>\` to know more info.`, helpCmds);

            return msg.channel.send(cmdsembed);
        }

        const cmdHelpName = args[0].toLowerCase();
        const command = commands.get(cmdHelpName) || commands.find(c => c.altNames && c.altNames.includes(cmdHelpName));

        if(!command) return msg.channel.send(`Thats not a valid Command <@${msg.author.id}>! Baka!`);


        let cmdHelpEmbed = new discord.MessageEmbed()
                .setDescription(`**Command Name:** \`${command.name}\``)
                .setColor(rgbToHex.fullColorHex(0, 128, 0));

        if(command.altNames) helpCmds.push(`**| Other ways to trigger the command |**\n${command.altNames.join(', ')}\n`);
        if(command.description) {
            if (command.disabled)
                helpCmds.push(`**| Description |**\n**This command is disabled**\n\`${command.description}\``);
            else
                helpCmds.push(`**| Description |**\n${command.description}`);
        }

        cmdHelpEmbed.addField(`Info about the Command.`, helpCmds);

        msg.channel.send(cmdHelpEmbed);
    },
};
