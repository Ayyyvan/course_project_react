const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
	name: {type: String, required: true},
	owner: {type: String, required: true},
	description: {type: String},
	items: [{type: Types.ObjectId, ref: 'Item'}],
	created: {type: Date, default: Date.now}
})

module.exports = model('Collection', schema)