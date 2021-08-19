const moment = require('moment');
const Boom = require('@hapi/boom');
const cron = require('node-cron');

// models imports
const {
  investmentModel: {
    addInvestment,
    loadAllInvestments,
    investmentUpdate,
    findOwnerInvester,
    getAllInvestors,
  }
} = require('../models');

const PAYMENT_RATE = 0.0052;
const ZERO_TO_COMPARE = 0;

const writeInvestments = async (invest) => {
  const { date, months, years } = moment().toObject();// possible refactoring - code repeated
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
  const balance = invest.amount;
  const movimentHistory = [];
  const result = await addInvestment({ ...invest, createdAt, balance, movimentHistory });
  // Income payment scheduling
  cronJobs(createdAt);
  return result;
};

const readAllInvestments = async () => {
  const result = await loadAllInvestments();
  return result;
};

const getInvestmentsByOwner = async (owner) => {
  const result = await findOwnerInvester(owner);

  if (!result) {
    return Boom.notFound('Owner not found').output.payload;
  }

  return result;
};

const updateInvestments = async (owner, value, pastMovementDate) => {
  const { date, months, years } = moment().toObject();// possible refactoring - code repeated
  let movementDate = `${date}/${months}/${years}`;
  const consult = await getInvestmentsByOwner(owner);

  if (consult.error) {
    return Boom.notFound('Owner not found').output.payload;
  }

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

  let movimentHistory = { value, movementDate };

  let balance = consult.amount + value;

  if (consult.movimentHistory) {
    consult.movimentHistory.forEach((mov) => {
      balance += mov.value;
    });
  }

  if (value < ZERO_TO_COMPARE) {
    const { createdAt } = consult;
    const ONE_YEAR_DURATION = 1;
    const TWO_YEARS_DURATION = 2;
    const RATE_LESS_THAN_ONE_YEAR = 0.225;
    const RATE_BETWEEN_ONE_TWO_YEARS = 0.185;
    const RATE_MORE_THAN_TWO_YEARS = 0.15;
    const split = createdAt.split('/');
    const createdAtFromated = moment((`${split[2]}-${split[1]}-${split[0]}`));
    const now = moment((`${years}-${months}-${date}`));
    const duration = moment.duration(now.diff(createdAtFromated));
    const yearInNumber = duration.asYears();

    if (yearInNumber < ONE_YEAR_DURATION) {
      const tax = value * RATE_LESS_THAN_ONE_YEAR;
      balance += tax;
      console.log('22%');
      movimentHistory = { value, movementDate, tax };
    }
    if (yearInNumber >= ONE_YEAR_DURATION && duration <= TWO_YEARS_DURATION) {
      const tax = value * RATE_BETWEEN_ONE_TWO_YEARS;
      balance += tax;
      console.log('18%');
      movimentHistory = { value, movementDate, tax };
    }
    if (yearInNumber > TWO_YEARS_DURATION) {
      const tax = value * RATE_MORE_THAN_TWO_YEARS;
      balance += tax;
      console.log('15%');
      movimentHistory = { value, movementDate, tax };
    }
  }

  if (balance < ZERO_TO_COMPARE) {
    return Boom.badRequest('Insufficient account balance');
  }

  await investmentUpdate(owner, movimentHistory, balance);
  const result = await getInvestmentsByOwner(owner);
  return result;
};

// income scheduling
const cronJobs = async (dayCreatedAt) => {
  const dateDay = dayCreatedAt.split('/')[0];
  // Will run once a month
  // It will be executed on the day of investment creation
  cron.schedule(`0 0 ${dateDay} * *`, async() => {
    const { months, years } = moment().toObject();// possible refactoring - code repeated
    const scheduleDate = `${dateDay}/${months}/${years}`;
    // scheduleDate = SD
    const splitSD = scheduleDate.split('/');
    const scheduleDateFromated = `${splitSD[2]}-${splitSD[1]}-${splitSD[0]}`;
    // last month = LM
    const scheduleDateLM = `${dateDay}/${months - 1}/${years}`;

    const {owner, balance, movimentHistory} = await getAllInvestors();
    const cashoutCheck = movimentHistory
      .some(moviment => {
        moment(Date.parse(moviment.movementDate))
          .isAfter(Date.parse(scheduleDateLM), 'day')
        && moment(Date.parse(moviment.movementDate))
          .isBefore(Date.parse(scheduleDateFromated), 'day')
        && moviment.value < ZERO_TO_COMPARE;
      });
    const updateBalance = balance * PAYMENT_RATE;
    if (!cashoutCheck) {
      await updateInvestments(owner, updateBalance);
    }
  });
};

module.exports = {
  writeInvestments,
  readAllInvestments,
  getInvestmentsByOwner,
  updateInvestments,
};
