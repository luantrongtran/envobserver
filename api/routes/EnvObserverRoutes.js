'use strict';

const express = require('express');
const router = express.Router();
let envObserverController = require('../controllers/EnvObserverController');
const auth = require('../middleware/auth');

router.get('/getData', auth, envObserverController.getDataOfADevice);

router.get('/', auth, envObserverController.listAll);

router.get('/:id', auth, envObserverController.findById);

/**
 * THe following 2 is used by IOT devices
 */
router.post('/', [], envObserverController.registerNewDevice);
router.post('/uploaddata', [], envObserverController.uploadData);

module.exports = router;

// module.exports = function (app) {
//     let envObserverController = require('../controllers/EnvObserverController');

//     app.route('/envobservers/getdata')
//     .get(envObserverController.getDataOfADevice);
    
//     app.route('/envobservers')
//     .get(envObserverController.listAll)
//     .post(envObserverController.registerNewDevice);

//     app.route('/envobservers/:id')
//     .get(envObserverController.findById);

//     app.route('/envobservers/uploaddata')
//     .post(envObserverController.uploadData);
// }
