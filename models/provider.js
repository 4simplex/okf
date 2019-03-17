const mongoose = require('mongoose');
const {Schema} = mongoose;

const ProviderSchema = new Schema({
  name: {type: String, required: true},
  info: {type: String},
  user: {type: String, required: true},
});

module.exports = mongoose.model('Provider', ProviderSchema);
