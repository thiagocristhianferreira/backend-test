const express = require('express');
const cors = require('cors');
require('dotenv').config()

const { investmentRouter } = require('./routes');

const app = express();

app.use(express());
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

// routes here
app.use(investmentRouter);

app.listen(PORT, () => console.log('Listening on Port ' + PORT));