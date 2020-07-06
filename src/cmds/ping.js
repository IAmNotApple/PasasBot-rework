const discord = require('discord.js');
let lowestPing = require('../../database/lowestPing.json');
const logs = require('../utils/logging.js');
const fs = require('fs');
const main = require('../main.js');
const rgbtohex = require('../utils/rgbtohex.js');

module.exports = {
	name: "ping",
    description: "Checks the bot's ping. It will also show the lowest recorded ping.",
    /**
     * 
     * @param {*} args 
     * @param {Message} msg 
     */
	execute(args, msg) {

        if(!lowestPing) lowestPing = { ping: 999999 };

        let start = Date.now();

        let lowPingResponse = '';
        
        msg.channel.send(`Pinging.`).then(m => {
            let ms = Date.now() - start;
            
            // Lowest ping response
            if(ms < lowestPing.ping) {
                lowestPing = { ping: ms };
                fs.writeFile(`${main.root_folder}/database/lowestPing.json`, JSON.stringify(lowestPing), (err) => { if (err) console.error(); });

                lowPingResponse = `New record! (${ms}ms)`;
            }
            else { lowPingResponse = `${lowestPing.ping}ms`; }

            let redPing = Math.min(255, Math.max(0, ms));
            let greenPing = 255 - redPing;
            let embedColor = rgbtohex.fullColorHex(redPing, greenPing, 0);

            const pingEmbed = {
                color: embedColor,
                title: `PasasBot's ping.`,
                description: `PasasBot's ping is: ${ms}ms`,
                fields: [
                    {
                        name: `PasasBot's lowest recorded ping:`,
                        value: lowPingResponse,
                    },
                ],
            };  

            m.edit({ embed: pingEmbed });
        });
	},
};