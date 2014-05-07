var mongoose = require('mongoose');

var chatSchema = new mongoose.Schema({
  id: {type: String, unique: true},
  name: String,
  members: [Object],
  messages: [Object],
  date: { type: Date, default: Date.now }
});

chatSchema.statics.findById = function (id, cb) {
  this.find({ id: id }, cb);
};

chatSchema.statics.findByName = function (id, cb) {
  this.find({ name: id }, cb);
};

chatSchema.statics.findAll = function (cb) {
  this.find({},cb);
};

 
var Chat = module.exports = mongoose.model('Chat', chatSchema);