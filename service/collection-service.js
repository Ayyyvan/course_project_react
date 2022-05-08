const ErrorDto = require('../dtos/error-dto')
const Collection = require('../models/Collection')
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
	async delete(id, user) {
		const candidate = await Collection.findOne({_id: id})
		if(!candidate){
			throw new ErrorDto(404, `Collection doesn't exist`)
		}
		const isCollectionOwner = await userService.isCollectionOwner(user, id)
		const isAdmin = await userService.isAdmin(user)
		if(!isAdmin && !isCollectionOwner){
			throw new ErrorDto(403, 'Access denied')
		}
		await Collection.findByIdAndDelete(id)
		await userService.removeCollection(id)
	}
}
module.exports = new CollectionService()