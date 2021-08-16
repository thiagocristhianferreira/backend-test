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

const loadAllInvestments = async () => {
  try {
    const db = await connection();
    return db
      .collection(NAME_COLLECTION)
      .find()
      .toArray();
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

const findOwnerInvester = async (owner) => {
  try {
    const db = await connection();
    return await db
      .collection(NAME_COLLECTION)
      .findOne({ owner });
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

const investmentUpdate = async (owner, movimentHistory, balance) => {
  try {
    const db = await connection();
    return await db
      .collection(NAME_COLLECTION)
      .updateOne({ owner }, {
        $set: {
          balance,
        },
        $push: {
          movimentHistory,
        },
      });
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

module.exports = {
  addInvestment,
  loadAllInvestments,
  findOwnerInvester,
  investmentUpdate,
};
