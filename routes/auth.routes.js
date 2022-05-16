const { Router } = require("express");
const { check } = require('express-validator')
const router = Router()
const controller = require('../controllers/authController')

router.post(
  '/register',
  [
    check('email', 'Invalid email').isEmail(),
    check('password', 'Minimal password length 8 characters ').isLength({min: 8}),
    check('username', 'Username field cannot be empty').notEmpty()
  ],
  controller.register)


router.post(
  '/login',
  [
    check('email', 'Enter correct email').normalizeEmail().isEmail(),
    check('password', 'Password field cannot be empty').exists()
  ],
  controller.login)

router.post('/logout', controller.logout)

router.get('/refresh', controller.refresh)

module.exports = router