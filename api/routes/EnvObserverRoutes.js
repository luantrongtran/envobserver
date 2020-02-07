'use strict';

module.exports = function (app) {
    let envObserverController = require('../controllers/EnvObserverController');

    app.route('/envobservers/getdata')
    .get(envObserverController.getDataOfADevice);
    
    app.route('/envobservers')
    .get(envObserverController.listAll)
    .post(envObserverController.registerNewDevice);

    app.route('/envobservers/:id')
    .get(envObserverController.findById);

    app.route('/envobservers/uploaddata')
    .post(envObserverController.uploadData);
}
