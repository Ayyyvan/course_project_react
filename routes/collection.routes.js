const { Router } = require("express")
const { check } = require('express-validator')
const router = Router()
const controller = require('../controllers/collectionController')
const isAuthorized = require('../middleware/auth.middleware')

// /api/collection/my
router.post('/my', isAuthorized, controller.getMine)

// /api/collection/create
router.post(
  '/create', 
  [
    isAuthorized, 
    check('name', 'Field name cannot be empty').notEmpty()
  ], 
  controller.create)

router.delete('/:id', isAuthorized, controller.delete)

// /api/collection/
router.get('/', controller.getAll)

// /api/collection/:id
router.get('/:id', controller.getById)

module.exports = router