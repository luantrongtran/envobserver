'use strict';

const express = require('express');
let userController = require('../controllers/UserController');
const { check, validationResult } = require('express-validator');
const router = express.Router();

// module.exports = function (app) {
//     app.route('/users/signup',[
//         check('email', 'please enter a valid email').not().isEmpty()
//     ]).post(userController.signUp);
// }

router.post('/signup', [
    check('password', 'Password length must be at least 6 chars').isLength({ min: 6 }),
    check('email', 'Please enter a valid email').isEmail()
], userController.signUp);

router.post('/signin', [
    check('email').isEmail().withMessage('Invalid email').not().isEmpty().withMessage('Please enter username'),
    check('password', 'Please enter password').not().isEmpty()
], userController.signIn);

module.exports = router;