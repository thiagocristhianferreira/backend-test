const express = require('express');

// controllers imports
const {
  investmentController: {
    investmentCreate,
    investmentsReader,
    investmentsUpdate,
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

// CRUD
investment.post('/investment', amountVerification, ownerVerification, investmentCreate);
investment.get('/investment', investmentsReader);
// investment.get('/investment/:owner', investmentById);
investment.put('/investment/:owner', investmentsUpdate);

// investment.delete('/investment/:owner', investmentDelete);

module.exports = investment;