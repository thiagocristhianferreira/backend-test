const express = require('express');
const cors = require('cors');

const app = express();

app.use(express());
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

// app.use(routes); routes here

app.listen(PORT, () => console.log('Listening on Port ' + PORT));