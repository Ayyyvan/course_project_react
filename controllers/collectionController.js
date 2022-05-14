const Collection = require('../models/Collection')
const {validationResult} = require('express-validator')
const collectionService = require('../service/collection-service')
const ErrorDto = require('../dtos/error-dto')
const ItemService = require('../service/item-service')


class collectionController{

  async create(req, res, next) {
    try{
      const errors = validationResult(req)
      if(!errors.isEmpty){
        return new ErrorDto(400, 'Invalid data', errors.array())
      }

      const { name, description } = req.body
      const { collection, user } = await collectionService.create(name, description, req.user.username)

      res.status(201).json({ collection, user, message: 'Collection has been created' })
    } catch(e){
      next(e)
    }
  }

  async delete(req, res, next){
    try{
      await collectionService.delete(req.params.id, req.user)
      res.status(200).json({ message: 'Collection has been deleted'})
    } catch(e){
      next(e)
    }
  }

  async getMine(req, res, next) {
    try{
      const collections = await Collection.find({ owner: req.user.username })
      res.status(200).json(collections)
    } catch(e){
      next(e)
    }
  }

  async getAll(req, res, next) {
    try{
      const collections = await Collection.find()
      res.json(collections)
    } catch(e){
      next(e)
    }
  }
  
  async getById(req, res, next) {
    try{
      const collection = await collectionService.findById(req.params.id)
      const items = new Array
      for(const itemId of collection.items){
        const item = await ItemService.getById(itemId)
        items.push(item)
      }
      res.status(200).json({collection, items})
    } catch(e){
      next(e)
    }
  }
}

module.exports = new collectionController()