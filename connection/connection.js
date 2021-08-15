const { MongoClient } = require('mongodb');

const {
  MONGO_DB_URL,
  DB_NAME,
} = process.env;

const connection = () => {
  return MongoClient.connect(MONGO_DB_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
    .then((connection) => connection.db(DB_NAME))
    .catch((err) => {
      console.error(err);
      process.exit();
    });
};

module.exports = connection;
