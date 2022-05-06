const User = require('../models/User')
const config = require('config')
const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET || config.get('jwtSecret')
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const Role = require('../models/Role')

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

			const {email, password, username} = req.body

			const candidateEmail = await User.findOne({ email: email })
			if (candidateEmail){
				return res.status(400).json({ message: `email ${email} is already registered`})
			}

			const candidateUsername = await User.findOne({ username: username })
			if (candidateUsername){
				return res.status(400).json({ message: `username ${username} is already registered`})
			}
			
			const hashedPassword = await bcrypt.hash(password, 12)
			const userRole = await Role.findOne({value: "USER"})
			const user = new User({ username: username, email: email, password: hashedPassword, roles: [userRole.value]})

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
				return res.status(400).json({ message: `User ${email} not found`})
			}

			const isMatch = await bcrypt.compare(password, user.password)
			if(!isMatch){
				return res.status(400).json({ message: 'Wrong password'})
			}

			const token = jwt.sign(
				{ userId: user.id, roles: user.roles },
				jwtSecret,
				{ expiresIn: '24h' }
			)

			res.json({ token, userId: user.id })

			
		} catch(e){
			res.status(500).json({ message: 'Something wrong, please thy again' })
		}
	}
}
module.exports = new authController()