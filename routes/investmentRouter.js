const express = require('express');

// controllers imports
const {
  investmentController: {
    investmentCreate,
    investmentsReader,
    investmentsUpdate,
    investmentByOwner,
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
investment.get('/investment/:owner', investmentByOwner);
investment.put('/investment/:owner', investmentsUpdate);

// investment.delete('/investment/:owner', investmentDelete); // To remove investment - Not required

module.exports = investment;