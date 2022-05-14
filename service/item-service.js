const Collection = require('../models/Collection')
const Item = require('../models/Item')
const collectionService = require('./collection-service')

class ItemService{
  async create(itemName, collection){
    const item = await Item.create({name: itemName, owner: collection._id})
    const updatedCollection = await collectionService.addItem(collection._id, item)

    return {item, updatedCollection}
  }

  async delete(itemId, collection){
    const deletedItem = await Item.findByIdAndDelete(itemId)
    const updatedCollection = await collectionService.removeItem(collection.id, deletedItem)
    
    return {deletedItem, updatedCollection}
  }

  async getById(itemId){
    const item = await Item.findById(itemId)
    return item
  }
}
module.exports = new ItemService()