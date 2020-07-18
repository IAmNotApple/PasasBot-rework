const discord = require('discord.js');
const main = require('../main.js');

module.exports = {
	/**
	 * Gets a user from a mention
	 * @param {discord.User} mention 
	 */
    getUserFromMention: function(mention) {
    	const matches = mention.match(/^<@!?(\d+)>$/);

    	if (!matches) return;

    	const id = matches[1];

    	return main.client.users.cache.get(id);
    },
};
