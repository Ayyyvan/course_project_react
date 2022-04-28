const { Router } = require("express")
const { check } = require('express-validator')
const router = Router()
const controller = require('../controllers/collectionController')
const auth = require('../middleware/auth.middleware')

// /api/collection/my
router.post('/my', auth, controller.getMine)

// /api/collection/create
router.post(
	'/create', 
	[
		auth, 
		check('name', 'Field name cannot be empty').notEmpty()
	], 
	controller.create)

// /api/collection/
router.get('/', controller.getAll)

router.get('/:id', controller.getById)

module.exports = router