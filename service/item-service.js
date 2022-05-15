const Collection = require('../models/Collection')
const Item = require('../models/Item')
const collectionService = require('./collection-service')

class ItemService{
  async create(itemInfo, collection){
    const item = await Item.create({
      name: itemInfo.name, 
      owner: collection._id,
      author: itemInfo.author,
      tags: itemInfo.tags
    })

    return {item}
  }

  async delete(itemId){
    const deletedItem = await Item.findByIdAndDelete(itemId)
    
    return {deletedItem, updatedCollection}
  }

  async deleteByCollectionId(collectionId){
    const deletedItems = await Item.deleteMany({owner: collectionId})
    return deletedItems
  }

  async getById(itemId){
    const item = await Item.findById(itemId)
    return item
  }

  async getAll(){
    const items = await Item.find()
    return items
  }
}
module.exports = new ItemService()