const discord = require('discord.js');
const { pasas_token, prefix, niko_token,
	activityType, activityContent } = require('../config.json');
const logs = require('./utils/logging.js');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const root_folder = path.join(__dirname, `..`);
const dbManager = require('./utils/dbManager');

const queue = new Map();

// The bot.
class PasasBot {
	constructor(token) {
		this._client = new discord.Client();
		this._pasasbot_token = token;

		this.main();
	}

	main() {
		// MongoDB connection
		mongoose.connect("mongodb://localhost/pasasbot");

		// Command Handler
        // Set it up first lmao
        this._client.commands = new discord.Collection();
        const commandFiles = fs.readdirSync(path.join(__dirname, 'cmds')).filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
			const command = require(`./cmds/${file}`);
            this._client.commands.set(command.name, command);
        }
		const cooldowns = new discord.Collection();

		// Ready handlers
		this._client.on("ready", readyEvent => {
			logs.normalLog(`PasasBot is up!`);

			// Set the activity!
			// The available activity types are:
			/*
			 *  PLAYING
			 *  STREAMING
			 *  LISTENING
			 *  WATCHING
			*/
			// Set the activity in config.json

			this._client.user.setActivity(activityContent, { type: activityType });
		});

		// Message handlers
		this._client.on("message", async msg => {
			try {
				if(!msg.content.startsWith(prefix.toLowerCase()) && !msg.content.startsWith(prefix.toUpperCase())) return;

                let args = msg.content.substring(prefix.length).split(/ +/);
                const commandName = args.shift().toLowerCase();

                if (msg.author == this._client) return;

	      		const command = this._client.commands.get(commandName) || this._client.commands.find(cmd => cmd.altNames && cmd.altNames.includes(commandName));

				if (!command) return;

				if (command.disabled) return msg.channel.send(`This command is currently disabled.`);

				if (!cooldowns.has(command.name)) {
					cooldowns.set(command.name, new discord.Collection());
				}

				const now = Date.now();
				const timestamps = cooldowns.get(command.name);
				const cooldownAmount = (command.cooldown || 0) * 1000;

				if (timestamps.has(msg.author.id)) {
					const expirationTime = timestamps.get(msg.author.id) + cooldownAmount;

					if (now < expirationTime) {
						const timeLeft = (expirationTime - now) / 1000;
						if (!command.cdResponse)
							return msg.channel.send(`Hi. Please wait for ${timeLeft.toFixed(1)} second(s). せっかちなバカ`); // ez japaneses :lenny:
						else
							return msg.channel.send(`${command.cdResponse} (${timeLeft.toFixed(1)} second(s))`);
					}
				}
				timestamps.set(msg.author.id, now);
				setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount);


                try {
                    command.execute(args, msg);

					logs.normalLog(`${command.name} executed.`);
                }
                catch (error) {
                    msg.channel.send(`Something wrong has happend!`);

					logs.errorLog(`An error has occured in the command ${command.name} at ${msg.guild.name}:\n\n\`\`\`${error}\`\`\``);

					console.error(error);
                }
			}
			catch {
				logs.errorLog(`Something wrong has happend! The command didn't even execute at all!`);
			}
		});

		this._client.login(this._pasasbot_token);
	}

	get client() {
		return this._client;
	}

	// Useless. Don't use this.
	// just sets a new client. But not even required at all.
	set client(newClient) {
		this.client = newClient;
	}
}

let PasasBot_Client = new PasasBot(niko_token);

// Export the bot to be useable in other js files
exports.pasasbot_bot = PasasBot_Client;
// Other exports
exports.root_folder = root_folder;
exports.queue = queue;

/* If you want to make more commands (well if I'm making this open source)
 *
 * Make a .js file in cmds, naming it your command name
 * copy paste this code:
 *
module.exports = {
    name: "insert_file_name",
	description: "insert_description_here",
    async execute(args, msg) {
		// Insert code here.
    },
};
*
* Extra parameters:
* altNames: ['alt_name'] -- An array of alternative command names.
* disabled: true -- Disables the command from being used.
* cooldown: 3 -- in seconds, the cooldown.
* cdResponse: 'your response' -- the response of the cooldown
* hidden: true -- Hidden from the help command.
*/
