const router = require('express').Router();
const fetchData = require('../services');
const parseData = require('../helpers/parser');
const data = require('./status.json');

// API File Test Routes 
// TODO : remove when testing is done
router.get('/file/all', (req, res) => {
    console.log('/file/all called...');
    res.status(200).json(data);
});

const fileTypes = ['services', 'statuses'];

const fetchFromFileByType = (type) => {
    if (type === fileTypes[0]) {
        const { services } = data;
        return services.map((service) => parseData(service, type));
    }
    if (type === fileTypes[1]) {
        const { statuses } = data;
        return statuses.map((status) => parseData(status, type));
    }
};

const servicesFile = fileTypes[0];

router.get(`/file/${servicesFile}`, (req, res) => {
    try {
        console.log(`/file/${servicesFile} called...`);
        const data = fetchFromFileByType(servicesFile);
        res.status(200).json(data);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error });
    }
});

router.get(`/file/${servicesFile}/:id`, (req, res) => {
    try {
        console.log(`/file/${servicesFile}/${req.params.id} called...`);
        const data = fetchFromFileByType(servicesFile);
        const service = data.filter((s) =>
            s.id === Number(req.params.id)
        );
        res.status(200).json(service);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error });
    }
});

const statusesFile = fileTypes[1];

router.get(`/file/${statusesFile}`, (req, res) => {
    try {
        console.log(`/file/${statusesFile} called...`);
        const data = fetchFromFileByType(statusesFile);
        res.status(200).json(data);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error });
    }
});

router.get(`/file/${statusesFile}/:id`, (req, res) => {
    try {
        console.log(`/file/${statusesFile}/${req.params.id} called...`);
        const data = fetchFromFileByType(statusesFile);
        const status = data.filter((s) =>
            s.id === Number(req.params.id)
        );
        res.status(200).json(status);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error });
    }
});

// API Routes
router.get('/', (req, res) => {
    console.log('/ called...');
    try {
        res.status(200).json({
            success: true,
            message: 'Rockstar Services Status API',
            status: 'UP',
            updated: `${new Date().toLocaleString()}`
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error,
            status: 'DOWN',
            updated: `${new Date().toLocaleString()}`
        });
    }
});

// TODO : Add TimeZone query param to the rest of the routes
router.get(`/all`, async (req, res) => {
    try {
        console.log('/all called...');
        const { tz } = req.query;
        const data = await fetchData(tz);
        res.status(200).json(data);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error });
    }
});

const types = ['services', 'statuses'];

const fetchByType = async (type) => {
    if (type === types[0]) {
        const { services } = await fetchData();
        return services.map((service) => parseData(service, type));
    }
    if (type === types[1]) {
        const { statuses } = await fetchData();
        return statuses.map((status) => parseData(status, type));
    }
};

const services = types[0];

router.get(`/${services}`, async (req, res) => {
    try {
        console.log(`/${services} called...`);
        const data = await fetchByType(services);
        res.status(200).json(data);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error });
    }
});

router.get(`/${services}/:id`, async (req, res) => {
    try {
        console.log(`/${services}/${req.params.id} called...`);
        const data = await fetchByType(services);
        const service = data.filter((s) =>
            s.id === Number(req.params.id)
        );
        res.status(200).json(service);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error });
    }
});

const statuses = types[1];

router.get(`/${statuses}`, async (req, res) => {
    try {
        console.log(`/${statuses} called...`);
        const data = await fetchByType(statuses);
        res.status(200).json(data);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error });
    }
});

router.get(`/${statuses}/:id`, async (req, res) => {
    try {
        console.log(`/${statuses}/${req.params.id} called...`);
        const data = await fetchByType(statuses);
        const status = data.filter((s) =>
            s.id === Number(req.params.id)
        );
        res.status(200).json(status);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error });
    }
});

module.exports = router;