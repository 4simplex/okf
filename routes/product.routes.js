const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

router.get('/brand/:id', productController.hasProducts);
router.get('/category/:id', productController.categoryhasProducts);
router.get('/:id/:name?', productController.getProductById);
router.get('/get/products/:character', productController.searchProductByName);
router.get('/', productController.getProduct);
router.post('/', productController.createProduct);
router.delete('/:id', productController.deleteProduct);
router.put('/:id', productController.updateProduct)

module.exports = router;