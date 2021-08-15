const express = require('express');

// controllers imports
const {
  investmentController: {
    investmentCreate,
  }
} = require('../controllers');

const investment = express.Router();

// creating CRUD
investment.post('/investment', investmentCreate);
// investment.get('/investment', investmentReader);
// investment.get('/investment/:id', investmentById);
// investment.put('/investment/:id', investmentUpdate);
// investment.delete('/investment/:id', investmentDelete);

module.exports = investment;