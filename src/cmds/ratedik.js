const Discord = require('discord.js');

module.exports = {
    name: "rate",
    description: "<:thom:620247012524163072> || <:nat:620243040615006218> || <:lance:620057658887634947>\nAsk the council to rate your pp.",
    aliases: ["pp", "penis"],
    cooldown: '50',
    execute(message, args){
        var user;
        user = message.mentions.users.first();
    
		const ppsizes = [
			`:face_with_monocle: Where is it.\n:no_entry_sign: You have been banished by The Coucil.`, 
			`Hmmm.\n:face_vomiting: We are disgusted.`, 
			`Tiny.\n:angry:>The Council is not happy.`,
			`:pinching_hand: Small.\nDo better next time.`,
			`:expressionless: Eh. \nNeeds some work.`,
			`Half way there.\n:man_scientist: We will give you some assistance.`,
			`Better than 5.\n<:thumbsup:> Goodjob.`,
			`Big.\n:face_with_raised_eyebrow: Quite a good shape you have there.`,
			`:open_mouth: Oooooh.\n:smirk: Daddy!`,
			`:stuck_out_tongue_winking_eye: Ohhhh boi.\n:smiling_imp: Give it to me Daddy!`,
			`:scream: Ultimate Mega Large PP.\n:thom: :nat: :lance: The Council lets you ascend to Ultimate Sugar Daddy!:boom: :boom: `
		];

        let rate = Math.floor(Math.random() * 11);
        let ppsize = ppsizes[rate];
        
		let pic = Math.floor(Math.random() * 12);
		const thumbnails = [
			`https://cdn.discordapp.com/emojis/620247012524163072.png?v=1`,
            `https://cdn.discordapp.com/emojis/620243040615006218.png?v=1`,
            `https://cdn.discordapp.com/emojis/620057658887634947.png?v=1`,
            `https://cdn.discordapp.com/emojis/620247012524163072.png?v=1`,
            `https://cdn.discordapp.com/emojis/620243040615006218.png?v=1`,
            `https://cdn.discordapp.com/emojis/620057658887634947.png?v=1`,
            `https://cdn.discordapp.com/emojis/620247012524163072.png?v=1`,
            `https://cdn.discordapp.com/emojis/620243040615006218.png?v=1`,
            `https://cdn.discordapp.com/emojis/620057658887634947.png?v=1`,
            `https://cdn.discordapp.com/emojis/620247012524163072.png?v=1`,
            `https://cdn.discordapp.com/emojis/620243040615006218.png?v=1`,
           	`https://cdn.discordapp.com/emojis/620057658887634947.png?v=1`,
		];
        let thumbnail = thumbnails[pic];

        if(!args[0]){
            let ppembed = new Discord.RichEmbed()
            .setAuthor(message.author.username, message.author.avatarURL)
            .setDescription("The Council has rated your PP.")
            .setColor('0x00fff2')
            .setThumbnail(thumbnail)
            .addField(`${rate}/10`, ppsize)
            .setFooter('Your PP has been rated by the Counsil.')

             message.channel.send(ppembed);

        } else{
             let ppembed = new Discord.RichEmbed()
                .setAuthor(message.author.username, message.author.avatarURL)
                .setDescription(`The Council has rated ${user}'s PP.`)
                .setColor('0x00fff2')
                .setThumbnail(thumbnail)
                .addField(`${rate}/10`, ppsize)
                .setFooter('Your PP has been rated by the Counsil.')
    
                message.channel.send(ppembed);
        }
    }

}