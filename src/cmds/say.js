const discord = require('discord.js');
const logs = require('../utils/logging');

module.exports = {
    name: "say",
	description: "Make me say anything! (Only Pasas1345 can use this command.)",
    hidden: true,
    /**
    * @param {discord.msg} msg
    * @param {*} args
    */
    async execute(args, msg) {
        if(msg.author.id != '327750605324025856') return msg.channel.send(`Only Pasas1345 can use this command!`).then(m => { m.delete(1000); });

        if(!args[0]) return msg.channel.send(`Nothing to send Pasas1345`).then(m => { m.delete(1000); });

        let beforemsg_to_say = args.join(" ");
        let msg_to_say = beforemsg_to_say.replace(/;/, '');

        if(msg.deletable) await msg.delete();

        await msg.channel.send(msg_to_say);
        await logs.fullLog(`Pasas1345 used me to say: "${msg_to_say}" in ${msg.guild.name}`);

    },
};
