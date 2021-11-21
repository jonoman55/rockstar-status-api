const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

app.use(express.static(__dirname + '/public'));

app.use('/api', require('./routes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
    console.log(`Server is now listening on port ${PORT}`)
);