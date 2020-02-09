// config.js
const dotenv = require('dotenv');
dotenv.config();

const ENVOBSERVER_LIMIT = parseInt(process.env.ENVOBSERVER_LIMIT, 10) || 30;
module.exports = {
    ENVOBSERVER_LIMIT
};
