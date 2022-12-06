const express = require('express');
const router = express.Router();

const {addToRecentlyViewed} = require('../controllers/recentController')
const {requireLogin, userMiddleware} = require('../common-middleware')

router.post('/user/my-account/recent', requireLogin, userMiddleware, addToRecentlyViewed);


module.exports = router;