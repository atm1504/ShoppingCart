const express = require('express');
const {check, body} = require('express-validator/check');
const User = require('../models/user');

const authController = require('../controllers/auth');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post(
    '/login',
    [
      body('email').isEmail().withMessage(
          'Please enter a valid email address.'),
      body('password', 'Password has to be valid.')
          .isLength({min: 5})
          .isAlphanumeric()
    ],
    authController.postLogin);

router.post(
    '/signup',
    [
      check('email')
          .isEmail()
          .withMessage('Please Enter valid email.')
          .custom(
              (value,
               {req}) => {return User.findOne({email: value}).then(userDoc => {
                if (userDoc) {
                  return Promise.reject(
                      'Email Already Exists, please try a different one.');
                }
              })}),
      body(
          'password',
          'Please enter valid password with atleast 5 characters in ALpha numeric form')
          .isLength({min: 5})
          .isAlphanumeric(),
      body('confirmPassword').custom((value, {req}) => {
        if (value !== req.body.password) {
          throw new Error('Passwords field didn\'t match.');
          }
        return true;
      })
    ],
    authController.postSignup);

router.post('/logout', authController.postLogout);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);

module.exports = router;