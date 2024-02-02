const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  riskScore: Number,
  instrumentsWeight: {
    'Nigerian Stocks': Number,
    'Foreign Stocks': Number,
    'Tech Stocks': Number,
    'Emerging Stocks': Number,
    'Nigerian Bonds': Number,
    'Foreign Bonds': Number,
    'Commodities': Number,
    'Real Estate': Number,
    'T-Bills': Number,
    'Alternative': Number,
  },
 
});

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

module.exports = Portfolio;

