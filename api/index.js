const express = require("express")
const app = express()
const mongoose = require("mongoose")
const Portfolio = require('./Portfolio');
const cors = require('cors')


mongoose.connect("mongodb+srv://michaeliskingbd:michaeliskingbd@cluster0.h7ytdo9.mongodb.net/?retryWrites=true&w=majority").then(console.log('DataBase connected')) .catch((err) => console.log(err));

app.use(express.json());
app.use(cors());

const Data = [
  { riskScore: 0, instrumentsWeight: { 'Nigerian Stocks': 18, 'Foreign Stocks': 4, 'Tech Stocks': 2, 'Emerging Stocks': 7, 'Nigerian Bonds': 35, 'Foreign Bonds': 15, 'Commodities': 7, 'Real Estate': 12, 'T-Bills': 0, 'Alternative': 0 } },
  { riskScore: 1, instrumentsWeight: { 'Nigerian Stocks': 20, 'Foreign Stocks': 5, 'Tech Stocks': 3, 'Emerging Stocks': 7, 'Nigerian Bonds': 35, 'Foreign Bonds': 6, 'Commodities': 12, 'Real Estate': 12, 'T-Bills': 0, 'Alternative': 0 } },
  { riskScore: 2, instrumentsWeight: { 'Nigerian Stocks': 23, 'Foreign Stocks': 5, 'Tech Stocks': 4, 'Emerging Stocks': 7, 'Nigerian Bonds': 35, 'Foreign Bonds': 14, 'Commodities': 12, 'Real Estate': 0, 'T-Bills': 0, 'Alternative': 0 } },
  { riskScore: 3, instrumentsWeight: { 'Nigerian Stocks': 26, 'Foreign Stocks': 6, 'Tech Stocks': 4, 'Emerging Stocks': 7, 'Nigerian Bonds': 35, 'Foreign Bonds': 10, 'Commodities': 12, 'Real Estate': 0, 'T-Bills': 0, 'Alternative': 0 } },
  { riskScore: 4, instrumentsWeight: { 'Nigerian Stocks': 29, 'Foreign Stocks': 7, 'Tech Stocks': 5, 'Emerging Stocks': 6, 'Nigerian Bonds': 35, 'Foreign Bonds': 6, 'Commodities': 12, 'Real Estate': 0, 'T-Bills': 0, 'Alternative': 0 } },
  { riskScore: 5, instrumentsWeight: { 'Nigerian Stocks': 31, 'Foreign Stocks': 8, 'Tech Stocks': 6, 'Emerging Stocks': 5, 'Nigerian Bonds': 35, 'Foreign Bonds': 3, 'Commodities': 12, 'Real Estate': 0, 'T-Bills': 0, 'Alternative': 0 } },
  { riskScore: 6, instrumentsWeight: { 'Nigerian Stocks': 35, 'Foreign Stocks': 8, 'Tech Stocks': 7, 'Emerging Stocks': 3, 'Nigerian Bonds': 35, 'Foreign Bonds': 12, 'Commodities': 0, 'Real Estate': 0, 'T-Bills': 0, 'Alternative': 0 } },
  { riskScore: 7, instrumentsWeight: { 'Nigerian Stocks': 45, 'Foreign Stocks': 13, 'Tech Stocks': 12, 'Emerging Stocks': 7, 'Nigerian Bonds': 23, 'Foreign Bonds': 0, 'Commodities': 0, 'Real Estate': 0, 'T-Bills': 0, 'Alternative': 0 } },
  { riskScore: 8, instrumentsWeight: { 'Nigerian Stocks': 45, 'Foreign Stocks': 15, 'Tech Stocks': 15, 'Emerging Stocks': 9, 'Nigerian Bonds': 16, 'Foreign Bonds': 0, 'Commodities': 0, 'Real Estate': 0, 'T-Bills': 0, 'Alternative': 0 } },
  { riskScore: 9, instrumentsWeight: { 'Nigerian Stocks': 45, 'Foreign Stocks': 18, 'Tech Stocks': 17, 'Emerging Stocks': 11, 'Nigerian Bonds': 9, 'Foreign Bonds': 0, 'Commodities': 0, 'Real Estate': 0, 'T-Bills': 0, 'Alternative': 0 } },
  { riskScore: 10, instrumentsWeight: { 'Nigerian Stocks': 45, 'Foreign Stocks': 20, 'Tech Stocks': 19, 'Emerging Stocks': 14, 'Nigerian Bonds': 2, 'Foreign Bonds': 0, 'Commodities': 0, 'Real Estate': 0, 'T-Bills': 0, 'Alternative': 0 } },
];

Portfolio.find().then((result) => {
  if (result.length === 0) {
      Portfolio.insertMany(Data)
          .then(() => {
              console.log('Data uploaded successfully');
          })
          .catch((error) => {
              console.error('Error uploading data:', error);  
          });
  } else {
      console.log('Data already exists. No need to upload.');
  }

}).catch((error) => {
  console.error('Error checking data:', error);

});
    app.get('/api/portfolio/:riskScore', async (req, res) => {
      const { riskScore } = req.params;
    
      try {
        const portfolio = await Portfolio.findOne({ riskScore: riskScore });
    
        if (!portfolio) {
          return res.status(404).json({ error: 'Portfolio not found' });
        }
        res.json(portfolio);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });
app.listen(5000, () => {
  console.log("Port is listening");
});