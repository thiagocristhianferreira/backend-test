// services imports
const {
  investmentService: {
    writeInvestments,
    readAllInvestments,
  }
} = require('../services');

const {
  Created,
  OK,
} = require('../utils/success');

const investmentCreate = async (req, res) => {
  try {
    const { body } = req;
    const result = await writeInvestments(body);

    if (result.output.payload) {
      const { statusCode, error, message } = result.output.payload;
      return res.status(statusCode).json({
        statusCode,
        error,
        message,
      });
    }

    const { ops } = result;
    const { _id, amount, owner, createdAt } = ops[0];

    res.status(Created).json({
      message: 'Investment created',
      investmentId: _id,
      amount,
      owner,
      createdAt,
    });
  } catch (error) {
    console.error(error);
  }
};

const investmentsReader = async (req, res) => {
  try {
    const allInvestments = await readAllInvestments();
    res.status(OK).json({ allInvestments });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  investmentCreate,
  investmentsReader,
};
