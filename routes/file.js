const router = require('express').Router();
const parseData = require('../helpers/parser');
const data = require('./status.json');

// API File Test Routes 
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

// TODO : remove when testing is done
router.get('/all', (req, res) => {
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

router.get(`/${servicesFile}`, (req, res) => {
    try {
        console.log(`/${servicesFile} called...`);
        const data = fetchFromFileByType(servicesFile);
        res.status(200).json(data);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error });
    }
});

router.get(`/${servicesFile}/:id`, (req, res) => {
    try {
        console.log(`/${servicesFile}/${req.params.id} called...`);
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

router.get(`/${statusesFile}`, (req, res) => {
    try {
        console.log(`/file/${statusesFile} called...`);
        const data = fetchFromFileByType(statusesFile);
        res.status(200).json(data);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error });
    }
});

router.get(`/${statusesFile}/:id`, (req, res) => {
    try {
        console.log(`/${statusesFile}/${req.params.id} called...`);
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

module.exports = router;