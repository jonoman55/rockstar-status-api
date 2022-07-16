const asyncHandler = require('express-async-handler');

const { fileTypes } = require('../constants');
const { fetchByType, fetchFromFileByType } = require('../services');
const data = require('../db/status.json');

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

const getAll = (req, res) => {
    res.status(200).json(data);
    try {
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message ? error.message : error
        });
    }
};

const servicesFile = fileTypes[0];
const getServices = (req, res) => {
    try {
        const data = fetchFromFileByType(servicesFile);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message ? error.message : error
        });
    }
};

const getService = (req, res) => {
    try {
        const { id } = req.params;
        const data = fetchFromFileByType(servicesFile);
        const service = data.filter((s) => s.id === Number(id)).shift();
        if (service) res.status(200).json(service);
        else {
            res.status(404).json({
                success: false,
                message: 'Service Not Found'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message ? error.message : error
        });
    }
};

const statusesFile = fileTypes[1];
const getStatuses = (req, res) => {
    try {
        const data = fetchFromFileByType(statusesFile);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message ? error.message : error
        });
    }
};

const getStatus = (req, res) => {
    try {
        const { id } = req.params;
        const data = fetchFromFileByType(statusesFile);
        const status = data.filter((s) => s.id === Number(id)).shift();
        if (status) res.status(200).json(status);
        else {
            res.status(404).json({
                success: false,
                message: 'Status Not Found'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message ? error.message : error
        });
    }
};

const updatedFile = fileTypes[2];
const getUpdated = asyncHandler(async (req, res) => {
    const data = await fetchByType(updatedFile);
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