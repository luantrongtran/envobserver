// config.js
const dotenv = require('dotenv');
dotenv.config();

const ENVOBSERVER_LIMIT = parseInt(process.env.ENVOBSERVER_LIMIT, 10) || 30;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
module.exports = {
    ENVOBSERVER_LIMIT,
    JWT_SECRET_KEY
};
