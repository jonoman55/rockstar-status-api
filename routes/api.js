const express = require('express');

const router = express.Router();

const {
    getAll,
    getApiStatus,
    getServices,
    getService,
    getStatuses,
    getStatus,
    getUpdated
} = require('../controllers/api.controller');

router.get('/', getApiStatus);
router.get('/all', getAll);
router.get('/services', getServices);
router.get('/services/:id', getService);
router.get('/statuses', getStatuses);
router.get('/statuses/:id', getStatus);
router.get('/updated', getUpdated);

module.exports = router;