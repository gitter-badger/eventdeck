var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  member: String,
  thread: String,
  last: Date
});

var access = module.exports = mongoose.model('Access', schema);
