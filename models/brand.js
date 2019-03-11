const mongoose = require('mongoose');
const { Schema } = mongoose;

const BrandSchema = new Schema({
    name: { type: String, required: true }
});

module.exports = mongoose.model('Brand', BrandSchema);