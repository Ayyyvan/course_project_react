const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  name: {type: String, required: true},
  owner: {type: Types.ObjectId, required: true, ref: 'Collection'},
	likes: [{type: Types.ObjectId, unique: 'true', ref: 'User'}],
	comments: [{type: Types.ObjectId, ref: 'User'}],
  created: {type: Date, default: Date.now}
})

module.exports = model('Item', schema)