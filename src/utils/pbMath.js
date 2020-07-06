module.exports = {
    /**
     * Get a random integer between `min` and `max`.
     * 
     * @param {number} min - min number
     * @param {number} max - max number
     * @return {number} a random integer
     */
    getRandomInt: function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },

    /**
     * Turns money into coins. (150 bal to 1 silver 50 copper)
     * 
     * @param {number} money - money.
     * @return {string} <gold count> gold, <silver count> silver, <copper count> copper
     */
    moneyToCoins: function moneyToCoins(money) {
        let m = money;
        let copper = Math.floor(m % 100);
        let silver = Math.floor((m / 100) % 100);
        let gold = Math.floor((m / 100 / 100));
        
        return `<:goldcoin:728975002950434906> **${gold}**, <:silvercoin:728975002698907669> **${silver}**, <:coppercoin:728975002174488598> **${copper}** coins.`;
    },

    /**
     * Sets a random chance of it being true or false
     * @param {Number} chanceToSucceed - chace to succeed
     * @returns {boolean} true or false
     */
    randomChance: function randomChance(chanceToSucceed) {
        const rndChance = this.getRandomInt(0, 100);

        if (rndChance >= chanceToSucceed) 
            return true;
        else
            return false;
    }, 
};