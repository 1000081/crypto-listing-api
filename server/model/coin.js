const { Number } = require('mongoose');
const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name : {
        type : String,
        required: true,
        unique: true
    },
    symbol : {
        type: String,
        required: true
    },
    description : String,
    logo : String,
    price : mongoose.Decimal128,
    marketCap: mongoose.Decimal128,
    vote: Number,
    coinType: String,
    launchDt: {
        type: Date,
        required: true,
        default: Date.now
    },
    preSale: String,
    contracts : {
        bsc: String,
        ethereum: String,
        polygon: String,
        solana: String
    },
    link : {
        website: String,
        telegram: String,
        twitter: String

    },
    additionalInfo: {
        message: String
    }
})

const CoinModel = mongoose.model('coin', schema);

module.exports = CoinModel;