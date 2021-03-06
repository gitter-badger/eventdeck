var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  id: {type: String, unique: true},
  name: String,
  title: { type: String, default: '' },
  description: String,
  img: String,
  contacts: String,
  participations: [{
    event: String,
    member: String,
    status: String,
    kind: String
  }],
  updated: { type: Date, default: Date.now }
});

var Speaker = module.exports = mongoose.model('Speaker', schema);
