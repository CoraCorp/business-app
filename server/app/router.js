const express = require('express');
const registeredAppsController = require('./controllers/registered-applications.controller');

const router = express.Router();

router.get('/registered-applications', registeredAppsController.getApps);
router.get('/registered-applications/:id', registeredAppsController.getApp);
router.post('/registered-applications', registeredAppsController.postApp);
router.put('/registered-applications/:id', registeredAppsController.putApp);

module.exports = router;
