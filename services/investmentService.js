const moment = require('moment');
const Boom = require('@hapi/boom');

// models imports
const {
  investmentModel: {
    addInvestment,
    loadAllInvestments,
    investmentUpdate,
    findOwnerInvester
  }
} = require('../models');

const EMPTY_ARRAY = 0;
const BALANCE_MIN = 0;

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

const getInvestmentsByOwner = async (owner) => {
  const result = await findOwnerInvester(owner);
  return result;
};

const updateInvestments = async (owner, value, pastMovementDate) => {
  const { date, months, years } = moment().toObject();
  let movementDate = `${date}/${months}/${years}`;
  if (pastMovementDate) {
    const {createdAt} = await getInvestmentsByOwner(owner);
    const split = createdAt.split('/');
    const createdAtFromated = `${split[2]}-${split[1]}-${split[0]}`;
    const dateSplit = pastMovementDate.split('/');
    const dateToCompare = `${dateSplit[2]}-${dateSplit[1]}-${dateSplit[0]}`;
    const dateIsInvalid = moment(Date.parse(createdAtFromated))
      .isAfter(Date.parse(dateToCompare), 'day');
    if (dateIsInvalid) {
      return Boom.methodNotAllowed('Dates prior to investment creation are not allowed');
    }
    movementDate = pastMovementDate;
  }

  const movimentHistory = {
    value,
    movementDate,
  };

  const consult = await getInvestmentsByOwner(owner);
  let balance = consult.amount + value;

  if (consult.movimentHistory) {
    consult.movimentHistory.forEach((mov) => {
      balance += mov.value;
    });
  }

  if (balance < BALANCE_MIN) {
    return Boom.badRequest('Insufficient account balance');
  }

  await investmentUpdate(owner, movimentHistory, balance);
  return await getInvestmentsByOwner(owner);
};

module.exports = {
  writeInvestments,
  readAllInvestments,
  getInvestmentsByOwner,
  updateInvestments,
};
