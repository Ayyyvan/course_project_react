const ErrorDto = require('../dtos/error-dto')
const Collection = require('../models/Collection')
const UserService = require('./user-service')

class CollectionService {
  async create(name, description, username) {
    const collection = await Collection.create({name, description, owner: username})
    const user = await UserService.addCollection(collection, username)
    return {
      collection,
      user
    }
  }

  async delete(id, user) {
    const isCanEdit = await UserService.isCanEdit(user, id)
    if(!isCanEdit){
      throw new ErrorDto(403, 'Access denied')
    }

    await Collection.findByIdAndDelete(id)
  }

  async addItem(id, item) {
    const updatedCollection = await Collection.findByIdAndUpdate(id, {$push : {items: item._id}}, {new: true})
    return updatedCollection
  }

  async removeItem(id, item){
    const updatedCollection = await Collection.findByIdAndUpdate(id, {$pull: {items: item._id}}, {new: true})
    return updatedCollection
  }

  async findById(id){
    const collection = await Collection.findById(id)
    if(!collection){
      return null
    }
    return collection
  }

  async findByUsername(username){
    const collections = await Collection.find({ owner: username })
    return collections
  }

  async findAll(){
    const collections = await Collection.find()
    return collections
  }
}
module.exports = new CollectionService()