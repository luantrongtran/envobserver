'use strict';

var mongoose = require("mongoose");
var Schema  = mongoose.Schema;

var EnvObserverData = new Schema ({
    temperature: {
        type: Number
    },
    humidity: {
        type: Number
    }, 
    soil_moisture: {
        type: Number
    },
    recorded_at: {
        type: Date
    }
}, {
    timestamps: {
        createdAt: true
    }
});

module.exports = mongoose.model('EnvObserverData', EnvObserverData);
