'use strict';

const jwt = require('jsonwebtoken');
const {JWT_SECRET_KEY} = require('../config/config')
module.exports = function (req, res, next) {
    const token = req.header("token");
    if (!token) return res.status(401).json({ message: "Auth Error" });

    try {
        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        req.user = decoded.user;
        next();
    } catch (e) {
        console.error(e);
        res.status(401).send({ message: "Invalid Token" });
    }
};
