const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/users');
const guard = require('../../helper/guard');
const { validationUser } = require('./validationUser');
const handleError = require('../../helper/handle-validError');

router.post('/signup', handleError(validationUser), ctrl.signup);
router.post('/login', handleError(validationUser), ctrl.login);
router.post('/logout', guard, ctrl.logout);

module.exports = router;
