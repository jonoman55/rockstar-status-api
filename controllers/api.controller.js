const asyncHandler = require('express-async-handler');

const { types } = require('../constants');
const { fetchByType, fetchData } = require('../services');

const getApiStatus = (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: 'Rockstar Services Status API',
            status: 'UP',
            updated: `${new Date().toLocaleString('en-US', {
                timeZone: 'America/New_York'
            })}`
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error,
            status: 'DOWN',
            updated: `${new Date().toLocaleString('en-US', {
                timeZone: 'America/New_York'
            })}`
        });
    }
};

const getAll = asyncHandler(async (req, res) => {
    const { tz } = req.query;
    const data = await fetchData(tz);
    res.status(200).json(data);
});

const services = types[0];
const getServices = asyncHandler(async (req, res) => {
    const { tz } = req.query;
    const data = await fetchByType(services, tz);
    res.status(200).json(data);
});

const getService = asyncHandler(async (req, res) => {
    const { tz } = req.query;
    const { id } = req.params;
    const data = await fetchByType(services, tz);
    const service = data.filter((s) => s.id === Number(id)).shift();
    if (service) res.status(200).json(service);
    else {
        res.status(404).json({
            success: false,
            message: 'Service Not Found'
        });
    }
});

const statuses = types[1];
const getStatuses = asyncHandler(async (req, res) => {
    const { tz } = req.query;
    const data = await fetchByType(statuses, tz);
    res.status(200).json(data);
});

const getStatus = asyncHandler(async (req, res) => {
    const { tz } = req.query;
    const { id } = req.params;
    const data = await fetchByType(statuses, tz);
    const status = data.filter((s) => s.id === Number(id)).shift();
    if (status) res.status(200).json(status);
    else {
        res.status(404).json({
            success: false,
            message: 'Status Not Found'
        });
    }
});

const updated = types[2];
const getUpdated = asyncHandler(async (req, res) => {
    const { tz } = req.query;
    const data = await fetchByType(updated, tz);
    res.status(200).json({
        updated: data
    });
});

module.exports = {
    getApiStatus,
    getAll,
    getServices,
    getService,
    getStatuses,
    getStatus,
    getUpdated,
};