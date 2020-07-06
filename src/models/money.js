const mongoose = require("mongoose");

// Money Schema
const moneySchema = mongoose.Schema({
    username: String,
    userID: String,
    balance: Number,
}, { collection: "money" });

module.exports = mongoose.model("Money", moneySchema);