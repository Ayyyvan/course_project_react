const Router = require('express')
const router = new Router()

router.use('/auth', require('./auth.routes'))
router.use('/collection', require('./collection.routes'))
router.use('/user', require('./user.routes'))

module.exports = router