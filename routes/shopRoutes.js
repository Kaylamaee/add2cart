const express = require('express');
const shopController = require('../controllers/shopController');
const router = express.Router();

router.get('/index', shopController.getAllProducts);

router.get('/product/:prodID', shopController.getProductDetail);

router.get('/men', shopController.getMenDetail);
router.get('/men/:brand', shopController.getMenBrand)

router.get('/women', shopController.getWomenDetail);
router.get('/women/:brand', shopController.getWomenBrand)

router.post('/', shopController.getSearchResult)

router.post('/add-to-cart', shopController.addToCart);
router.get('/cart', shopController.getCart);
router.post('/delete-cart', shopController.deleteInCart);

router.get('error-demo', (req, res,next) => {
    throw new Error('This is to test Error handlingin express');
});

module.exports = router;