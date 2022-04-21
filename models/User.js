const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
	username: {type: String, required: true, unique: true},
	email: {type: String, required: true, unique: true},
	password: {type: String, required: true},
	// collections: [{type: Types.ObjectId, ref: 'Collection'}],
	// phoneNumber: {type: String},
	roles:[{type: String, ref: 'Role'}]
})

module.exports = model('User', schema)