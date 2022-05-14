const { Router } = require("express");
const router = Router()
const controller = require('../controllers/userController')

router.get('/:id', controller.getById)

router.get('/all', controller.getAll)

module.exports = router