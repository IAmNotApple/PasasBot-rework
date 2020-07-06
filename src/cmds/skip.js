const discord = require('discord.js');
const ytdl = require('ytdl-core');
const main = require('../main.js');

module.exports = {
    name: "skip",
    description: "Skips a current playing song. (Experimental)",
    disabled: true,
    execute(args, msg) {
        const serverQueue = main.queue.get(msg.guild.id);

        if (!msg.member.voice.channel)
            return msg.channel.send("You have to be in a voice channel to stop the music!");
        if (!serverQueue)
            return msg.channel.send("There is no song that I could skip!");
        serverQueue.connection.dispatcher.end();
    },
};