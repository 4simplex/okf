const mongoose = require('mongoose');
const {Schema} = mongoose;

const CategorySchema = new Schema({
  name: {type: String, required: true},
  user: {type: String, required: true},
  createdDate: {type: Date},
});

module.exports = mongoose.model('Category', CategorySchema);
