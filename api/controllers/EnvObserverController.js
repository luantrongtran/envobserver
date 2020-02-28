'use strict';

var mongoose = require('mongoose'),
    EnvObserver = mongoose.model('EnvObservers');
var EnvObserverData = mongoose.model('EnvObserverData');
const userModel = mongoose.model('Users');
const {check, validationResult} = require('express-validator');
const {ENVOBSERVER_LIMIT} = require("../config/config");
const jwt = require('jsonwebtoken');

// const DEFAULT_LIMIT = 30;

/**
 * This returns
 * @param req
 * @param res
 */
exports.listAll = function (req, res) {
    const token = req.header('token');
    const decoded = jwt.decode(token);
    const user = decoded.user;

    EnvObserver.find({owner: user.userId}, function (err, envObserver) {
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
    console.log(ENVOBSERVER_LIMIT);

    // extract the device ID in the GET url query named deviceId
    let deviceId = req.query.deviceId;
    // no of records per call
    let limit = parseInt(req.query.limit, 10);
    // if no page submitted
    if (limit === undefined || limit === null || limit === NaN) {
        // load page 1 by default
        limit = ENVOBSERVER_LIMIT;
    }
    console.log(limit);

    let fromDate = req.query.fromDate;


    // find the device matching the deviceId
    let device = EnvObserver.findOne({_id: deviceId}, function (err, envObserver) {
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

                let query = EnvObserverData.find(filter).sort({recorded_at: -1})
                    .lean()
                    .limit(limit);

                query.exec(function (err, obData) {
                    let result = {};
                    result.data = obData;// JSON.stringify(obData);

                    //construct next page link which will show rows recorded after the earliest record.
                    if (result.data.length != 0 && result.data.length === limit) {
                        let lastRecord = result.data[result.data.length - 1];
                        let s = JSON.stringify(lastRecord);
                        let j = JSON.parse(s);
                        let nextPageLink = 'deviceId=' + deviceId;
                        nextPageLink += '&fromDate=' + j.recorded_at;
                        nextPageLink += '&limit=' + limit;

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
    EnvObserver.findOne({_id: newObj.deviceId}, function (err, envObserver) {
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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
        return;
    }

    const {userId} = req.body;
    // checking if a valid userId submitted
    userModel.findOne({_id: userId}).then((user) => {
        let newDevice = new EnvObserver();
        newDevice.owner = userId;
        newDevice.save();
        console.log(newDevice);
        res.json(newDevice);
        return;
    }, errors => {
        res.status(400).json({
            errors: [
                {
                    msg: 'Invalid userId'
                }
            ]
        });
    });
};

exports.findById = function (req, res) {
    var deviceId = req.params.id;
    console.log(deviceId);
    EnvObserver.findOne({_id: deviceId}, {deviceId: 1, name: 1}, function (err, envObserver) {
        if (err) {
        } else {
            res.json(envObserver);
        }
    });

};

exports.linkDeviceWIthUser = function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array()
        });
        return;
    }

    const {userId, deviceId} = req.body;

    userModel.findById(userId, function (error, user) {
        if (error) {
            res.status(400).json({
                errors: [{msg: `Invalid userId [${userId}]`}]
            });
            return;
        } else {
            EnvObserver.findById(deviceId, function (err, envObserver) {
                if (err) {
                    res.status(400).json({
                        errors: [{msg: `Invalid deviceId [${userId}]`}]
                    });
                    return;
                } else {
                    /**
                     * Only allow the owner of the device to transfer the ownership of the device
                     */
                    const decodedToken = jwt.decode(req.header('token'));
                    const loggedInUser = decodedToken.user.userId;
                    if (envObserver.owner.toString() !== loggedInUser) {
                        res.status(400).json({
                            errors: [
                                {
                                    msg: `Only the owner of the device can change the ownership`
                                }
                            ]
                        });
                        return;
                    }

                    envObserver.owner = userId;
                    envObserver.save();
                }
                res.status(201).json();
                return;
            });
        }
    });
};

