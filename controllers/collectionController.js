const Collection = require('../models/Collection')
const {validationResult} = require('express-validator')


class collectionController{

	async create(req, res) {
		try{
			const errors = validationResult(req)
			if(!errors.isEmpty){
				return res.status(400).json({
					errors: errors.array(),
					message: 'Invalid data'
				})
			}

			const { name, description } = req.body
			const collection = new Collection({name, description, owner: req.user.userId})
			collection.save()
			
			res.status(201).json({ collection, message: 'Collection has been created' })
		} catch(e){
			res.status(500).json({ message: 'Something wrong, please thy again' })
		}
	}

	async getMine(req, res) {
		try{
			const collections = Collection.find({ owner: req.user.userId })
			res.json(collections)
		} catch(e){
			res.status(500).json({ message: 'Something wrong, please thy again' })
		}
	}

	async getAll(req, res) {
		try{
			const collections = Collection.find()
			res.json(collections)
		} catch(e){
			res.status(500).json({ message: 'Something wrong, please thy again' })
		}
	}
}

module.exports = new collectionController()