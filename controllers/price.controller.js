const Price = require('../models/price');
const priceCtrl = {};

const productCodeCtrl = require('./productCode.controller');
const codeGenerator = require('../helpers/codeGenerator');

priceCtrl.getPriceLst = async (req, res) => {
  const priceLst = await Price.find({user: req.params.userId}).sort({createdDate: 'descending'});
  res.json(priceLst);
};

priceCtrl.createPrice = async (req, res) => {
  const price = new Price(req.body);

  let generatedCode = codeGenerator.generateProductCode();
  let codeExists = productCodeCtrl.findProductCode(generatedCode);
  while (codeExists) {
    generatedCode = codeGenerator.generateProductCode();
    codeExists = productCodeCtrl.findProductCode(generatedCode);
  }
  price.productCode = generatedCode;
  price.stock = 0;
  price.createdDate = new Date();
  await price.save();
  res.json(price);
};

priceCtrl.getPrice = async (req, res) => {
  const price = await Price.findById(req.params.id);
  res.json(price);
};

priceCtrl.getPriceByName = async (req, res) => {
  const price = await Price.find({
    $and: [
      {user: req.params.userId},
      {'productCode': {'$regex': req.params.productCode, '$options': 'i'}},
    ],
  });

  if (price.length == 0) {
    // const name = await Price.find();
    const name = await Price.find({
      $and: [
        {user: req.params.userId},
        {'productForm.product.name': {'$regex': req.params.productCode, '$options': 'i'}},
      ],
    });

    res.json(name);
    return;
  }
  res.json(price);
};

priceCtrl.editPrice = async (req, res) => {
  const price = {
    purchasePrice: req.body.purchasePrice,
    salePrice: req.body.salePrice,
    provider: {
      _id: req.body.provider._id,
      name: req.body.provider.name,
    },
    stock: req.body.stock,
  };
  await Price.findByIdAndUpdate(req.params.id, {$set: price});
  res.json({status: 'Price updated'});
};

priceCtrl.deletePrice = async (req, res) => {
  await Price.findByIdAndRemove(req.params.id);
  res.json({status: 'Price deleted'});
};

module.exports = priceCtrl;
