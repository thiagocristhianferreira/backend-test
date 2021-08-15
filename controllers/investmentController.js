// services imports
const {
  investmentService: {
    writeInvestments,
  }
} = require('../services');

const {
  Created,
} = require('../utils/success');

const investmentCreate = async (req, res) => {
  try {
    const { body } = req;
    const { ops } = await writeInvestments(body);
    const { _id, amount, owner } = ops[0];

    res.status(Created).json({
      message: 'Investment created',
      amount,
      owner,
      investmentId: _id,
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  investmentCreate,
};
