const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/users');
const guard = require('../../helper/guard');
const {
  validationUser,
  validationUpdateUser,
  validationRepeatVerify,
} = require('./validationUser');
const handleError = require('../../helper/handle-validError');
const uploadAvatar = require('../../helper/upload-avatar');

router.post('/signup', handleError(validationUser), ctrl.signup);
router.post('/login', handleError(validationUser), ctrl.login);
router.post('/logout', guard, ctrl.logout);
router.post('/verify', handleError(validationRepeatVerify), ctrl.repeatVerify);
router.get('/current', guard, ctrl.current);
router.get('/verify/:verificationToken', ctrl.verify);

router.patch(
  '/',
  guard,
  handleError(validationUpdateUser),
  ctrl.updateSubscription,
);
router.patch(
  '/avatars',
  guard,
  uploadAvatar.single('avatar'),
  ctrl.updateAvatar,
);

module.exports = router;
