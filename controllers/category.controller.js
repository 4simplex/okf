const Category = require('../models/category');
const Product = require('../models/product');
const Price = require('../models/price');
const categoryCtrl = {};


categoryCtrl.getCategories = async (req, res) => {
  const categories = await Category.find({user: req.params.userId}).sort({createdDate: 'descending'});
  res.json(categories);
};

categoryCtrl.createCategory = async (req, res) => {
  const category = new Category(req.body);
  category.createdDate = new Date();
  await category.save();
  res.json(category);
};

categoryCtrl.getCategory = async (req, res) => {
  const category = await categoryCtrl.getCategoryBy(req, res);
  res.json(category);
};

categoryCtrl.editCategory = async (req, res) => {
  await Category.findByIdAndUpdate(req.params.id, {$set: {name: req.body.name}});
  await Product.updateMany({'category._id': req.body._id}, {$set: {'category.name': req.body.name}});
  await Price.updateMany({'productForm.product.category._id': req.body._id}, {$set: {'productForm.product.category.name': req.body.name}});

  res.json({status: 'Category updated'});
};

categoryCtrl.deleteCategory = async (req, res) => {
  await Category.findByIdAndRemove(req.params.id);
  res.json({status: 'Category deleted'});
};

categoryCtrl.getCategoryBy = async (req, res) => {
  if (req.params.id != 'noId') {
    return Category.findById(req.params.id);
  }

  if ((req.params.id != 'noId' && req.params.name != null) || req.params.name != null) {
    return Category.findOne({
      $and: [
        {user: req.params.userId},
        {name: {$regex: new RegExp('^' + req.params.name + '$', 'i')}},
      ],
    });
  }
};

module.exports = categoryCtrl;
