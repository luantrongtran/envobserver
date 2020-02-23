'use strict';

let mongoose = require('mongoose');
let User = mongoose.model('Users');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');
const { JWT_SECRET_KEY } = require('../config/config');
const jwt = require('jsonwebtoken');

exports.signUp = async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
        return;
    }

    const { email, password, confirmPassword } = req.body;
    // checking confirm password
    if (password !== confirmPassword) {
        res.status(400).json({
            errors: [
                {
                    msg: 'Confirm password not match'
                }
            ]
        });
        return;
    }

    // checking if the email has been used
    let existingUser = await User.findOne({ email: email });
    if (existingUser != null) {
        res.status(400).json({
            errors: [
                { msg: 'Email has been used' }
            ]
        });
        return;
    }

    let user = new User();
    user.email = email;

    const salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(password, salt);
    user.password = hashedPassword;

    user.save();

    res.status(201).end();
};

exports.signIn = async function (req, res) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const { email, password } = req.body;

    let user = await User.findOne({ email: email });
    if (user == null) {
        res.status(401).json({
            errors: [
                {
                    msg: "Incorrect email or password"
                }
            ]
        });
        return;
    }

    //compare password
    let b =bcrypt.compareSync(password, user.password);
    if ( b == false) {
        res.status(401).json({
            errors: [
                {
                    msg: "Incorrect email or password"
                }
            ]
        });
        return;
    }

    const payload = {
        user: { userId: user._id }
    };

    jwt.sign(payload, JWT_SECRET_KEY,
        {
            expiresIn: '7d'
        },
        (err, token) => {
            if (err) throw err;

            res.json({
                token: token
            });
        }
    );
};
