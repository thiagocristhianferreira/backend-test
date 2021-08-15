const { OK } = require('../utils/success');

const checkStatus = async (_req, res) => {
  try {
    res.status(OK).json({message: 'Server Online'});
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  checkStatus,
};