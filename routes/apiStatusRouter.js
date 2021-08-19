const express = require('express');

// controllers imports
const {
  apiStatusController: {
    checkStatus
  }
} = require('../controllers');

const apiStatus = express.Router();

apiStatus.get('/', checkStatus);

module.exports = apiStatus;
