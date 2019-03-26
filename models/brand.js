const mongoose = require('mongoose');
const {Schema} = mongoose;

const BrandSchema = new Schema({
  name: {type: String, required: true},
  user: {type: String, required: true},
  createdDate: {type: Date},
});

module.exports = mongoose.model('Brand', BrandSchema);
