const User = require("../models/User")
const Role = require("../models/Role")
const bcrypt = require("bcryptjs")
const tokenService = require("./token-service")
const UserDto = require("../dtos/user-dto")
const ErrorDto = require("../dtos/error-dto")

class UserService {
	async registration(email, username, password){

			const candidateEmail = await User.findOne({ email: email })
			if (candidateEmail){
				throw new ErrorDto(400, `email '${email}' is already registered`)
			}

			const candidateUsername = await User.findOne({ username: username })
			if (candidateUsername){
				throw new ErrorDto(400, `username '${username}' is already registered`)
			}
			
			const hashedPassword = await bcrypt.hash(password, 12)
			const userRole = await Role.findOne({value: "USER"})
			const user = await User.create({ 
				username: username, 
				email: email, 
				password: hashedPassword, 
				roles: [userRole.value]
			})
			const userDto = new UserDto(user) // id, email, roles, username

			const tokens = tokenService.generateTokens({...userDto})
			await tokenService.saveToken(userDto.id, tokens.refreshToken)

			return {...tokens, user: userDto}
	}
	
	async login(email, password){
		const user = await User.findOne({ email: email })
			if(!user){
				throw new ErrorDto(400, `User '${email}' not found`)
			}

			const isMatch = await bcrypt.compare(password, user.password)
			if(!isMatch){
				throw new ErrorDto(400, 'Wrong password')
			}
			const userDto = new UserDto(user) // id, email, roles, username

			const tokens = tokenService.generateTokens({...userDto})
			await tokenService.saveToken(userDto.id, tokens.refreshToken)

			return {...tokens, ...userDto}
	}

	async addCollection(collection, username){
		const user = await User.findOneAndUpdate(
			{	username: username}, 
			{ $push:{ collections : collection._id} })
		return user
	}

	async removeCollection(collectionId){
		const updatedUser = await User.findOneAndUpdate(
				{collections: collectionId}, 
				{$pull: {collections : collectionId}}
			)
			return(updatedUser)
	}

	async isCollectionOwner(user, collectionId){
		const owner = await User.exists({_id: user.id, collections: collectionId})
		return owner ? true : false
	}

	async isAdmin(user){
		const admin = await User.exists({_id: user.id, roles: 'ADMIN'})
		return admin? true : false
	}
}
module.exports = new UserService()