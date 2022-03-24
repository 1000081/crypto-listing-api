const mongoose = require("mongoose");

var schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  },
  type: {
    type: String,
    default: "USER",
  },
  votes: [
    {
      coin: {
        type: String,
        required: true,
      },
      votedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const User = mongoose.model("user", schema);

module.exports = User;
