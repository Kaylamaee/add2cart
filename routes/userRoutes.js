const express = require('express');
const router = express.Router();
// const multer = require('multer');
// const path = require('path')
// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, path.join(path.dirname(__dirname), 'profileUploads'))
//     },
//     filename: function(req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now())
//     }
// })
// const upload = multer({storage})

//FROM CONTROLLER
const { signup, deleteUser, users, findUser, updateUser, login, resetPassword, decrpytUsername } = require('../controllers/userController');
const { requireLogin, userMiddleware, adminMiddleware } = require('../common-middleware/index')

router.post('/signup', signup)                  //hashing & encrypting
// router.get('/:username',  decrpytUsername)      //decrypting

////////////////////////////////////////
router.delete('/deleteUser/:username', requireLogin, adminMiddleware, deleteUser)
router.get('/users', requireLogin, adminMiddleware, users)
router.get('/findUser/:username', requireLogin, adminMiddleware, findUser)
router.put('/updateUser/:id', requireLogin, adminMiddleware, updateUser)

router.post('/my-account', requireLogin)
router.post('/login', login)

router.post('/my-account/security', resetPassword)

module.exports = router;