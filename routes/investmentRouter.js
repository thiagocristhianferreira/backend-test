const express = require('express');

// controllers imports
const {
  investmentController: {
    investmentCreate,
    investmentsReader,
  }
} = require('../controllers');

// middlewares imports
const {
  investmentsMiddleware: {
    amountVerification,
    ownerVerification,
  },
} = require('../middlewares');

const investment = express.Router();

// creating CRUD
investment.post('/investment', amountVerification, ownerVerification, investmentCreate);
investment.get('/investment', investmentsReader);
// investment.get('/investment/:id', investmentById);
// investment.put('/investment/:id', investmentUpdate);
// investment.delete('/investment/:id', investmentDelete);

module.exports = investment;