const { Router } = require("express")
const { check } = require('express-validator')
const router = Router()
const controller = require('../controllers/collectionController')
const isAuthorized = require('../middleware/auth.middleware')

router.get('/my', isAuthorized, controller.getMine)

router.post(
  '/create', 
  [
    isAuthorized, 
    check('name', 'Field name cannot be empty').notEmpty()
  ], 
  controller.create)

router.delete('/:id', isAuthorized, controller.delete)

router.get('/', controller.getAll)

router.get('/:id', controller.getById)

module.exports = router