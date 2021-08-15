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
    const { amount, owner } = req.body;
    const { insertedId } = await writeInvestments({ amount, owner });

    res.status(Created).json({
      message: 'Investment created',
      amount,
      owner,
      investmentId: insertedId,
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  investmentCreate,
};
