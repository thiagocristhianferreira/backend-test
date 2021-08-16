// services imports
const {
  investmentService: {
    writeInvestments,
    readAllInvestments,
    // findOwner,
    updateInvestments,
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

    if (result.output && result.output.payload) {
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

const investmentsUpdate = async (req, res) => {
  try {
    const { value, pastMovementDate } = req.body;
    const { owner } = req.params;
    const updateInvest = await updateInvestments(owner, value, pastMovementDate);

    if (updateInvest.output && updateInvest.output.payload) {
      const { statusCode, error, message } = updateInvest.output.payload;
      return res.status(statusCode).json({
        statusCode,
        error,
        message,
      });
    }

    res.status(OK).json({ updateInvest });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  investmentCreate,
  investmentsReader,
  investmentsUpdate,
};
