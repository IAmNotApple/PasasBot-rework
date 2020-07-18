const mongoose = require("mongoose");

// Money Schema
const safeSchema = mongoose.Schema({
    userID: String,
    safeBalance: Number,
    safeMaxBalance: Number,
}, { collection: "safe" });

module.exports = mongoose.model("Safe", safeSchema);