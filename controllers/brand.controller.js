const Brand = require('../models/brand');
const Product = require('../models/product');
const Price = require('../models/price');
const brandCtrl = {};

brandCtrl.getBrands = async (req, res) => {
  const brands = await Brand.find({user: req.params.userId}).sort({createdDate: 'descending'});
  res.json(brands);
};

brandCtrl.createBrand = async (req, res) => {
  const brand = new Brand(req.body);
  brand.createdDate = new Date();
  await brand.save();
  res.json(brand);
};

brandCtrl.getBrand = async (req, res) => {
  const brand = await brandCtrl.getBrandBy(req, res);
  res.json(brand);
};

brandCtrl.editBrand = async (req, res) => {
  await Brand.findByIdAndUpdate(req.body._id, {$set: {name: req.body.name}});
  await Product.updateMany({'brand._id': req.body._id}, {$set: {'brand.name': req.body.name}});
  await Price.updateMany({'productForm.product.brand._id': req.body._id}, {$set: {'productForm.product.brand.name': req.body.name}});

  res.json({status: 'Brand updated'});
};

brandCtrl.deleteBrand = async (req, res) => {
  await Brand.findByIdAndRemove(req.params.id);
  res.json({status: 'Brand deleted'});
};

brandCtrl.getBrandBy = async (req, res) => {
  if (req.params.id != 'noId') {
    return Brand.findById(req.params.id);
  }

  if ((req.params.id != 'noId' && req.params.name != null) || req.params.name != null) {
    return Brand.findOne({
      $and: [
        {user: req.params.userId},
        {name: {$regex: new RegExp('^' + req.params.name + '$', 'i')}},
      ],
    });
  }
};

module.exports = brandCtrl;
