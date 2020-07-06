const discord = require('discord.js');
const ytdl = require('ytdl-core');
const main = require('../main.js');

module.exports = {
  name: "play",
  description: "Plays a song. (Experimental!)",
  disabled: true,
  execute(args, msg) {
    const serverQueue = main.queue.get(msg.guild.id);

    const voiceChannel = msg.member.voice.channel;
    if (!voiceChannel) return msg.channel.send("You need to be in a voice channel to play music!");

    const songInfo = ytdl.getInfo(args[0]);
    const song = {
      title: songInfo.title,
      url: songInfo.video_url,
    };

    if (!serverQueue) {
      const queueContruct = {
        textChannel: msg.channel,
        voiceChannel: voiceChannel,
        connection: null,
        songs: [],
        volume: 5,
        playing: true,
      };

      main.queue.set(msg.guild.id, queueContruct);

      queueContruct.songs.push(song);

      try {
        let connection = voiceChannel.join();
        queueContruct.connection = connection;
        play(msg.guild, queueContruct.songs[0]);
      } 
      catch (err) {
        console.log(err);
        main.queue.delete(msg.guild.id);
        return msg.channel.send(err);
      }
    } 
    else {
      serverQueue.songs.push(song);
      return msg.channel.send(`${song.title} has been added to the queue!`);
    }

    function play(guild, s) {
      if (!s) {
        serverQueue.voiceChannel.leave();
        main.queue.delete(guild.id);
        return msg.channel.send(`Done playing the queue!`);
      }

      let dispatcher = serverQueue.connection
        .play(ytdl(song.url))
        .on("finish", () => {
          serverQueue.songs.shift();
          play(guild, serverQueue.songs[0]);
        })
        .on("error", error => msg.channel.send(`The music player had an error.`));
      dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
      serverQueue.textChannel.send(`Start playing: **${s.title}**`);
    }
  },
};