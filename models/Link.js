const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
  from: { type: String, required: true, unique: false },
  text: { type: String },
  // code: {type:String, required:true,unique:false},
  date: { type: Date, default: Date.now },
  // cliks:{type:Number, default:0,unique:false},
  owner: { type: Types.ObjectId, ref: 'User' }

})

module.exports = model('Link', schema)
