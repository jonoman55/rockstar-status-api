const axios = require('axios').default;

const { types, fileTypes } = require('../constants');
const parseData = require('../helpers/parser');
const logger = require('../utils/logger');
const data = require('../db/status.json');

const createUrl = (tz) => `https://support.rockstargames.com/services/status.json?tz=${tz}`;

const fetchData = async (tz) => {
    try {
        const url = createUrl(tz ? tz : 'America/New_York');
        const { data } = await axios.get(url);
        return data;
    } catch (error) {
        logger.error(error);
        return null;
    }
};

const fetchFromFileByType = (type) => {
    if (type === fileTypes[0]) {
        const { services } = data;
        return services.map((service) => parseData(service, type));
    }
    if (type === fileTypes[1]) {
        const { statuses } = data;
        return statuses.map((status) => parseData(status, type));
    }
    if (type === fileTypes[2]) {
        const { updated } = data;
        return updated;
    }
};

const fetchByType = async (type, tz) => {
    try {
        if (type === types[0]) {
            const { services } = await fetchData(tz);
            return services.map((service) => parseData(service, type));
        }
        if (type === types[1]) {
            const { statuses } = await fetchData(tz);
            return statuses.map((status) => parseData(status, type));
        }
        if (type === types[2]) {
            const { updated } = await fetchData(tz);
            return updated;
        }   
    } catch (error) {
        logger.error(error);
        return error;
    }
};

module.exports = {
    fetchData,
    fetchByType,
    fetchFromFileByType
};