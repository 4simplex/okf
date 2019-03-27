const express = require('express');
const router = express.Router();

const priceCtrl = require('../controllers/price.controller');

router.get('/user/:userId', priceCtrl.getPriceLst);
router.post('/', priceCtrl.createPrice);
router.get('/getprice/:userId/:productCode', priceCtrl.getPriceByName);
router.get('/:id', priceCtrl.getPrice);
router.put('/:id', priceCtrl.editPrice);
router.delete('/:id', priceCtrl.deletePrice);
router.get('/getProvider/:userId/:providerId', priceCtrl.getPriceByProvider);
router.get('/getProduct/:userId/:productId', priceCtrl.getPriceByProduct);

module.exports = router;
