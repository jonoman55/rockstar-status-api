const express = require('express');
const cors = require('cors');
require('dotenv').config();

const logger = require('./utils/logger');

const httpLogger = require('./middleware/morgan.middleware');
const errorHandler = require('./middleware/error.middleware');
const limiter = require('./middleware/limiter.middleware');

const apiRoutes = require('./routes/api');
const fileRoutes = require('./routes/file');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

app.use(httpLogger);

app.use(express.static(__dirname + '/public'));

app.use('/api', limiter, apiRoutes);
app.use('/file', limiter, fileRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    logger.info(`Server is now listening on port ${PORT}`);
});