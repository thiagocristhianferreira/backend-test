const moment = require('moment');
const Boom = require('@hapi/boom');

// models imports
const {
  investmentModel: {
    addInvestment,
    loadAllInvestments,
  }
} = require('../models');

const EMPTY_ARRAY = 0;

const writeInvestments = async (invest) => {
  const { date, months, years } = moment().toObject();
  const dateNow = `${years}/${months}/${date}`;

  if (invest.amount) {
    const { amount } = invest;
    if (typeof amount !== 'number') {
      return Boom.methodNotAllowed('Invalid Amount - Amount must be a Number');
    }
  }

  // Date verification
  if (invest.createdAt) {
    const { createdAt } = invest;
    const dateSplit = createdAt.split('/');
    const dateToCompare = `${dateSplit[2]}-${dateSplit[1]}-${dateSplit[0]}`;
    const dateIsInvalid = moment(Date.parse(dateToCompare))
      .isAfter(Date.parse(dateNow), 'day');
    if (dateIsInvalid)
      return Boom.methodNotAllowed('Invalid Date - No future dates allowed');
  }

  const createdAt = !invest.createdAt ? `${date}/${months}/${years}` : invest.createdAt;
  const result = await addInvestment({ ...invest, createdAt });
  return result;
};

const readAllInvestments = async () => {
  const result = await loadAllInvestments();
  return result;
};

module.exports = {
  writeInvestments,
  readAllInvestments,
};
