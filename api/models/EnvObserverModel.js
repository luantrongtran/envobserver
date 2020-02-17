'use strict';

var mongoose = require("mongoose");
const EnvObserverData = require("../models/EnvObserverDataModel")
var Schema  = mongoose.Schema;

var EnvObserver = new Schema({
    name : {
        type: String,
        default: "Unknown"
    },
    data: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EnvObserverData'
    }]
});

module.exports = mongoose.model('EnvObservers', EnvObserver);