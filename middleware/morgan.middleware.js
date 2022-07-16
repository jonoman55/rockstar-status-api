const morgan = require('morgan');

const logger = require('../utils/logger');

const isDevelopment = process.env.NODE_ENV === 'development' ? true : false;

const loggerStream = {
    write: (message) => {
        logger.http(message.replace(/\n$/, ''));
    }
};

const httpLogger = morgan(
    isDevelopment ? 'tiny' : 'combined',
    { stream: loggerStream, skip: () => !isDevelopment }
);

module.exports = httpLogger;