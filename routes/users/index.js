const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/users');
const guard = require('../../helper/guard');
const { validationUser, validationUpdateUser } = require('./validationUser');
const handleError = require('../../helper/handle-validError');

router.post('/signup', handleError(validationUser), ctrl.signup);
router.post('/login', handleError(validationUser), ctrl.login);
router.post('/logout', guard, ctrl.logout);
router.get('/current', guard, ctrl.current);
router.patch('/', guard, handleError(validationUpdateUser), ctrl.update);

module.exports = router;
