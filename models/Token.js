const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  user: {type: Types.ObjectId, unique: true, ref: 'User'},
  refreshToken: {type: String, required: true}
})

module.exports = model('Token', schema)