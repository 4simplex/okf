const express = require('express');
const router = express.Router();

const brandCtrl = require('../controllers/brand.controller');

router.get('/user/:userId', brandCtrl.getBrands);
router.post('/', brandCtrl.createBrand);
router.get('/:id/:name?', brandCtrl.getBrand);
router.put('/', brandCtrl.editBrand);
router.delete('/:id', brandCtrl.deleteBrand);

module.exports = router;