const axios = require('axios').default;

const url = (tz) => `https://support.rockstargames.com/services/status.json?tz=${tz}`;

const fetchData = async (tz) => {
    try {
        const { data } = await axios.get(url(tz ? tz : 'America/New_York'));
        return data;
    } catch (error) {
        console.log(error);
    }
};

module.exports = fetchData;