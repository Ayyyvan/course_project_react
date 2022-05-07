require('dotenv').config()
const { validationResult } = require('express-validator')
const userService = require('../service/user-service')
const ErrorDto = require('../dtos/error-dto')

class authController{

	async register(req, res, next) {
		try{
			const errors = validationResult(req)
			if(!errors.isEmpty()){
				return next(ErrorDto(400, 'Invalid registration data', errors.array()))
			}

			const {email, password, username} = req.body
			const userData = await userService.registration(email, username, password)
			
			return res.json(userData)
		} catch(e){
			next(e)
		}
	}

	async login(req, res, next) {
		try{
			const errors = validationResult(req)

			if(!errors.isEmpty()){
				return next(ErrorDto(400, 'Invalid login data', errors.array()))
			}

			const {email, password} = req.body
			const userData = await userService.login(email, password)
			
			res.json({ token: userData.accessToken, userId: userData.id })
		} catch(e){
			next(e)
		}
	}
}
module.exports = new authController()