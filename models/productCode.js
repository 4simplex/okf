const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductCodeSchema = new Schema({
    code: { type: String, required: true }
});

module.exports = mongoose.model('ProductCode', ProductCodeSchema);