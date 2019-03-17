const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

router.get('/user/:userId', productController.getProduct);
router.post('/', productController.createProduct);
router.delete('/:id', productController.deleteProduct);
router.put('/:id', productController.updateProduct);
router.get('/brand/:id', productController.hasProducts);
router.get('/category/:id', productController.categoryhasProducts);
router.get('/:id/:name?', productController.getProductById);
router.get('/get/products/:userId/:character', productController.searchProductByName);

module.exports = router;
