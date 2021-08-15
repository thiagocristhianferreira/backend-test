const connection = require('../connection/connection');

const { NAME_COLLECTION } = process.env;

const addInvestment = async (investment) => {
  try {
    const db = await connection();
    return await db
      .collection(NAME_COLLECTION)
      .insertOne(investment);
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

module.exports = {
  addInvestment,
};
