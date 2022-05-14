const {validationResult} = require('express-validator')
const collectionService = require('../service/collection-service')
const itemService = require('../service/item-service')
const ErrorDto = require('../dtos/error-dto')

class itemController{
  async add(req, res, next){
    try{
      const collection = await collectionService.findById(req.body.collectionId)
      if(!collection){
        throw new ErrorDto(400, `Collection doesn't exist`)
      }
      const { item, updatedCollection } = await itemService.create(req.body.name, collection)

      res.status(201).json({item, updatedCollection, message: 'Item has been created'})

    } catch(e){
      next(e)
    }
  }
  async getAll(req, res, next){}

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

      const { deletedItem, updatedCollection } = await itemService.delete(req.params.id, collection)

      res.status(200).json({deletedItem, updatedCollection, message: 'Item has been deleted'})
    } catch(e){
      next(e)
    }
  }
}
module.exports = new itemController()