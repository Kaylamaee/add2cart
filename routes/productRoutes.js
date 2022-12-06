 const express = require('express');
 const router = express.Router();

// //FROM CONTROLLER
 const { productCreate,deleteProduct, products, findProduct, updateProduct } = require('../controllers/productsController');
 const { requireLogin, adminMiddleware } = require('../common-middleware/index')
 const { login} = require('../controllers/userController');

router.get('/login')
router.post('/login', login)
router.post('/createProduct', requireLogin, adminMiddleware, productCreate)
router.delete('/deleteProduct/:prodID', requireLogin, adminMiddleware, deleteProduct)
router.get('/products', requireLogin, adminMiddleware, products)
router.get('/findProduct/:prodID', requireLogin, adminMiddleware, findProduct)
router.put('/updateProduct/:id', requireLogin, adminMiddleware, updateProduct)

 module.exports = router;