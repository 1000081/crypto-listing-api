const mongoose = require("mongoose");

var schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  votedAt: {
    type: Date,
    default: Date.now,
  },
});

const Vote = mongoose.model("vote", schema);

module.exports = Vote;
