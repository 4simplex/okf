const express = require('express');
const router = express.Router();

const priceCtrl = require('../controllers/price.controller');

router.get('/', priceCtrl.getPriceLst);
router.post('/', priceCtrl.createPrice);
router.get('/getprice/:productCode', priceCtrl.getPriceByName);
router.get('/:id', priceCtrl.getPrice);
router.put('/:id', priceCtrl.editPrice);
router.delete('/:id', priceCtrl.deletePrice);

module.exports = router;
