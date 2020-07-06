const discord = require('discord.js');
const { logging_channel, errorLogging_channel } = require('../../config.json');
const main = require('../main.js');

module.exports = {
	normalLog: function normalLog(log_message) {
		let d = new Date();
		let dateFormat = [d.getMonth() + 1, d.getDate(), d.getFullYear()].join("/") + ' ' + [d.getHours(), d.getMinutes(), d.getSeconds()].join(':');

		// Send the message to both console and the discord log channel.
		console.log(`[PasasBot v2] ${dateFormat} >> ${log_message}`);
		main.pasasbot_bot.client.channels.fetch(logging_channel).then(ch => ch.send(`[PasasBot v2] ${dateFormat} >> ${log_message}`))
			.catch(console.error);
	},

	errorLog: function errorLog(log_message) {
		let d = new Date();
		let dateFormat = [d.getMonth() + 1, d.getDate(), d.getFullYear()].join("/") + ' ' + [d.getHours(), d.getMinutes(), d.getSeconds()].join(':');

		// Send the message to both console and the discord log channel.
		console.log(`[PasasBot v2] **ERROR** ${dateFormat} >> ${log_message}`);
		main.pasasbot_bot.client.channels.fetch(errorLogging_channel).then(ch => ch.send(`[PasasBot v2] **ERROR** ${dateFormat} >> ${log_message}`))
			.catch(console.error);
	},
};