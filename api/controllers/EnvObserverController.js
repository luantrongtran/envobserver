'use strict';

var mongoose = require('mongoose'),
    EnvObserver = mongoose.model('EnvObservers');
var EnvObserverData = mongoose.model('EnvObserverData');

const DEFAULT_LIMIT = 10;

exports.listAll = function (req, res) {
    EnvObserver.find({}, function (err, envObserver) {
        if (err) {
            res.send(err);
        }
        res.json(envObserver);
    });
};

/**
 * This is to get the data of a device (a.k.a EnvObserver)
 */
exports.getDataOfADevice = function (req, res) {
    // extract the device ID in the GET url query named deviceId
    let deviceId = req.query.deviceId;
    // no of records per call
    let limit = req.query.page;
    // if no page submitted
    if (limit === undefined || limit === null) {
        // load page 1 by default
        limit = DEFAULT_LIMIT;
    }

    let fromDate = req.query.fromDate;


    // find the device matching the deviceId
    let device = EnvObserver.findOne({deviceId: deviceId}, function (err, envObserver) {
        if (err) {

        } else {
            if (envObserver !== null) {
                let filter = {_id: envObserver.data};
                if (fromDate !== undefined && fromDate !== null) {
                    let dFromDate = new Date(fromDate);
                    let dateRange = {
                        "$lt": dFromDate
                    };
                    filter.recorded_at = dateRange;
                }

                console.log(filter);

                let query = EnvObserverData.find(filter).sort({createdAt: -1})
                    .lean()
                    .limit(limit);

                query.exec(function (err, obData) {
                    let result = {};
                    result.data = obData;// JSON.stringify(obData);

                    //construct next page link which will show rows recorded after the earliest record.
                    if (result.data.length != 0) {
                        let lastRecord = result.data[result.data.length - 1];
                        let s = JSON.stringify(lastRecord);
                        let j = JSON.parse(s);
                        let nextPageLink = 'deviceId=' + deviceId;
                        nextPageLink += '&fromDate=' + j.createdAt;

                        let link = {};
                        link.href = nextPageLink;
                        link.rel = 'nextPage';
                        link.type = 'GET';

                        let links = {};
                        links.nextPage = link;

                        result.links = links;
                    }


                    res.json(result);
                });
            }
        }
    });

};

/**
 * this is used by devices to upload data (e.g. temperature, humidity, ...)
 *
 */
exports.uploadData = function (req, res) {
    // console.log(req.body);
    var newObj = req.body;
    EnvObserver.findOne({deviceId: newObj.deviceId}, function (err, envObserver) {
        if (err) {
            res.status(500).end();
        } else {
            var newData = new EnvObserverData(newObj.data);
            console.log(newObj);
            if (envObserver !== null) {
                newData.save(function (err, envObserverData) {
                    if (err) {

                    } else {
                        if (envObserverData !== undefined && envObserverData !== null) {

                            envObserver.data.push(envObserverData._id);
                            envObserver.save(function (err, newEnvOb) {
                                // console.log(err);
                            });
                        }
                        res.end();
                    }
                });
            }
            //  envObserver.data.push(newObj.data);
            // envObserver.save();
        }
    });

    res.end();
    // EnvObserver.find({id: }, function (err, envObserver) {

    // })
};

exports.registerNewDevice = function (req, res) {
    var newDevice = new EnvObserver(req.body);
    console.log(newDevice);
    EnvObserver.findOne({deviceId: newDevice.id}, function (err, envObserver) {
        console.log(newDevice.id);
        if (envObserver !== null) {
            res.status(400).end('already registered');
        } else {
            newDevice.save();
            res.end();
        }
    });
};

exports.findById = function (req, res) {
    var deviceId = req.params.id;
    console.log(deviceId);
    EnvObserver.findOne({deviceId: deviceId}, {deviceId: 1, name: 1}, function (err, envObserver) {
        if (err) {
        } else {
            res.json(envObserver);
        }
    });

};
