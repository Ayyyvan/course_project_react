const { Router } = require("express");
const { check } = require('express-validator')
const router = Router()
const controller = require('../controllers/authController')

// /api/auth/register
router.post(
	'/register',
	[
		check('email', 'Invalid email').isEmail(),
		check('password', 'Minimal password length 8 characters ').isLength({min: 8})
	],
	controller.register)

// /api/auth/login
router.post(
	'/login',
	[
		check('email', 'Enter correct email').normalizeEmail().isEmail(),
		check('password', 'Enter password ').exists()
	],
	controller.login)

module.exports = router