require('dotenv').config()
const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET
/*
Для установки доступа по роли включить middleware в роут

пример: 
const roleMiddleware = require('../middleware/role.middleware')
...
router.get('/', roleMiddleware(['USER']), controller.action)
**/

module.exports = function(roles) {
	return function(req, res, next) {
		if (req.method === 'OPTIONS'){
			return next()
		}

		try{

			const token = req.headers.authorization.split(' ')[1]

			if(!token){
				res.status(401).json({ message: 'No authorization'})
			}

			const {roles: userRoles} = jwt.verify(token, jwtSecret)
			let hasRole = false
			userRoles.forEach(role => {
				if(roles.includes(role)){
					hasRole = true
				}
			})

			if(!hasRole){
				res.status(403).json({ message: 'Access is denied'})
			}

			next()

		} catch(e){
			res.status(401).json({ message: 'No authorization'})
		}
	}	
}