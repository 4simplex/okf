const mongoose = require('mongoose');
const {Schema} = mongoose;

const SaleSchema = new Schema({
  productsGroup: {
  },
  saleTotal: {type: Number, required: true},
  purchasePriceTotal: {type: Number, required: true},
  saleDate: {},
});

module.exports = mongoose.model('Sale', SaleSchema);
