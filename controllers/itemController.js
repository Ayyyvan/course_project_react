const {validationResult} = require('express-validator')
const collectionService = require('../service/collection-service')
const itemService = require('../service/item-service')
const ErrorDto = require('../dtos/error-dto')

class itemController{
  async add(req, res, next){
    try{
      const collection = await collectionService.findById(req.body.item.collectionId)
      if(!collection){
        throw new ErrorDto(400, `Collection doesn't exist`)
      }
      const { item } = await itemService.create(req.body.item, collection)
      const updatedCollection = await collectionService.addItem(collection._id, item)

      res.status(201).json({item, updatedCollection, message: 'Item has been created'})

    } catch(e){
      next(e)
    }
  }
  async getAll(req, res, next){
    try{
      const items = await itemService.getAll()
      res.status(200).json(items)
    } catch(e){
      next(e)
    }
  }

  async getById(req, res, next){
    try{
      const item = await itemService.getById(req.params.id)
      res.status(200).json({item})
    } catch (e){
      next(e)
    }
  }

  async deleteById(req, res, next){
    try{
      const collection = await collectionService.findById(req.body.collection._id)
      if(!collection){
        throw new ErrorDto(400, `Collection doesn't exist`)
      }

      const { deletedItem } = await itemService.delete(req.params.id)
      const updatedCollection = await collectionService.removeItem(collection._id, deletedItem)

      res.status(200).json({deletedItem, updatedCollection, message: 'Item has been deleted'})
    } catch(e){
      next(e)
    }
  }
}
module.exports = new itemController()