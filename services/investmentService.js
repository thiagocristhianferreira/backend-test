// models imports
const {
  investmentModel: {
    addInvestment,
  }
} = require('../models');

const writeInvestments = async (invest) => {
  const result = await addInvestment(invest);
  // console.log(result.insertedId);
  return result;
};

module.exports = {
  writeInvestments,
};
