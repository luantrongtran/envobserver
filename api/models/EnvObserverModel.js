'use strict';

var mongoose = require("mongoose");
const EnvObserverData = require("../models/EnvObserverDataModel");
const UserModel = require("../models/UserModel");
var Schema  = mongoose.Schema;

var EnvObserver = new Schema({
    name : {
        type: String,
        default: "Unknown"
    },
    data: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EnvObserverData'
    }],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    }
});

module.exports = mongoose.model('EnvObservers', EnvObserver);
