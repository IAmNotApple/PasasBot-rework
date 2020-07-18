const mongoose = require('mongoose');

/**
 * Item IDs
 * 0 : White Crystal
 * 1 : Blue Crystal
 * 2 : Purple Crystal
 * 3 : Orange Crystal
 */

const inventorySchema = new mongoose.Schema({
    userID: String,
    item0Count: Number,
    item1Count: Number,
    item2Count: Number,
    item3Count: Number,
}, { collection: "inventory" });

module.exports = mongoose.model("Inventory", inventorySchema);