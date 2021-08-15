const express = require('express');

// controllers imports
const {
  apiStatusController: {
    checkStatus
  }
} = require('../controllers');

const apiStatus = express.Router();

apiStatus.get('/status', checkStatus);

module.exports = apiStatus;
