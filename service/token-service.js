const jwt = require('jsonwebtoken')
require('dotenv').config()
const JWT_ACCESS_SECRET = process.env.JWT_SECRET
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET
const Token = require('../models/Token')

class TokenService{
	generateTokens(payload) {
		const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, {expiresIn: '24h'})
		const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {expiresIn: '30d'})

		return {
			accessToken,
			refreshToken
		}
	}
	validateAccessToken(accessToken) {
		try{
			const userData = jwt.verify(accessToken, JWT_ACCESS_SECRET)
			return userData
		} catch(e){
			return null
		}
	}

	validateRefreshToken(refreshToken) {
		try{
			const userData = jwt.verify(refreshToken, JWT_REFRESH_SECRET)
			return userData
		} catch(e){
			return null
		}
	}

	async saveToken(userId, refreshToken){
		const tokenData = await Token.findOne({user: userId})
		if(tokenData) {
			tokenData.refreshToken = refreshToken
			return tokenData.save()
		}
		const token = await Token.create({user: userId, refreshToken})
		return token
	}

	async removeToken(refreshToken){
		const tokenData = await Token.findOneAndDelete({refreshToken})
		return tokenData
	}

	async findRefreshToken(refreshToken) {
		const tokenData = await Token.findOne({refreshToken})
		return tokenData
}
}
module.exports = new TokenService()