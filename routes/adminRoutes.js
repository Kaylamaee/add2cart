const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

const { requireLogin, adminMiddleware } = require('../common-middleware/index')

router.get("/add-product", adminController.getProductForm);
 router.get("/add-product", requireLogin, adminController.getProductForm);

router.post("/add-product", adminController.postProduct);

router.get('/edit-product/:prodID', adminController.editProduct);
 router.get('/edit-product/:prodID', requireLogin, adminController.editProduct);

router.post('/edit-product', adminController.editProductPost);

router.post('/delete-product', adminController.deleteProduct);
 router.post('/delete-product', requireLogin, adminController.deleteProduct);

module.exports = router;