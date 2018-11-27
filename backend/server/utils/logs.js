const log4js = require('log4js');

log4js.configure({
    appenders: {
        everything: { type: 'file', filename: `logs/${new Date().toLocaleDateString()}.log` },
    },
    categories: {
        default: { appenders: ['everything'], level: 'info' },
    },
});

const logger = log4js.getLogger(); // logger.info()

module.exports = logger;
