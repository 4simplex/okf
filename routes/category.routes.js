const express = require('express');
const router = express.Router();

const categoryCtrl = require('../controllers/category.controller');

router.get('/user/:userId', categoryCtrl.getCategories);
router.post('/', categoryCtrl.createCategory);
router.get('/:userId/:id/:name?', categoryCtrl.getCategory);
router.put('/:id', categoryCtrl.editCategory);
router.delete('/:id', categoryCtrl.deleteCategory);

module.exports = router;
