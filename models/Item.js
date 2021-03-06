const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  name: {type: String, required: true},
  owner: {type: Types.ObjectId, required: true, ref: 'Collection'},
  author: {type: String},
  comments: [{type: Types.ObjectId, ref: 'Comment'}],
  created: {type: Date, default: Date.now}
})

module.exports = model('Item', schema)