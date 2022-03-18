const mongoose = require("mongoose");

var schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  logo: {
    type: String,
    required: true,
  },
  chain: {
    type: String,
    required: true,
  },
  presale: String,
  description: {
    type: String,
    required: true,
  },
  contAddress: String,
  launchDt: {
    type: Date,
  },
  marketCap: String,
  price: String,
  telegram: {
    type: String,
    required: true,
  },
  website: String,
  twitter: String,
  reddit: String,
  discord: String,
  otherChains: String,
  dexToools: String,
  swap: String,
  vote: Number,
  symbol: String,
  listedDt: {
    type: Date,
    default: Date.now,
  },
  isPromoted: {
    type: String,
    default: "N",
  },
  isPresale: {
    type: String,
    default: "N",
  },
  isATB: {
    type: String,
    default: "N",
  },
  isNormal: {
    type: String,
    default: "N",
  },
  isListed: {
    type: String,
    default: "Y",
  },
  isNewCoin: {
    type: String,
    default: "N",
  },
  addedBy: {
    type: String,
    default: "",
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
  editedBy: {
    type: String,
    default: "",
  },
  editedAt: {
    type: Date,
    default: Date.now,
  },
  approvedBy: {
    type: String,
    default: "",
  },
  approvedAt: {
    type: Date,
    default: Date.now,
  },
});

const Coin = mongoose.model("coin", schema);

module.exports = Coin;
