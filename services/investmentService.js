const moment = require('moment');

// models imports
const {
  investmentModel: {
    addInvestment,
  }
} = require('../models');

const writeInvestments = async (invest) => {
  const createdAt = moment().format('L');
  const result = await addInvestment({ ...invest, createdAt });
  return result;
};

module.exports = {
  writeInvestments,
};
