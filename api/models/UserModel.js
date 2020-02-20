'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UserSchema = new Schema({
    email: {
        type: String
    },
    password: {
        type: String
    }, 
    created_at: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Users', UserSchema);