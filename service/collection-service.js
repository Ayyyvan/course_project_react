const ErrorDto = require('../dtos/error-dto')
const Collection = require('../models/Collection')
const User = require('../models/User')
const userService = require('./user-service')

class CollectionService {
	async create(name, description, username) {
			const collection = await Collection.create({name, description, owner: username})
			const user = await userService.addCollection(collection, username)

			return {
				collection,
				user
			}
	}
}
module.exports = new CollectionService()