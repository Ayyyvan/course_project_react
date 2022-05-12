const { Router } = require("express")
const { check } = require('express-validator')
const router = Router()
const controller = require('../controllers/itemController')
const isAuthorized = require('../middleware/auth.middleware')

router.post('/create', controller.add)
router.get('/', controller.getAll)
router.get('/:id', controller.getById)
router.delete('/:id', controller.deleteById)

module.exports = router