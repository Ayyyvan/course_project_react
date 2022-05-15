const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  name: {type: String, required: true},
  owner: {type: Types.ObjectId, required: true, ref: 'Collection'},
  author: {type: String},
  likes: [{type: Types.ObjectId, unique: true, ref: 'User'}],
  tags: [{type: String, unique: true}],
  comments: [{type: Types.ObjectId, ref: 'Comment'}],
  created: {type: Date, default: Date.now}
})

module.exports = model('Item', schema)