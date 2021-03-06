var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  id: {type: String, unique: true},
  name: String,
  description: String,
  img: String,
  price: Number,
  minPrice: Number
});

var Item = module.exports = mongoose.model('Item', schema);
