const Boom = require('@hapi/boom');

const AMOUNT_MIN = 0;
const OWNER_MIN = 3;

const amountVerification = (req, res, next) => {
  try {
    const { amount } = req.body;
    if (!amount) {
      const {
        output: {
          payload: { statusCode, error, message }
        }
      } = Boom.badRequest('You need to provide an amount');

      return res.status(statusCode).json({ statusCode, error, message });
    }

    if (amount < AMOUNT_MIN) {
      const {
        output: {
          payload: { statusCode, error, message }
        }
      } = Boom.badRequest('The amount must be greater than zero (positive)');

      return res.status(statusCode).json({ statusCode, error, message });
    }

    next();
  } catch (error) {
    
  }
};

const ownerVerification = (req, res, next) => {
  try {
    const { owner } = req.body;
    if (!owner) {
      const {
        output: {
          payload: { statusCode, error, message }
        }
      } = Boom.badRequest('You need to provide an owner');

      return res.status(statusCode).json({ statusCode, error, message });
    }

    if (owner.length <= OWNER_MIN) {
      const {
        output: {
          payload: { statusCode, error, message }
        }
      } = Boom.badRequest('The owner must have more than three characters');

      return res.status(statusCode).json({ statusCode, error, message });
    }

    next();
  } catch (error) {
    
  }
};

module.exports = {
  amountVerification,
  ownerVerification,
};
