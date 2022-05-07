const Collection = require('../models/Collection')
const {validationResult} = require('express-validator')
const User = require('../models/User')


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
			const collection = new Collection({name, description, owner: req.user.id})
			collection.save()
			await User.findByIdAndUpdate(req.user.id, { $set:{ collections : collection._id} })
			res.status(201).json({ collection, message: 'Collection has been created' })
		} catch(e){
			res.status(500).json({ message: 'Something wrong, please thy again' })
		}
	}

	async getMine(req, res) {
		try{
			const collections = await Collection.find({ owner: req.user.userId })
			res.json(collections)
		} catch(e){
			res.status(500).json({ message: 'Something wrong, please thy again' })
		}
	}

	async getAll(req, res) {
		try{
			const collections = await Collection.find()
			res.json(collections)
		} catch(e){
			res.status(500).json({ message: 'Something wrong, please thy again' })
		}
	}
	async getById(req, res) {
		try{
			const collection = await Collection.findById(req.params.id)
			res.json(collection)
		} catch(e){
			res.status(500).json({ message: 'Something wrong, please thy again' })
		}
	}
}

module.exports = new collectionController()