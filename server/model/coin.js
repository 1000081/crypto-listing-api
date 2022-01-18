const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    logo: {
        type: String,
        required: true
    },
    chain: {
        type: String,
        required: true
    },
    presale: String,
    coinType: {
        type: String,
        default: 'LISTED'
    },
    description: {
        type: String,
        required: true
    },
    contAddress: String,
    launchDt: {
        type: Date,
        required: true,
        default: Date.now
    },
    marketCap: String,
    price: String,
    telegram: {
        type: String,
        required: true
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
    listedDt:  {
        type: Date,
        default: Date.now
    }
});

const Coin = mongoose.model('coin', schema);

module.exports = Coin;