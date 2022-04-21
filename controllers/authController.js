const User = require('../models/User')
const config = require('config')
const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET || config.get('jwtSecret')
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')

class authController{

	async register(req, res) {
		try{
			const errors = validationResult(req)

			if(!errors.isEmpty()){
				return res.status(400).json({
					errors: errors.array(),
					message: 'Invalid registration data'
				})
			}

			const {email, password} = req.body

			const candidate = await User.findOne({ email: email })

			if (candidate){
				return res.status(400).json({ message: 'This user already exist'})
			}
			
			const hashedPassword = await bcrypt.hash(password, 12)
			const user = new User({ email: email, password: hashedPassword})

			await user.save()

			res.status(201).json({ message: 'User has been registered'})


		} catch(e){
			res.status(500).json({ message: 'Something wrong, please thy again' })
		}
	}

	async login(req, res) {
		try{
			const errors = validationResult(req)

			if(!errors.isEmpty()){
				return res.status(400).json({
					errors: errors.array(),
					message: 'Invalid login data'
				})
			}

			const {email, password} = req.body
			
			const user = await User.findOne({ email: email })
			if(!user){
				return res.status(400).json({ message: 'User not found'})
			}

			const isMatch = await bcrypt.compare(password, user.password)
			if(!isMatch){
				return res.status(400).json({ message: 'Wrong password'})
			}

			const token = jwt.sign(
				{ userId: user.id},
				jwtSecret,
				{ expiresIn: '1h' }
			)

			res.json({ token, userId: user.id })

			
		} catch(e){
			res.status(500).json({ message: 'Something wrong, please thy again' })
		}
	}
}
module.exports = new authController()