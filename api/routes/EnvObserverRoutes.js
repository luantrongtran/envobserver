'use strict';

const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
let envObserverController = require('../controllers/EnvObserverController');
const auth = require('../middleware/auth');

router.get('/getData', auth, envObserverController.getDataOfADevice);

router.get('/', auth, envObserverController.listAll);

router.put('/', auth, envObserverController.updateDevice);

router.get('/:id', auth, envObserverController.findById);

router.post('/linkDeviceUser', [
    auth,
    check('userId').not().isEmpty().withMessage('userId must not be empty'),
    check('deviceId').not().isEmpty().withMessage('deviceId must not be empty')
], envObserverController.linkDeviceWIthUser);

/**
 * THe following 2 is used by IOT devices
 */
router.post('/', [
    check('userId').not().isEmpty().withMessage('No userId provided')
], envObserverController.registerNewDevice);
router.post('/uploaddata', [], envObserverController.uploadData);

module.exports = router;
