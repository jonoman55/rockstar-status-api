const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.label({ label: 'rockstar-status-api' }),
        winston.format.timestamp(),
        winston.format.printf(
            (info) => `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`
        ),
    ),
    defaultMeta: { service: 'rockstar-status-api' },
    transports: [
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true,
            format: winston.format.combine(
                winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
                winston.format.colorize(),
                winston.format.printf(
                    (info) => `${info.timestamp} ${info.level}: ${info.message}`
                ),
            ),
        }),
    ],
    exitOnError: false,
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.File({
        level: 'debug',
        filename: 'logs/debug.log',
        handleExceptions: true,
        json: false,
        maxsize: 10485760,
        maxFiles: 1,
        colorize: false,
    }));
}

module.exports = logger;